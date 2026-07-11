export default {
  pages: [
    'pages/index/index',
    'pages/guide/guide',
    'pages/shopping/shopping',
    'pages/chat/chat',
    'pages/profile/profile',
    'pages/reminders/reminders',
    'pages/review/review',
    'pages/family/family',
    'pages/knowledge/knowledge',
    'pages/charts/charts',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F472B6',
    navigationBarTitleText: '孕期智能助手',
    navigationBarTextStyle: 'white',
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#F472B6',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/guide/guide', text: '每周指南' },
      { pagePath: 'pages/shopping/shopping', text: '购物清单' },
      { pagePath: 'pages/chat/chat', text: 'AI咨询' },
      { pagePath: 'pages/profile/profile', text: '档案' },
    ],
  },
};
