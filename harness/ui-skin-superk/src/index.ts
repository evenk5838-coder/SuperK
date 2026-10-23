/** Personal SuperK services. All requests use Harness's authenticated carrier. */
import type { Context } from '@deepseek-ai/cordis'
import { readFile, readdir, mkdir, writeFile, stat } from 'node:fs/promises'
import { join, resolve, basename, extname } from 'node:path'
import { homedir } from 'node:os'
import { randomUUID } from 'node:crypto'
import { parse } from 'yaml'
import type { HostConnectionHandle } from '@deepseek-ai/dsh-client-connection'
import type { CredentialProvider, CredentialRef } from '@deepseek-ai/dsh-credentials'

const ROOT = '/Users/niannian/SuperK'
const STORE = join(ROOT, 'knowledge')
const SKILLS = join(ROOT, 'skills')
const MAX = 1_000_000
interface Note { id: string; title: string; folder: string; content: string; updated: string }
interface Skill { name: string; description: string; path: string }
const roots = [SKILLS, join(homedir(), '.agents/skills'), join(homedir(), '.codex/skills')]
function clean(value: unknown, max = MAX): string {
  if (typeof value !== 'string' || value.length > max) throw new Error('内容为空或过长')
  return value
}
async function textFile(path: string): Promise<string> {
  const info = await stat(path)
  if (!info.isFile() || info.size > MAX) throw new Error('请选择小于 1 MB 的文本文件；其他附件请用对话原生附件入口')
  const data = await readFile(path)
  if (data.includes(0)) throw new Error('这个文件不是文本，请使用对话原生附件入口')
  return data.toString('utf8')
}
function skillMeta(content: string, path: string): Skill {
  const header = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1]
  if (!header) throw new Error('Skill 需要有效的 YAML 头部')
  const meta = parse(header) as {name?: unknown; description?: unknown}
  const name = typeof meta?.name === 'string' ? meta.name : ''
  const description = typeof meta?.description === 'string' ? meta.description : ''
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name) || !description.trim()) throw new Error('Skill 需要有效的 name 和 description')
  return { name, description, path }
}
async function skillList(): Promise<Skill[]> {
  const map = new Map<string, Skill>()
  for (const root of roots) {
    let entries
    try { entries = await readdir(root, { withFileTypes: true }) } catch { continue }
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue
      let directory = entry.isDirectory()
      if (entry.isSymbolicLink()) { try { directory = (await stat(join(root, entry.name))).isDirectory() } catch { continue } }
      const path = directory ? join(root, entry.name, 'SKILL.md') : join(root, entry.name)
      if (!directory && extname(path).toLowerCase() !== '.md') continue
      try { const item = skillMeta(await textFile(path), path); if (!map.has(item.name)) map.set(item.name, item) } catch { /* Non-skill files are not selectable. */ }
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
}
async function folderList(prefix = ''): Promise<string[]> {
  const dir = join(STORE, 'folders', prefix)
  let entries
  try { entries = await readdir(dir, { withFileTypes: true }) } catch { return [] }
  const result: string[] = []
  for (const e of entries) if (e.isDirectory()) { const name = prefix ? prefix + '/' + e.name : e.name; result.push(name, ...await folderList(name)) }
  return result
}
async function notes(): Promise<Note[]> {
  let files: string[]
  try { files = await readdir(STORE) } catch { return [] }
  const map = new Map<string, Note>()
  for (const file of files.filter(f => f.endsWith('.json')).sort()) {
    const note = JSON.parse(await readFile(join(STORE, file), 'utf8')) as Note
    if (!map.has(note.id) || map.get(note.id)!.updated < note.updated) map.set(note.id, note)
  }
  return [...map.values()].sort((a, b) => b.updated.localeCompare(a.updated))
}
export const inject = ['connection', 'credentials']
export function apply(ctx: Context): void {
  const connection = ctx.get('connection') as HostConnectionHandle
  const credentials = ctx.get('credentials') as CredentialProvider
  let balanceCache: { at: number; value: unknown } | undefined
  connection.fetch.register({ path: '/api/superk', methods: ['GET', 'POST'], requestBody: 'buffered', fetch: async request => {
    try {
      const url = new URL(request.url)
      const action = url.searchParams.get('action')
      const data = request.method === 'POST' ? await request.json() as Record<string, unknown> : {}
      let value: unknown
      if (request.method === 'GET' && action === 'skills') value = await skillList()
      else if (request.method === 'POST' && action === 'skill-content') {
        const paths = data.paths
        if (!Array.isArray(paths) || paths.length > 10) throw new Error('一次最多选择 10 个 Skill')
        const available = await skillList()
        value = await Promise.all(paths.map(async p => {
          const skill = available.find(s => s.path === p)
          if (!skill) throw new Error('Skill 已不可用，请刷新列表')
          return { ...skill, content: await textFile(skill.path) }
        }))
      } else if (request.method === 'POST' && action === 'import-skill') {
        const content = typeof data.path === 'string' ? await textFile(resolve(data.path)) : clean(data.content)
        const meta = skillMeta(content, '')
        const dir = join(SKILLS, meta.name)
        await mkdir(dir, { recursive: true })
        await writeFile(join(dir, 'SKILL.md'), content, { flag: 'wx' })
        value = { ...meta, path: join(dir, 'SKILL.md') }
      } else if (request.method === 'GET' && action === 'notes') value = await notes()
      else if (request.method === 'POST' && action === 'save-note') {
        const note: Note = { id: typeof data.id === 'string' && /^[a-z0-9-]+$/.test(data.id) ? data.id : randomUUID(), title: clean(data.title, 200).trim(), folder: clean(data.folder, 500), content: clean(data.content), updated: new Date().toISOString() }
        if (!note.title) throw new Error('请填写标题')
        if (note.folder && note.folder.split('/').some(s => !s || s === '..' || s === '.')) throw new Error('文件夹名称不正确')
        if (note.folder) await mkdir(join(STORE, 'folders', note.folder), { recursive: true })
        await mkdir(STORE, { recursive: true })
        const stem = `${note.updated.replace(/[:.]/g, '-')}-${note.id}-${randomUUID()}`
        await writeFile(join(STORE, stem + '.md'), `# ${note.title}\n\n${note.content}`, { flag: 'wx' })
        await writeFile(join(STORE, stem + '.json'), JSON.stringify(note, null, 2), { flag: 'wx' })
        value = note
      } else if (request.method === 'GET' && action === 'folders') {
        value = await folderList()
      } else if (request.method === 'POST' && action === 'folder') {
        const name = clean(data.name, 500).trim()
        if (!name || name.split('/').some(s => !s || s === '..' || s === '.')) throw new Error('请填写文件夹名称，可用 / 创建子文件夹')
        await mkdir(join(STORE, 'folders', name), { recursive: true })
        value = name
      } else if (request.method === 'POST' && action === 'read-path') {
        const path = resolve(clean(data.path, 4000))
        const info = await stat(path)
        value = info.isDirectory() ? { title: basename(path), content: `文件夹：${path}\n\n${(await readdir(path)).join('\n')}` } : { title: basename(path), content: await textFile(path) }
      } else if (request.method === 'GET' && action === 'balance') {
        if (balanceCache && Date.now() - balanceCache.at < 15_000) value = balanceCache.value
        else {
          const key = await credentials.resolve('DEEPSEEK_API_KEY' as CredentialRef)
          if (!key) throw new Error('未配置 DEEPSEEK_API_KEY；请在 API / 模型设置里配置')
          const response = await fetch('https://api.deepseek.com/user/balance', { headers: { Authorization: `Bearer ${key.value}` }, signal: AbortSignal.timeout(10_000) })
          if (!response.ok) throw new Error(`DeepSeek 余额查询失败（${response.status}）`)
          value = { ...await response.json() as object, checkedAt: new Date().toISOString(), credentialRef: 'DEEPSEEK_API_KEY' }
          balanceCache = { at: Date.now(), value }
        }
      } else return Response.json({ error: '入口不存在' }, { status: 404 })
      return Response.json({ value }, { headers: { 'Cache-Control': 'no-store' } })
    } catch (error) {
      const message = error instanceof Error ? error.message : '操作失败，请重试'
      return Response.json({ error: message.includes('EEXIST') ? '同名 Skill 已存在，请更换名称；原文件保留' : message }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
    }
  } })
}
