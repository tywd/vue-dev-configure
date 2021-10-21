# vue-vuecli

# 目标
从配置vue-cli3.x之后开始了解 vue项目如何使用的vue.config.js来配置项目的
熟悉webpack常用插件用法 与 尝试做vue项目优化
# vue-vuecli vue.config.js
> vue +  > vuecli3.x

### 1. 初始化并运行
```
  npm install -g @vue/cli
  vue create project
  touch vue.config.js
  npm i
  npm run serve // 即是执行 vue-cli-service serve
```
### 2. vue.config.js 相关配置
参考官方文档 [vuecli](https://cli.vuejs.org/zh/config/) 里面有详细的配置参数说明文件vue.config.js 也做了部分参数说明

[webpack相关配置与注意事项](https://cli.vuejs.org/zh/guide/webpack.html)
主要学习了解下 `configureWebpack` `chainWebpack` 如何配置
