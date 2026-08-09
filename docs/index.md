---
layout: home

hero:
  name: "@lo/plugins-sdk"
  text: "lo 插件开发工具包"
  tagline: |
    lo Core 与插件之间的稳定契约层。
    连接外部世界 → Resource Candidate → lo Resource。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: API 参考
      link: /api/Plugin
    - theme: alt
      text: 查看示例
      link: /examples/epub

features:
  - title: 稳定契约
    details: SDK 定义公开 API，lo Core 内部怎么改目录都不影响插件。
  - title: Resource Builder
    details: 链式构造 Resource Candidate，build() 时提前报错不进 DB 才炸。
  - title: Resource Discovery
    details: 通过 ResourceProvider 抽象，一个输入源可产出多个 Resource + Relation。
  - title: 插件分类
    details: 支持 Plugin/ResourceProvider 两种基类 + role 标签（adapter/connector/discovery）。
  - title: 统一日志与事件
    details: Logger + EventApi，插件打印/订阅方式标准化。
  - title: 纯 JavaScript + CommonJS
    details: 无额外运行时依赖，与 lo 完全相同的工程规范（jest/commitlint/VitePress）。
---
