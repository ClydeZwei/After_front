export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/after',
    icon: 'smile',
    name: 'after',
    access: 'AllManager',
    routes: [
      {
        path: '/after/add',
        name: '售后登记',
        icon: 'smile',
        component: './After',
      },
      {
        path: '/after/After_ana',
        name: '售后原因占比',
        icon: 'smile',
        component: './After/After_ana',
      },

      {
        path: '/after/sort/az',
        name: '绩效管理表-AZ',
        icon: 'smile',
        component: './After/sort/az',
      },
      {
        path: '/after/sort/fb',
        name: '绩效管理表-FB',
        icon: 'smile',
        component: './After/sort/fb',
      },
      {
        path: '/after/sort/cb',
        name: '绩效管理表-CB',
        icon: 'smile',
        component: './After/sort/cb',
      },
      {
        path: '/after/sort/return',
        name: '绩效管理表-退货',
        icon: 'smile',
        component: './After/sort/return',
      },
      {
        path: '/after/sort/complain',
        name: '绩效管理表-投诉',
        icon: 'smile',
        component: './After/sort/complain',
      },
    ],
  },

  {
    path: '/match',
    name: '匹配表',
    icon: 'crown',
    access: 'MatchPage',
    routes: [
      {
        path: '/match/index',
        name: '对应信息更新',
        icon: 'smile',
        component: './match/index',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '销售预报',
    icon: 'crown',
    access: 'SalerManager',
    routes: [
      {
        path: '/dashboard/skuTotal',
        name: '各sku序号销售情况',
        icon: 'smile',
        component: './dashboard/skuTotal/index',
      },
      {
        path: '/dashboard/saleRank',
        name: '销售报表',
        icon: 'smile',
        component: './dashboard/saleRank/index',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/inventory',
    name: '库存分布表',
    icon: 'smile',
    component: './inventory',
  },
  {
    path: '/todo',
    icon: 'HeatMapOutlined',
    name: 'todo',
    component: './Todo',
  },
  {
    path: '/',
    redirect: '/todo',
  },
  {
    component: './404',
  },
];
