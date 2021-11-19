const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath : "./",
  //处理svg图标不显示的问题
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  //vue/cli服务器
  devServer : {
    //配置跨域
    proxy : {
      "/api" :  {
        target : "https://imooc-admin.lgdsunday.club/prod-api/",
        changeOrigin : true,
        pathRewrite : {
          "^/api" : ""
        }
      }
    }
  },
  //关闭eslint
  lintOnSave : false
};
