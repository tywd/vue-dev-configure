const path = require("path");
const glob = require('glob')
const StylelintPlugin = require("stylelint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV === 'production'
const pagesInfo = require('./pages.config')
const pages = {}
const resolve = dir => path.join(__dirname, dir);

glob.sync('./src/pages/**/main.js').forEach(entry => {
  let chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.js/)[1];
  const curr = pagesInfo[chunk];
  if (curr) {
    pages[chunk] = {
      entry,
      ...curr,
      chunk: ["chunk-vendors", "chunk-common", chunk]
    }
  }
})

module.exports = {
  publicPath: isProd ? '/production-sub-path/' : './',
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // pages, // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
  lintOnSave: false, // boolean | 'warning' | 'default' | 'error' // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。 更多细节可查阅：Runtime + Compiler vs. Runtime only。
  productionSourceMap: !isProd, // 生产环境的 source map 可以将其设置为 false 以加速生产环境构建。
  crossorigin: '', // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  // 更多细节可查阅：配合 webpack > 简单的配置方式
  configureWebpack: config => {
    const plugins = [];
    if (!isProd) {
      plugins.push(
        new StylelintPlugin({
          files: ["src/**/*.vue", "src/assets/**/*.scss"],
          fix: true
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。 更多细节可查阅：配合 webpack > 链式操作
  chainWebpack: config => {
    // 修改 Loader 选项
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })

    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@scss", resolve("src/assets/scss"))
    if (isProd) {
      // 压缩图片
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.90],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          }
        });

      // 打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
        analyzerMode: "static"
      }]);
    }
  },
  // css 配置
  css: {
    extract: isProd, // 生产环境下是 true，开发环境下是 false  是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 设置为 true 之后可能会影响构建的性能
    modules: false, // 启用 CSS modules for all css / pre-processor files.
    // css预设器配置项 //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "@scss/variables.scss";
          @import "@scss/mixins.scss";
          @import "@scss/function.scss";
          $src: "${process.env.VUE_APP_BASE_API}";
          `
      },
      // postcss: {
      //   plugins: [
      //     require('postcss-plugin-px2rem')({
      //       rootValue: 100,
      //       exclude: /(node_modules|src\/components|sceneDefine2|sceneEleManage|sceneList|stylesheet)/,
      //       mediaQuery: false,
      //       selectorBlackList: ['no-rem']
      //     })
      //   ]
      // }
    },
  },
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    open: true, // 将服务启动后默认打开浏览器
    //   host: "localhost", // 使用花生壳之类的 需改为 0.0.0.0
    //   port: 8080,
    //   https: false,
    //   hotOnly: false,
    //   disableHostCheck: true, // 使用花生壳之类的 需设为false
    //  // 该配置项可以在HTTP响应中注入一些HTTP响应头
    //   headers: {
    //     'X-foo': '112233'
    //   },
    // proxy: 'http://localhost:4000'
    /* proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    } */
  },
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  // 第三方插件配置
  pluginOptions: {},
}