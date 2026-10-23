# SuperK · AiHubMix 接入

入口已配置在 harness/superk.patch.yml，仅用于个人工作台，没有修改 Harness 原有代码。

## 首次使用

1. 双击桌面 SuperK，点击顶部「API / 模型设置」→「模型」。
2. 找到「AiHubMix」并点编辑，将 https://console.aihubmix.com/token 生成的密钥粘贴到 API 密钥栏，保存。不要粘贴到对话中。
3. 回到对话，在输入框右下的模型选择器选择「AiHubMix → Claude Sonnet 5」。已有会话可能仍记住 Amazon Bedrock，需要手动切换。
4. 先发一条简短文字检查连通性。

## 添加其他模型

编辑 AiHubMix →「自定义设置」→「获取可用模型」，按实际需要选择，再保存。也可以手动填写 AiHubMix 的模型 ID。

接口地址：https://aihubmix.com/v1
协议：OpenAI Chat Completions
凭据引用：AIHUBMIX_API_KEY（密钥保存在原生凭据服务，不在启动脚本或插件配置里）

预置模型 claude-sonnet-5 来自 AiHubMix 公开 /v1/models 目录，2026-10-08 核对。为首次连接设置保守的 32768 上下文与 4096 最大输出；这不是服务商完整能力声明，可按其模型说明调整。令牌的模型权限、余额和实际调用结果仍需填写密钥后验证。

顶部现有余额按钮仍查询 DeepSeek 官方 API，不能代表 AiHubMix 余额。AiHubMix 余额请在它的控制台查看。

文字模型的连通性不代表图片生成能力；图片生成需要单独的工具或接口接入。

官方接口说明：https://aihubmix.com/developers
