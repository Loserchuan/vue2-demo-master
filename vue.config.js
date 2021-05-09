module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: false,
  devServer: {
    open: true, // 启动时打开浏览器
    port: 4040, // 端口号
    proxy: { // 接口反向代理
      '/apiProxy': {
        target: 'http://172.21.244.176:8081/',
        changeOrigin: true,
        pathRewrite: (path) => path.replace('/apiProxy', ''),
      },
    },
  },
};
