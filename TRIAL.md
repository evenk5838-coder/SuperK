# SuperK 试用版

2026-10-08，版本 0.2.0。双击原有桌面 SuperK 替身即可使用。

## 使用

- 跟随系统：浅色白蓝，深色黑紫；设置中也可以手动切换。
- 项目与会话复用原生工作区浏览器，可折叠。没有选定工作区时，先选择已有目录。
- 产品 0→1 是一个侧栏入口，中间显示七个阶段与其他；支持自建子文件夹。
- 外置大脑支持创建、编辑、导入文本、搜索和引用笔记；当前是本机文档库，未实现自动向量检索。
- Skill 列出实际存在且能解析的个人 SKILL.md。多选会读取完整内容进入草稿，不自动发送；组合执行不代表多个智能体并行。原生 skill 工具也挂载这些个人目录。
- Skill 与知识引用各有独立的 ＋。网页链接仅作为来源，未自动抓取正文。
- API 入口打开原生设置，在模型页配置服务商；输入框右下角切换当前模型。
- DeepSeek 余额查询 DEEPSEEK_API_KEY，页面可见时每 30 秒刷新，其他服务商暂未接入。当前该凭据不可用，显示错误状态。

## 文件

- 个人知识数据：`/Users/niannian/SuperK/knowledge`。每次保存生成新的 JSON 与 Markdown 版本，原文件保留。
- 新导入的 Skill：`/Users/niannian/SuperK/skills`。同名文件不覆盖。
- 原外观与启动脚本备份：`/Users/niannian/SuperK/backups/trial-20261008-132530`。
- 原来的 public、server.mjs、workflow.js 完整保留。

## 验证

- 外观插件 TypeScript 检查与前后端打包通过。
- 实际界面核验：首页、黑紫与白蓝主题、七阶段分类和真实 Skill 清单。两个 Skill 的完整内容同时进入草稿；撤销后草稿恢复。
- 试用指南通过界面保存，重载后仍在，并可从引用知识中选择。最终冷启动后，个人 Skill 也从原生 / 入口成功发现，真实项目与对话控件恢复。验收草稿已经清空。
- GUI 回归：599 个测试文件通过、2 个失败；9779 项测试通过。剩余失败在未改动的 document-preview license bundle（打包超时）与 trajectory client bundle（服务注册不匹配）。未修改这些模块。
- 浏览器回放使用已有构建运行，但本机缺少该版本 Playwright Chromium headless，未能完成；以本机实际界面验收补充。
- 未发送测试对话到模型，未修改 API 密钥、原生模型、权限等业务设置。

余额接口参考：https://api-docs.deepseek.com/api/get-user-balance/
