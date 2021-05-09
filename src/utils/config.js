const prodConfig = {
  prodOrDev: 'prod', // 正式环境
  apiHost: '/apiProxy', // 接口代理关键字
  isLogin: true, // 是否需要登录验证
  title: 'xxx', // 系统名称
};

const devConfig = {
  prodOrDev: 'dev', // 开发环境
  apiHost: '/apiProxy', // 接口代理关键字
  isLogin: false, // 是否需要登录验证
  title: 'xxx', // 系统名称
};

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;

export default config;
