const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { info } = require("@vue/cli-shared-utils");
const path = require("path");
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 部署应用包时的基本路径
  //相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 输出文件目录
  outputDir: "dist", // 默认dist
  // 用于嵌套生成的静态资产（js,css,img,fonts）目录
  // assetsDir: '',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: "index.html", // Default: 'index.html'
  filenameHashing: true,
  // 构建多页时使用
  pages: undefined,
  // eslint-loader是否在保存的时候检查
  // lintOnSave: process.env.NODE_ENV !== 'production',
  lintOnSave: true, //lint错误，即格式上的错误仅输出，不影响编译，设为error,则会导致编译失败
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: true,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 调整对webPack的配置,进行如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      info("production environment");
      // 生产打包时去除js里面的console.log语句,可能不去掉更好？？
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true, //舍弃console函数 默认false
              drop_debugger: false, //不移除debugger函数 默认true
              pure_funcs: ["console.log"] // 移除console
            },
            warnings: false //展示警告信息
          },
          sourceMap: false, //不要sourceMap
          parallel: true //多于一个内核，并行
        }),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          jquery: "jquery",
          "window.jQuery": "jquery"
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    } else {
      // 为开发环境修改配置...
      info("development environment");
    }
  },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的webpack 配置进行更细粒度的修改，通过链式操作修改对webpack.config.js（体现为output.js）文件的修改
 chainWebpack: config => {
    //const oneOfsMap = config.module.rule("scss").oneOfs.store;
    /*oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: [
            "./src/assets/scss/variable.scss",
            "./src/assets/scss/mixin.scss",
            "./src/assets/scss/base.scss",
            "./src/assets/scss/local-element.scss"
          ]
        })
        .end();
    });*/
    //替换output.js(即webpack.config.js)中resolve的alias参数
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"))
      .set("assets", resolve("src/assets"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("data", resolve("src/data"))
      .set("static", resolve("public/static"));
    //修改output.js(即webpack.config.js)中loader选项
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }));
    //替换output.js(即webpack.config.js)中一个规则里的loader
    const svgRule = config.module.rule("svg");
    //清除已有的所有 loader。如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    // 添加要替换的 loader
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]" 
        });
  },
  // css相关配置
  css: {
    // 启用 CSS modules 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module
    // 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: true, //设为false会导致elementUI不起作用
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，设为false不开启
    sourceMap: false,
    // css自定义预设器配置项
    loaderOptions: {}
  },
  //webpack-dev-server 相关配置
  // 设置代理
  devServer: {
    host: "localhost",
    port: 5050,
    https: false,
    open: true,
    hotOnly: false,
    proxy: {
      '/imgPre': {
        target: 'https://www.echartsjs.com/examples',
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        ws: false,//是否代理websockets
        pathRewrite: {
          '^/imgPre': ''
        }
      }
    }
    //before: app => {}
  },
  //PWA 插件相关配置,pwa指可以在移动端使用的web app
  pwa: {},
  //这是一个不进行任何 schema 验证的对象 可进行第三方插件配置
  pluginOptions: {
    // ...
  }
};
