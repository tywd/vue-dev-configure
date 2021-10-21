# 目标
从配置vue+webpack开始了解 vue项目如何使用的webpack插件运行与打包所经历过程
熟悉webpack常用插件用法 与 尝试做vue项目优化
# vue-webpack
> vue + webpack

### 1. 初始化并运行
```
  npm install -g @vue/cli-init
  vue init webpack ${project_name}  // vue最开始的webpack初始化
  npm i
  npm run dev // 即是执行 webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
```
### 2. webpack 相关知识
  1) webpack 的核心概念
  - entry: 入口
  - output: 输出
  - loader: 模块转换器，用于把模块原内容按照需求转换成新内容 在module里解析 
  - 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情
  2) 其他webpack概念
  - resolve 配置模块如何解析。比如配置alias [webpack-resolve](https://webpack.docschina.org/configuration/resolve/)
  - devtool 选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度  具体参数可参考webpack的devtool 配置表 [webpack-devtool](https://webpack.docschina.org/configuration/devtool/)
  - devServer 参考 build/webpack.dev.conf.js 说明

  