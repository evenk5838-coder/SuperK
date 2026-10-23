import http from "node:http"
import fs from "node:fs"
import path from "node:path"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { defaultMode, modes, stages } from "./workflow.js"

const root = path.dirname(fileURLToPath(import.meta.url))
const publicRoot = path.join(root, "public")
const productsRoot = path.join(root, "products")
const port = Number(process.env.SUPERK_PORT || 4177)
const host = "127.0.0.1"

fs.mkdirSync(productsRoot, { recursive: true })

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  })
  res.end(body)
}

function sendJson(res, status, data) {
  send(res, status, JSON.stringify(data))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on("data", (chunk) => {
      size += chunk.length
      if (size > 12 * 1024 * 1024) {
        reject(Object.assign(new Error("文件太大"), { status: 413 }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on("end", () => {
      if (!chunks.length) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")))
      } catch {
        reject(Object.assign(new Error("请求格式不对"), { status: 400 }))
      }
    })
    req.on("error", reject)
  })
}

function productDir(id) {
  if (!/^p-[a-z0-9]+$/.test(id)) {
    const error = new Error("找不到这条产品")
    error.status = 404
    throw error
  }
  const dir = path.resolve(productsRoot, id)
  if (!dir.startsWith(productsRoot + path.sep)) {
    const error = new Error("找不到这条产品")
    error.status = 404
    throw error
  }
  return dir
}

function loadProduct(id) {
  const file = path.join(productDir(id), "product.json")
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function saveProduct(product) {
  const dir = productDir(product.id)
  fs.mkdirSync(dir, { recursive: true })
  const file = path.join(dir, "product.json")
  const tmp = `${file}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(product, null, 2))
  fs.renameSync(tmp, file)
}

function listProducts() {
  return fs
    .readdirSync(productsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      try {
        return summarize(loadProduct(entry.name))
      } catch {
        return null
      }
    })
    .filter(Boolean)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

function summarize(product) {
  const stage = stages[product.stageIndex] || stages[0]
  return {
    id: product.id,
    name: product.name,
    mode: product.mode,
    stageIndex: product.stageIndex,
    stageTitle: stage.title,
    updatedAt: product.updatedAt,
  }
}

function stamp() {
  return new Date().toISOString()
}

function newId() {
  return `p-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

function docsDir(id) {
  const dir = path.join(productDir(id), "docs")
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function evidenceDir(id) {
  const dir = path.join(productDir(id), "evidence")
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function writeDoc(id, filename, content) {
  const safe = path.basename(filename)
  if (!safe.endsWith(".md") || safe !== filename) {
    const error = new Error("文档名不合法")
    error.status = 400
    throw error
  }
  fs.writeFileSync(path.join(docsDir(id), safe), content)
}

function ideaDoc(product) {
  return `# 想法\n\n${product.idea.trim()}\n`
}

function evidenceDoc(product) {
  const groups = [
    ["note", "笔记"],
    ["link", "链接"],
    ["file", "文件"],
    ["lookup", "待查公开资料"],
  ]
  const parts = ["# 证据\n", "对话里贴的链接和拖进来的文件会自动记在这里。公开资料的检索要等 Skill 接入后再做。\n"]
  for (const [kind, title] of groups) {
    const items = product.evidence.filter((item) => item.kind === kind)
    parts.push(`\n## ${title}\n`)
    if (!items.length) {
      parts.push("\n（还没有）\n")
      continue
    }
    for (const item of items) {
      if (kind === "link") {
        parts.push(`\n- [${item.title}](${item.body})\n`)
      } else if (kind === "lookup") {
        parts.push(`\n- ${item.body}（尚未检索）\n`)
      } else {
        parts.push(`\n- ${item.title}${item.body ? `：${item.body}` : ""}\n`)
      }
    }
  }
  return parts.join("")
}

function prdStub(product) {
  return `# PRD\n\n产品：${product.name}\n\n这里留给后续 Skill，根据前面的想法和证据来写。当前不会自动生成正文。\n`
}

function ensureStageDoc(product) {
  const stage = stages[product.stageIndex]
  const file = path.join(docsDir(product.id), stage.doc)
  if (stage.id === "evidence") {
    writeDoc(product.id, stage.doc, evidenceDoc(product))
    return
  }
  if (fs.existsSync(file)) return
  if (stage.id === "idea") writeDoc(product.id, stage.doc, ideaDoc(product))
  if (stage.id === "prd") writeDoc(product.id, stage.doc, prdStub(product))
}

function listDocs(id) {
  return fs
    .readdirSync(docsDir(id))
    .filter((name) => name.endsWith(".md"))
    .map((name) => ({
      name,
      updatedAt: fs.statSync(path.join(docsDir(id), name)).mtime.toISOString(),
    }))
}

function readDoc(id, name) {
  const safe = path.basename(name)
  const file = path.join(docsDir(id), safe)
  if (!safe.endsWith(".md") || !fs.existsSync(file)) {
    const error = new Error("没有这份文档")
    error.status = 404
    throw error
  }
  return fs.readFileSync(file, "utf8")
}

function systemMessage(text) {
  return { id: newId(), role: "system", text, at: stamp() }
}

function createProduct({ name, idea, mode }) {
  const trimmedName = String(name || "").trim()
  const trimmedIdea = String(idea || "").trim()
  if (!trimmedName || !trimmedIdea) {
    const error = new Error("产品名和一句话想法都要填")
    error.status = 400
    throw error
  }
  if (!modes.some((item) => item.id === mode)) {
    const error = new Error("先选一种对话驱动方式")
    error.status = 400
    throw error
  }
  const now = stamp()
  const product = {
    id: newId(),
    name: trimmedName,
    idea: trimmedIdea,
    mode,
    stageIndex: 0,
    createdAt: now,
    updatedAt: now,
    messages: [
      { id: newId(), role: "user", text: trimmedIdea, at: now },
      systemMessage(modeIntro(mode)),
    ],
    evidence: [],
  }
  saveProduct(product)
  ensureStageDoc(product)
  return product
}

function modeIntro(mode) {
  if (mode === "auto") {
    return "这条主线用自动推进。Skill 接入后，只有缺信息时才会停下来问你。现在先把你补充的内容记在这条主线上。"
  }
  if (mode === "single") {
    return "这条主线只做当前阶段。回复「继续」不会进入下一阶段。要换阶段，在左侧列表里右键这条产品。"
  }
  return "这条主线每阶段都会停住。这一阶段的材料齐了之后，在对话里回复「继续」。"
}

function advance(product, text) {
  const sayingContinue = /^继续[。.!！]?$/.test(text)
  if (!sayingContinue) return null
  if (product.mode === "single") {
    return "当前是「只做当前阶段」，回复「继续」不会进入下一步。要换阶段，在左侧列表里右键这条产品。"
  }
  if (product.mode === "auto") {
    return "自动推进要等 Skill 接入后才会自己往下跑。你这条「继续」已经记在主线上。"
  }
  if (product.stageIndex >= stages.length - 1) {
    return "已经在 PRD，这是目前清单里的最后一阶段。"
  }
  product.stageIndex += 1
  ensureStageDoc(product)
  const stage = stages[product.stageIndex]
  return `进入「${stage.title}」。这一阶段做完后，再回复「继续」。`
}

function addMessage(id, text) {
  const trimmed = String(text || "").trim()
  if (!trimmed) {
    const error = new Error("先写点内容")
    error.status = 400
    throw error
  }
  const product = loadProduct(id)
  const now = stamp()
  product.messages.push({ id: newId(), role: "user", text: trimmed, at: now })
  const links = [...new Set(trimmed.match(/https?:\/\/[^\s<>"'，。；、）)]+/gi) || [])]
  const fresh = links.filter((link) => !product.evidence.some((item) => item.kind === "link" && item.body === link))
  for (const link of fresh) {
    product.evidence.push({ id: newId(), kind: "link", title: link, body: link, at: now })
  }
  if (fresh.length) {
    writeDoc(id, "证据.md", evidenceDoc(product))
    product.messages.push(systemMessage(`已把 ${fresh.length} 个链接记进证据。`))
  }
  const note = advance(product, trimmed)
  if (note) product.messages.push(systemMessage(note))
  product.updatedAt = now
  saveProduct(product)
  return product
}

function setMode(id, mode) {
  if (!modes.some((item) => item.id === mode)) {
    const error = new Error("没有这种驱动方式")
    error.status = 400
    throw error
  }
  const product = loadProduct(id)
  product.mode = mode
  product.updatedAt = stamp()
  product.messages.push(systemMessage(`对话驱动改为「${modes.find((item) => item.id === mode).title}」。`))
  saveProduct(product)
  return product
}

function setStage(id, stageIndex) {
  const product = loadProduct(id)
  if (product.mode !== "single") {
    const error = new Error("只有「只做当前阶段」可以手动换阶段")
    error.status = 400
    throw error
  }
  if (!Number.isInteger(stageIndex) || stageIndex < 0 || stageIndex >= stages.length) {
    const error = new Error("没有这个阶段")
    error.status = 400
    throw error
  }
  product.stageIndex = stageIndex
  product.updatedAt = stamp()
  ensureStageDoc(product)
  product.messages.push(systemMessage(`当前阶段改为「${stages[stageIndex].title}」。`))
  saveProduct(product)
  return product
}

function addEvidence(id, input) {
  const kind = input.kind
  if (!["note", "link", "file", "lookup"].includes(kind)) {
    const error = new Error("证据类型不对")
    error.status = 400
    throw error
  }
  const title = String(input.title || "").trim()
  const body = String(input.body || "").trim()
  if (kind === "link" && !/^https?:\/\/\S+$/i.test(body)) {
    const error = new Error("链接需要以 http:// 或 https:// 开头")
    error.status = 400
    throw error
  }
  if (kind !== "file" && !body && !title) {
    const error = new Error("先写内容")
    error.status = 400
    throw error
  }
  const product = loadProduct(id)
  let storedBody = body
  let storedTitle = title || body.slice(0, 40)
  if (kind === "file") {
    const filename = path.basename(String(input.filename || "附件"))
    const data = String(input.dataBase64 || "")
    if (!filename || !data) {
      const error = new Error("没有收到文件")
      error.status = 400
      throw error
    }
    const buffer = Buffer.from(data, "base64")
    if (!buffer.length || buffer.length > 8 * 1024 * 1024) {
      const error = new Error("文件为空，或超过 8MB")
      error.status = 400
      throw error
    }
    const safeName = `${Date.now().toString(36)}-${filename.replace(/[^\w.\u4e00-\u9fff-]+/g, "_")}`
    fs.writeFileSync(path.join(evidenceDir(id), safeName), buffer)
    storedTitle = filename
    storedBody = safeName
  }
  product.evidence.push({
    id: newId(),
    kind,
    title: storedTitle,
    body: storedBody,
    at: stamp(),
  })
  if (kind === "file") product.messages.push(systemMessage(`已把文件「${storedTitle}」记进证据。`))
  product.updatedAt = stamp()
  saveProduct(product)
  writeDoc(id, "证据.md", evidenceDoc(product))
  return product
}

function removeProduct(id) {
  fs.rmSync(productDir(id), { recursive: true, force: true })
}

function contentType(file) {
  if (file.endsWith(".css")) return "text/css; charset=utf-8"
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8"
  if (file.endsWith(".html")) return "text/html; charset=utf-8"
  if (file.endsWith(".png")) return "image/png"
  return "application/octet-stream"
}

function serveStatic(res, urlPath) {
  const requested = urlPath === "/" ? "/index.html" : urlPath
  const file = path.resolve(publicRoot, `.${requested}`)
  if (!file.startsWith(publicRoot + path.sep) && file !== path.join(publicRoot, "index.html")) {
    send(res, 404, "not found", "text/plain; charset=utf-8")
    return
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    send(res, 404, "not found", "text/plain; charset=utf-8")
    return
  }
  send(res, 200, fs.readFileSync(file), contentType(file))
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${host}`)
    const parts = url.pathname.split("/").filter(Boolean)

    if (parts[0] !== "api") {
      serveStatic(res, decodeURIComponent(url.pathname))
      return
    }

    if (req.method === "GET" && url.pathname === "/api/meta") {
      sendJson(res, 200, {
        productsRoot,
        stages,
        modes,
        defaultMode,
        sync: "pending",
      })
      return
    }

    if (req.method === "GET" && url.pathname === "/api/products") {
      sendJson(res, 200, listProducts())
      return
    }

    if (req.method === "POST" && url.pathname === "/api/products") {
      sendJson(res, 201, createProduct(await readBody(req)))
      return
    }

    const productId = parts[1] === "products" ? parts[2] : ""
    const action = parts[3]

    if (productId && !action && req.method === "GET") {
      sendJson(res, 200, loadProduct(productId))
      return
    }

    if (productId && !action && req.method === "DELETE") {
      removeProduct(productId)
      sendJson(res, 200, { ok: true })
      return
    }

    if (productId && action === "messages" && req.method === "POST") {
      const body = await readBody(req)
      sendJson(res, 200, addMessage(productId, body.text))
      return
    }

    if (productId && action === "mode" && req.method === "POST") {
      const body = await readBody(req)
      sendJson(res, 200, setMode(productId, body.mode))
      return
    }

    if (productId && action === "stage" && req.method === "POST") {
      const body = await readBody(req)
      sendJson(res, 200, setStage(productId, body.stageIndex))
      return
    }

    if (productId && action === "evidence" && parts.length === 4 && req.method === "POST") {
      sendJson(res, 200, addEvidence(productId, await readBody(req)))
      return
    }

    if (productId && action === "docs" && req.method === "GET" && parts.length === 4) {
      const name = url.searchParams.get("name")
      if (!name) {
        sendJson(res, 200, listDocs(productId))
        return
      }
      sendJson(res, 200, { name, content: readDoc(productId, name) })
      return
    }

    if (productId && action === "files" && parts[4] && req.method === "GET") {
      const filename = path.basename(parts[4])
      const file = path.join(evidenceDir(productId), filename)
      if (!fs.existsSync(file)) {
        send(res, 404, "not found", "text/plain; charset=utf-8")
        return
      }
      send(res, 200, fs.readFileSync(file), "application/octet-stream")
      return
    }

    sendJson(res, 404, { error: "没有这个接口" })
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.message || "出错了" })
  }
})

server.listen(port, host, () => {
  const page = `http://${host}:${port}`
  console.log(`SuperK AIPM ${page}`)
  if (process.env.SUPERK_NO_OPEN === "1") return
  const chrome = "/Applications/Google Chrome.app"
  const args = fs.existsSync(chrome)
    ? ["-na", "Google Chrome", "--args", `--app=${page}`]
    : [page]
  spawn("open", args, { detached: true, stdio: "ignore" }).unref()
})
