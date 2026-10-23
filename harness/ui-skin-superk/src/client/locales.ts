/** Copy owned by the personal skin. */
export const zh = {
  textLimit: '请选择小于 1 MB 的文本文件', textFile: '请选择文本文件', invalidURL: '请输入完整的 http 或 https 链接', items: '份内容', eyebrowFlow: 'PRODUCT JOURNEY', eyebrowBrain: 'SECOND BRAIN', eyebrowSkills: 'TOOLS', settings: '设置', brand: 'SuperK', personal: '个人工作台', home: '工作台', new: '新对话', projects: '项目与会话', more: '更多工具', collapse: '收起侧栏', expand: '展开侧栏',
  flow: '产品 0 → 1', flowHint: '从问题到迭代，让每一份思考找到位置', brain: '外置大脑', brainHint: '收集、整理，再把知识带回工作', skills: 'Skill 工具台',
  api: 'API / 模型设置', apiHint: '选择服务商、配置 API Key 和切换模型', balance: 'DeepSeek API 余额', balanceHint: '使用 DEEPSEEK_API_KEY 查询；每 30 秒刷新，不代表其他服务商或订阅额度', refresh: '刷新', querying: '查询中', noBalance: '余额暂不可用',
  hero: '把想法，推进一步。', heroHint: '在这里思考、创作，把知识变成行动', skillSelect: '选择 Skill', reference: '引用知识', plusSkill: '添加 Skill', plusReference: '添加引用',
  skillHint: '只显示本机实际存在的 Skill，可多选。加入本轮后先检查草稿，再发送。', skillEmpty: '还没有可用 Skill，点击 ＋ 导入 SKILL.md', skillAdded: '已加入本轮指令', skillLimit: '一次最多选择 10 个 Skill', select: '加入本轮', close: '关闭', cancel: '取消',
  loading: '正在读取', retry: '重试', search: '搜索名称或内容', noResults: '没有符合条件的内容', noNotes: '还没有笔记，创建一份或导入文本开始积累',
  create: '新建笔记', folder: '新建文件夹', folderHint: '例如：用户研究/访谈，可自由创建子文件夹', all: '全部内容', title: '标题', content: '正文 / 粘贴内容', save: '保存', saved: '已保存到本机', edit: '编辑笔记', choose: '选择文件', fileHint: '支持文本、Markdown；PDF、图片等使用对话原生附件 ＋', path: '本地文件或文件夹路径', read: '读取路径', url: '网页链接', urlHint: '链接将作为来源加入草稿，未自动抓取网页正文', import: '导入 Skill', importHint: '上传 SKILL.md、粘贴完整内容，或读取本地文件路径；同名文件不会覆盖', empty: '内容不能为空',
  folderName: '文件夹名称', rootFolder: '未分类', area: '所属文件夹', back: '返回分类', stage1: '问题定义', stage2: '用户研究', stage3: '竞品分析', stage4: '立项与优先级', stage5: '产品设计', stage6: '开发与验证', stage7: '上线与迭代', stage8: '其他',
  stageHint1: '场景 · 问题 · 目标', stageHint2: '访谈 · 观察 · 证据', stageHint3: '对比 · 差异 · 机会', stageHint4: '取舍 · 范围 · 决策', stageHint5: '流程 · 原型 · PRD', stageHint6: '实验 · 评测 · 验证', stageHint7: '发布 · 指标 · 复盘', stageHint8: '暂存 · 灵感 · 待整理',
  stored: '本机保存 · 保留历史版本', drafts: '所选内容会插入当前对话草稿，不会自动发送', startFirst: '先打开项目中的对话，再引用到当前工作', theme: '跟随系统外观', export: '导出 Markdown',
} as const
export type Key = keyof typeof zh
// Personal workstation uses Chinese copy in either Harness locale.
export const en = { ...zh }
