export default {
  title: '@lo/plugins-sdk — lo 插件开发工具包',
  description: 'lo Core 与插件之间的稳定契约层：Plugin、ResourceProvider、Builder、Logger、EventApi',
  lang: 'zh-CN',
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    logo: null,

    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/api/Plugin' },
      { text: '插件示例', link: '/examples/epub' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '核心概念', link: '/guide/concepts' },
            { text: '插件生命周期', link: '/guide/lifecycle' },
            { text: 'Resource Discovery', link: '/guide/discovery' },
            { text: '安装到 lo 仓库', link: '/guide/install' },
          ],
        },
      ],

      '/api/': [
        {
          text: '基类',
          items: [
            { text: 'Plugin', link: '/api/Plugin' },
            { text: 'ResourceProvider', link: '/api/ResourceProvider' },
          ],
        },
        {
          text: '上下文',
          items: [
            { text: 'PluginContext', link: '/api/PluginContext' },
          ],
        },
        {
          text: 'Builder',
          items: [
            { text: 'ResourceBuilder', link: '/api/ResourceBuilder' },
            { text: 'RelationBuilder', link: '/api/RelationBuilder' },
          ],
        },
        {
          text: '工具',
          items: [
            { text: 'Logger', link: '/api/Logger' },
            { text: 'EventApi', link: '/api/EventApi' },
          ],
        },
      ],

      '/examples/': [
        {
          text: '插件示例',
          items: [
            { text: 'EPUB 适配器（ResourceProvider）', link: '/examples/epub' },
            { text: 'Git 连接器（Watch）', link: '/examples/git' },
            { text: '自定义 CLI 命令扩展', link: '/examples/command' },
          ],
        },
      ],
    },

    footer: {
      message: '基于 MIT 协议发布',
      copyright: `© ${new Date().getFullYear()} lo SDK Project`
    },

    search: { provider: 'local' },
  },
};
