export const site = {
  name: 'AeraCraft',
  slogan: '探索无限可能',
  versionRange: '1.20.1 ~ 26.2',

  servers: {
    lobby: {
      name: '大厅',
      javaAddress: 'play.aeracraft.cn',
      bedrockAddress: 'play.aeracraft.cn',
      bedrockPort: 19132,
    },
    survival: {
      name: '生存服',
      javaAddress: 'smp.aeracraft.cn',
      bedrockAddress: 'smp.aeracraft.cn',
      bedrockPort: 19132,
    },
  },

  links: {
    official: 'https://aeracraft.com',
    userCenter: 'https://user.aeracraft.com',
    banQuery: 'https://ban.aeracraft.com',
    wiki: 'https://wiki.aeracraft.com',
    forum: 'https://forum.aeracraft.com',
    survivalMap: 'https://smap.aeracraft.com',
    qqGroup: 'https://qm.qq.com/q/Z5XREgcOgS',
    statusDocs: 'https://motd.minebbs.com/docs',
  },

  qqGroup: {
    number: '1063681956',
    link: 'https://qm.qq.com/q/Z5XREgcOgS',
  },

  nav: [
    { label: '首页', path: '/' },
    { label: '玩法介绍', path: '/games' },
    { label: '规则制度', path: '/rules' },
    { label: '加入我们', path: '/join' },
  ],

  hero: {
    title: 'AeraCraft',
    subtitle: '探索无限可能',
    description: '一个温馨的 Minecraft 群组服务器，无论你是喜欢悠闲生存、热血竞技，还是沉浸剧情，都能在这里找到属于你的冒险。',
    buttons: [
      { label: '立即加入', path: '/join', type: 'primary' },
      { label: '了解玩法', path: '/games', type: 'default' },
    ],
  },

  home: {
    serversTitle: '服务器状态',
    serversSubtitle: '实时查看服务器运行状态',
    intro: {
      title: '核心玩法',
      subtitle: '多种玩法，满足不同冒险者的需求',
    },
  },

  gameModes: {
    pageTitle: '玩法介绍',
    pageSubtitle: 'AeraCraft 提供多样化的游戏体验',
    modes: [
      {
        key: 'survival',
        name: '生存玩法',
        icon: '🌿',
        description: '经典 SMP 生存体验，与好友共建家园、探索世界、挑战末影龙。保留原版乐趣的同时，提供友好的社区环境。',
        features: ['原版生存', '玩家领地', '公平交易', '社区活动'],
      },
      {
        key: 'rpg',
        name: 'RPG 玩法',
        icon: '⚔️',
        description: '沉浸式角色扮演世界，丰富的任务剧情、职业技能与副本挑战，书写属于你的冒险传说。',
        features: ['剧情任务', '职业技能', '团队副本', '装备养成'],
      },
      {
        key: 'minigames',
        name: '小游戏',
        icon: '🎮',
        description: '轻松愉快的小游戏合集，随时随地来一局，和朋友们一较高下。',
        features: ['多种小游戏', '快速匹配', '排行榜', '好友对战'],
      },
      {
        key: 'bedwars',
        name: '起床战争',
        icon: '🛏️',
        description: '经典的起床战争玩法，收集资源、摧毁敌方床铺，成为最后的胜利者。',
        features: ['经典模式', '队伍对抗', '快速节奏', '赛季排行'],
      },
    ],
  },

  rules: {
    title: '服务器规则',
    subtitle: '共同维护良好的游戏环境',
    categories: [
      {
        title: '基本准则',
        items: [
          '尊重每一位玩家，禁止辱骂、歧视、人身攻击等行为。',
          '禁止使用任何作弊客户端、外挂、脚本或利用游戏漏洞。',
          '禁止恶意破坏他人建筑、偷窃、骚扰其他玩家。',
          '请遵守中华人民共和国相关法律法规。',
        ],
      },
      {
        title: '游戏秩序',
        items: [
          '禁止恶意刷屏、广告、诈骗信息。',
          '禁止冒充管理员或其他玩家。',
          '请合理使用游戏资源，避免恶意卡顿服务器。',
          '禁止在现实中进行金钱交易或账号买卖。',
        ],
      },
      {
        title: '处罚说明',
        items: [
          '违反规则将根据情节轻重给予警告、临时封禁或永久封禁。',
          '对处罚结果有异议可在社区或用户中心提交申诉。',
          '累计违规将导致处罚加重，严重者将永久禁止进入服务器。',
        ],
      },
    ],
  },

  join: {
    title: '加入我们',
    subtitle: '选择适合你的方式，开启 AeraCraft 冒险',
    sections: {
      serverInfo: {
        title: '连接信息',
        versionLabel: '支持版本',
        lobbyJavaLabel: '大厅 Java',
        survivalJavaLabel: '生存 Java',
        bedrockLabel: '基岩端口',
      },
      steps: {
        title: '加入步骤',
      },
      links: {
        title: '相关链接',
      },
    },
    steps: [
      { title: '启动游戏', content: '打开 Minecraft Java 版或基岩版，版本支持 1.20.1 ~ 26.2。' },
      { title: '添加服务器', content: '在多人游戏中添加服务器地址，大厅 play.aeracraft.cn，生存 smp.aeracraft.cn。' },
      { title: '开始冒险', content: '进入大厅后选择你想玩的子服，与小伙伴们一起探索吧！' },
    ],
    externalLinks: [
      { label: '玩家 Q 群', url: 'https://qm.qq.com/q/Z5XREgcOgS', description: '1063681956' },
      { label: '用户中心', url: 'https://user.aeracraft.com', description: '注册与管理账号' },
      { label: '封禁查询', url: 'https://ban.aeracraft.com', description: '查询封禁状态' },
      { label: '文档 Wiki', url: 'https://wiki.aeracraft.com', description: '查阅玩法与教程' },
      { label: '玩家社区', url: 'https://forum.aeracraft.com', description: '交流、反馈与申诉' },
      { label: '生存地图', url: 'https://smap.aeracraft.com', description: '在线查看生存服地图' },
    ],
  },

  serverStatus: {
    javaLabel: 'Java 地址',
    bedrockLabel: '基岩地址',
    onlineText: '在线',
    offlineText: '离线',
    playersLabel: '玩家',
    versionLabel: '版本',
    motdLabel: 'MOTD',
    pingLabel: '延迟',
    refreshButton: '刷新状态',
    copyButton: '复制',
    copiedText: '已复制',
    errorPrefix: '状态获取失败',
  },

  announcement: {
    enabled: true,
    notices: [
      {
        id: '20260721001',
        title: '📢 服务器公告',
        content: '欢迎来到 AeraCraft！服务器现已正式开放，欢迎各位冒险者加入我们的大家庭。',
        type: 'info',
      },
      {
        id: '20260721002',
        title: '🎁 新服福利',
        content: '新服开启期间，所有玩家上线即可获得新手礼包一份！',
        type: 'success',
      },
      {
        id: '20260721003',
        title: '⚠️ 注意事项',
        content: '请遵守服务器规则，禁止使用任何作弊手段。',
        type: 'warning',
      },
    ],
    closable: true,
    cancelButtonText: '取消',
    closable: true,
  },

  footer: {
    copyright: '© 2026 AeraCraft. All rights reserved.',
    links: [
      { label: '官网', url: 'https://aeracraft.com' },
      { label: '用户中心', url: 'https://user.aeracraft.com' },
      { label: '封禁查询', url: 'https://ban.aeracraft.com' },
      { label: 'Wiki', url: 'https://wiki.aeracraft.com' },
      { label: '社区', url: 'https://forum.aeracraft.com' },
    ],
  },
}
