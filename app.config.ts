export default defineAppConfig({
  site: {
    name: 'Aeracraft',
    logo: 'A',
    socials: [
      { name: 'Discord', url: 'https://discord.gg/n9F8T6TXr', icon: 'svg:discord' },
      { name: 'QQ', url: 'https://qm.qq.com/q/e99d4kJTEs', icon: 'svg:qq' }
    ]
  },

  nav: [
    { href: '#home', key: 'nav.home' },
    { href: '#servers', key: 'nav.servers' },
    { href: '#features', key: 'nav.features' },
    { href: '#rules', key: 'nav.rules' },
    { href: '/docs', key: 'nav.docs' },
    { href: '/tools', key: 'nav.tools' }
  ],

  servers: [
    { name: '大厅服务器', host: 'play.aeracraft.cn', port: 25565 },
    { name: '多人生存服', host: 'smp.aeracraft.cn', port: 25565 },
  ],
  motdApiBase: 'https://motd.minebbs.com/api',
  refreshInterval: 30000,

  features: [
    { icon: 'i-heroicons-shield-check', titleKey: 'features.items.0.title', descKey: 'features.items.0.desc' },
    { icon: 'i-heroicons-bolt', titleKey: 'features.items.1.title', descKey: 'features.items.1.desc' },
    { icon: 'i-heroicons-users', titleKey: 'features.items.2.title', descKey: 'features.items.2.desc' },
    { icon: 'i-heroicons-sparkles', titleKey: 'features.items.3.title', descKey: 'features.items.3.desc' },
    { icon: 'i-heroicons-gift', titleKey: 'features.items.4.title', descKey: 'features.items.4.desc' },
    { icon: 'i-heroicons-wrench-screwdriver', titleKey: 'features.items.5.title', descKey: 'features.items.5.desc' }
  ],

  rules: [
    { icon: 'i-heroicons-no-symbol', textKey: 'rules.items.0' },
    { icon: 'i-heroicons-chat-bubble-left-right', textKey: 'rules.items.1' },
    { icon: 'i-heroicons-banknotes', textKey: 'rules.items.2' },
    { icon: 'i-heroicons-megaphone', textKey: 'rules.items.3' },
    { icon: 'i-heroicons-language', textKey: 'rules.items.4' },
    { icon: 'i-heroicons-user-group', textKey: 'rules.items.5' }
  ],

  announcement: {
    enabled: true,
    id: '2026-06-24',
    title: '公告标题',
    content: '公告内容，支持换行。',
    icon: 'i-heroicons-megaphone',
    color: 'primary',
    showOnce: true,
    buttons: [
      { label: '我知道了', action: 'close' },
      { label: '了解更多', action: 'link', href: 'https://discord.gg/aeracraft' }
    ]
  }
})
