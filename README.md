# vue-dev-configure
- 1.vue2+webpack(vuecli 2.x) 
- 2.vue2+vuecli(vuecli 3.x) 
- 3.vue3+vite

# 说明
针对以上vue的三种配置方式来学习针对 `vue` 的 `webpack` 配置学习优化

# 1. vue2+webpack(vuecli 2.x)
- vue 最开始的模板搭建环境 
 `vue init webpack project`

# 2. vue2+vuecli(vuecli 3.x)
- vuecli3.x 开始新的模板搭建环境
  `vue create project` 

# 3.vue3+vite 
- 使用vite(非webpack搭建)  需要 Node.js 版本 >= 12.0.0。
  `sudo n` 切换node版本(Mac)
  `npm init @vitejs/app` 选择其他框架
  # npm 6.x
  `npm init @vitejs/app my-vue-app --template vue` 选择vue框架

### 具体说明查看对应文件夹里的README.md


### 其他
  1. 个人认为 `vue-cli2.x` 使用的能更多的看到webpack的相关配置，更有利于对webpack的学习
  2. 而`vue-cli3.x`之后 只使用一个`vue.config.js`, `vuecli` 已经为项目做好了配置，隐藏了更多webpack相关，但这样也更能让开发者更多的投身与业务，减少繁琐的配置

