const menus = [
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    label: '首页',
    url: '/home/index',
  },
  {
    path: '/mall',
    name: 'mall',
    icon: 'AppstoreOutlined',
    label: '商城管理',
    url: '/mall/index',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'UserOutlined',
    label: '用户管理',
    url: '/user/index',
  },
  {
    path: '/other',
    name: 'other',
    icon: 'AppstoreOutlined',
    label: '其他',
    children: [
      {
        path: '/other/pageOne',
        name: 'pageOne',
        icon: 'AppstoreOutlined',
        label: '页面1',
        url: '/other/pageOne',
      },
      {
        path: '/other/pageTwo',
        name: 'pageTwo',
        icon: 'AppstoreOutlined',
        label: '页面2',
        url: '/other/pageTwo',
      },
    ],
  },
]

export default menus
