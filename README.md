# SuperK

个人工作台的开源代码仓库。当前界面基于 DeepSeek Harness，通过个人外观插件和启动配置加载。

## 当前使用入口

- macOS 应用：`~/Applications/SuperK.app`，桌面替身指向它。
- 启动脚本：`launcher/superk.sh`。
- 插件配置：`harness/superk.patch.yml`。
- 实际运行的外观插件：`/Users/niannian/deepseek-harness/packages/client/ui-skin-superk`。
- 外观插件源码及构建产物快照：`harness/ui-skin-superk/`。
- 持久启动日志：本机 `logs/harness.log`，不会提交。

`public/`、`server.mjs`、`workflow.js` 是保留的旧界面，不是当前工作台入口。

## 在另一台电脑恢复

此仓库归档个人层，不包含整个 DeepSeek Harness。按 `harness/upstream.json` 获取对应的 Harness 版本，再将 `harness/ui-skin-superk/` 放到其 `packages/client/ui-skin-superk/`。插件的 `workspace:` 依赖需要放在 Harness 工作区内解析。

本机路径固定在 `/Users/niannian`；换电脑后需核对启动脚本、patch 和插件源码中的路径，并按 Harness 自身说明构建、启动。仓库内的 `lib/` 是当前构建快照，后续源码修改需重新构建。

模型密钥通过原生凭据服务在本地填写，不要写进 Git、脚本或聊天。AiHubMix 配置说明见 [AIHUBMIX.md](AIHUBMIX.md)，试用说明见 [TRIAL.md](TRIAL.md)。

## 本地数据与开源许可

仓库公开托管于 GitHub。日志、个人知识库、Skill 内容、本地产出和备份由 `.gitignore` 排除，仍保留在本机。这是代码归档，不是个人数据的完整备份。

SuperK 项目代码按 [MIT License](LICENSE) 开源。依赖的 DeepSeek Harness 及第三方代码保持各自原有许可证；外观包内保留 DeepSeek 的 MIT 许可和版权声明。
