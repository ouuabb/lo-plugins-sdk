# ResourceProvider

**[Resource Discovery](../../guide/discovery) 抽象基类**，继承自 [Plugin](./Plugin)。

做外部数据适配的插件应该继承此类而不是 Plugin。

```js
const { ResourceProvider, ResourceBuilder, RelationBuilder } = require('@lo/sdk');

class EpubAdapter extends ResourceProvider {
  manifest() {
    return {
      id: 'epub',
      name: 'EPUB Adapter',
      version: '0.1.0',
      role: 'adapter',
    };
  }

  supports(source) {
    return typeof source === 'string' && source.endsWith('.epub');
  }

  async discover(ctx, epubPath) {
    const book = ResourceBuilder
      .note()
      .name('书名')
      .meta('title', '书名')
      .build();

    const chapter = ResourceBuilder
      .note()
      .name('第一章')
      .meta('category', '章节')
      .build();

    return [
      { resource: book },
      {
        resource: chapter,
        relations: [
          RelationBuilder.contains('__0__', '__1__').meta('order', 1).build()
        ],
      },
    ];
  }
}

module.exports = EpubAdapter;
```

---

## 子类必须实现

### `async discover(ctx: PluginContext, source: any): Promise<ProviderCandidate[]>`

从输入源发现资源，返回候选数组。

每个元素结构：

```ts
type ProviderCandidate = {
  resource: ResourceCandidate;          // 必填，ResourceBuilder.build() 构造
  relations?: RelationCandidate[];      // 可选，本批次内的关系
};
```

批次内 rid **占位符**（Core 会在应用前替换）：
- `'__N__'` — 批次中第 N 个 candidate 的 rid（从 0 开始，如 `'__0__'` 指向第一个 resource）
- `'__self__'` — 指向自己的 rid（当 relation.to_rid/__from_rid 想关联到同一 candidate 的 resource 自身）

---

## 子类可选重写

### `supports(source): boolean | Promise<boolean>`

判断输入源是否支持。默认返回 `true`。

### `async watch(source, onChange): Promise<() => void>`

启动增量监听。默认抛错 `not supported`。

`onChange(newCandidates: ProviderCandidate[])` 有新资源时调用。返回 dispose 函数。

---

## 自动行为

- `register(ctx)` 自动把自己注册为 `resourceProviders.<providerId>` 扩展点，方便 Core 调度
