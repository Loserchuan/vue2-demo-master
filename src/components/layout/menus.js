// 菜单-路由对照表

const menuList = [
  {
    name: '医疗板块',
    icon: 'medical-care',
    children: [
      {
        name: '浙北康复中心',
        path: '/medicalcare?id=1',
      },
      {
        name: '蜀山老年医养中心',
        path: '/medicalcare?id=2',
      },
    ],
  },
  {
    name: '体检板块',
    icon: 'physical',
    children: [
      {
        name: '爱山健康体检中心',
        path: '/physical?id=3',
      },
      {
        name: '湖滨健康体检中心',
        path: '/physical?id=3',
      },
    ],
  },
  {
    name: '数据汇总',
    icon: 'physical',
    path: '/sum',
  },
];

const menuRouteNames = [
  {
    name: '医疗板块',
    routeName: '医疗板块',
    openName: '医疗板块',
  },
  {
    name: '体检板块',
    routeName: '体检板块',
    openName: '体检板块',
  },
];

const getMenuList = () => {
  const cloneMenuList = JSON.parse(JSON.stringify(menuList));

  function fn(list) {
    list.forEach((it) => {
      if (it.children && it.children.length > 0) {
        fn(it.children);
      }
    });
  }

  fn(cloneMenuList);
  return cloneMenuList;
};

export {
  getMenuList,
  menuRouteNames,
};
