# @lo/plugins-sdk — lo 插件开发工具包

> lo Core 与插件之间的稳定契约层。插件只需 `require('@lo/plugins-sdk')`，永不依赖 lo 内部目录结构。

---

## 特性

- **Plugin 基类**：通用插件的生命周期骨架（manifest → register → initialize → enable/disable → dispose）
- **ResourceProvider 抽象基类**：外部系统（EPUB/Git/Browser/…）→ Resource Candidate 的标准 Adapter
- **Builder 模式**：`ResourceBuilder` / `RelationBuilder` 链式构造，`build()` 时提前校验字段
- **PluginContext 接口**：统一暴露 `config` / `logger` / `extensions` / `hooks` / `events` / `resources` / `relations`
- **Logger & EventApi**：插件日志与事件通信的标准接口，支持分级、子 logger、异步事件
- **纯 CommonJS**：与 lo 工程规范完全一致（Jest / commitlint / VitePress），零额外运行时依赖

---

## 快速开始

```js
const { Plugin, ResourceBuilder } = require('@lo/plugins-sdk');

class HelloPlugin extends Plugin {
  manifest() {
    return { id: 'hello', name: 'Hello Plugin', version: '1.0.0' };
  }
  register(ctx) {
    ctx.extensions.register('hello', 'commands', 'hello', {
      description: '向世界打招呼',
      run(args, { logger }) {
        logger.info(`Hello, ${args.join(' ') || 'world'}!`);
      }
    });
  }
}

module.exports = HelloPlugin;
```

更多示例见：
- 入门指南：[docs/guide/getting-started.md](docs/guide/getting-started.md)
- API 参考：[docs/api/Plugin.md](docs/api/Plugin.md)
- EPUB 适配器示例：[docs/examples/epub.md](docs/examples/epub.md)

---

## 目录结构

```
lo-plugins-sdk/
├── src/
│   ├── index.cjs                  # SDK 入口（所有公开 API 从此导出）
│   ├── Plugin.cjs                 # 插件基类
│   ├── PluginContext.cjs          # 运行时上下文接口 + noop 默认注入
│   ├── Logger.cjs                 # 统一日志接口（console / silent 实现）
│   ├── EventApi.cjs               # 事件总线接口（on/off/emit/emitAsync/once）
│   ├── base/
│   │   └── ResourceProvider.cjs   # 资源发现抽象基类（Adapter/Connector 模式）
│   └── builders/
│       ├── ResourceBuilder.cjs    # Resource Candidate 链式构造器
│       └── RelationBuilder.cjs    # Relation Candidate 链式构造器
├── test/
│   ├── sdk.test.cjs               # 33 个单元测试（Builder / Plugin / Context / Logger / EventApi / Provider）
│   └── setup.cjs
├── docs/                          # VitePress 独立文档站
│   ├── index.md                   # 首页
│   ├── guide/                     # 入门指南（5 篇）
│   ├── api/                       # API 参考（7 篇）
│   ├── examples/                  # 插件示例（3 篇：EPUB / Git / Command）
│   └── .vitepress/config.mjs
├── jest.config.js
├── commitlint.config.cjs
├── .babelrc
├── .gitignore
└── package.json
```

---

## 开发命令

```bash
# 单元测试（33 cases，100% 通过）
npm test

# 实时查看测试结果
npm test -- --watch

# 启动文档本地服务
npm run docs:dev

# 构建文档静态站点
npm run docs:build

# 预览构建产物
npm run docs:preview
```

---

## 设计原则

1. **稳定契约优先**：SDK 只暴露接口与最小实现，lo Core 内部重构不影响插件
2. **Fail Fast**：Builder 在 `build()` 阶段做字段校验，错误早暴露而不是写入 DB 才炸
3. **Forward Compatible**：SDK 不硬编码 type / metadata 白名单，Core 新增能力时 SDK 不必升级
4. **Noop 默认注入**：PluginContext 所有 Facade 都有安全默认实现，单元测试不必 mock 全部依赖
5. **仓库级插件**：插件以 lo 仓库（repo）为作用域，而非全局安装，支持每个仓库独立插件集合

---

## 协议

MIT © lo SDK Project
