/*
 * @Author: zhouxingda
 * @Date: 2020-11-13 17:58:59
 * @LastEditTime: 2021-02-23 16:03:59
 * @FilePath: \vue-blog\vue.config.js
 */

module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:3000/", //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "", //请求的时候使用这个api就可以
        },
      },
    },
    // publicPath: "./",
  },
};
