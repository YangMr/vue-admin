const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
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
  //关闭eslint
  lintOnSave : false
};
