# AGENTS.md — lo-plugins-sdk（@lo/plugins-sdk）

本文件供 AI 编码助手（opencode 等）理解本项目规范。
lo 生态总纲是**独立文档**（不依赖任何本地目录布局），定义跨仓库边界与契约铁律；
如与本文档同处一个工作区，先读生态总纲再进入本仓库。

## 项目是什么

`@lo/plugins-sdk` 是 **lo Core 插件开发 SDK**（契约层）。它定义 Core Plugin 与 Core 之间的契约，
插件经它接入 Core 的 PluginManager，**运行在 lo Core 进程内**。

与 `@lo/agent-plugins-sdk`（客户端插件 SDK）互补不冲突：
- `@lo/plugins-sdk` = 扩展 **Core 世界模型能力**（进程内）
- `@lo/agent-plugins-sdk` = 扩展 **客户端交互能力**（lo-agent 内）

## 技术栈与约束

- 纯 CommonJS（`.cjs`）；Node >= 20；双空格、单引号、分号、100 列上限。
- **零运行时依赖**；`@lo/client` 不在此处 require。
- devDependencies：jest / eslint / prettier / husky / commitlint / vitepress。

## 常用命令

```bash
npm test       # Jest（sdk.test.cjs / edge.test.cjs / setup.cjs）
npm run docs:build  # vitepress build docs
```

## 结构

```
src/
  Plugin.cjs           # 插件基类
  PluginContext.cjs    # 插件上下文契约（Host 注入真实实现）
  ResourceBuilder.cjs / RelationBuilder.cjs  # 构建器
  EventApi.cjs / Logger.cjs
  index.cjs            # 统一出口
  base/ builders/      # 子模块
test/
  sdk.test.cjs / edge.test.cjs / setup.cjs
types/
  index.d.ts
```

## 契约铁律

- SDK 只定义契约，不实现业务调用；真实 `PluginContext` 由 Core PluginManager 加载时注入。
- **SDK 不依赖 lo Core 内部实现**、不 require lo-agent、不封装 `@lo/client`、不定义二次协议。
- 插件代码只从 `@lo/plugins-sdk` require，永不 require lo Core / lo-agent 内部文件。
- 新公开 API 必须同步 `types/index.d.ts`、README、测试。

## 提交规范

- Conventional Commits（type 英文小写 + subject 中文），header ≤ 72 字符。
- husky `pre-commit` 跑测试、`commit-msg` 校验。
- 不提交 `node_modules/`、`coverage/`。
