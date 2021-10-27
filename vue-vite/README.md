# Vue 3 + Typescript + Vite

# 目标
  - 配置Vue 3 + Typescript + Vite 熟悉 技术栈写法
  - 集成router 和 vuex
  - 引入请求拦截
  - 熟悉vite配置
# vite.config.ts
  Vite 需要 Node.js 版本 >= 12.0.0。


> ### 1. 初始化并运行
```
  npm init @vitejs/app my-vue-app --template vue
  npm install
  npm run dev
```
> ### 2. vite.config.ts 相关配置
参考官方文档 [vite](https://vitejs.cn/config/) 里面有详细的配置参数说明文件vite.config.ts 
在项目的vite.config.ts 也标注了部分参数说明，做了基础配置
 - base // 打包路径 默认是 '/' // 配置之后build后访问index.html就不会出现空白页
 - mode
 - resolve

    - alias  // 定义路径别名
 - server

    - host  // 指定服务器主机名
    - port  // 指定服务器端口
> ### 3.集成路由
  1) `npm i vue-router@4`
  2) 创建 `src/router/index.ts` 文件
  3) 新建 `src/views/home.vue` 文件
  4) 编写 `src/router/index.ts` 文件 并在 `src/main.ts` 挂载
  ```javascript
      import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
      const routes: Array<RouteRecordRaw> = [
        {
          path: '/home',
          name: 'Home',
          component: () => import(/* webpackChunkName: "Home" */ '@/views/home.vue')
        },
        { path: '/', redirect: { name: 'Home' } }
      ]
      const router = createRouter({
        history: createWebHashHistory(),
        routes
      })
      export default router

      // 挂载
      src/main.ts
      import router from '@/router/index'
      createApp(App).use(router).mount('#app')
      // 引入后在 src/env.d.ts 进行声明
      declare module '@/router/*'
 ```
 5) 改写App.vue 引入路由配置
  ```javascript
    src/App.vue 中的 template加入
    <div id="app">
      <router-view />
    </div>
    即可在浏览器访问localhost:4000/#/home
  ```
> ### 4.集成Vuex
  1) `npm i vuex@next`
  2) 创建 `src/store/index.ts` 文件
  3) 编写 `src/store/index.ts` 文件 并在 `src/main.ts` 挂载
  ```javascript
    import { createStore } from 'vuex'
    const defaultState = {
      count: 0
    }
    // Create a new store instance.
    export default createStore({
      state() {
        return defaultState
      },
      mutations: {
        increment(state: typeof defaultState) {
          state.count += 1
        }
      },
      actions: {
        increment(context) {
          context.commit('increment')
        }
      },
      getters: {
        double(state: typeof defaultState) {
          return 2 * state.count
        }
      }
    })

    // 挂载
    src/main.ts
    import store from '@/store/index'
    createApp(App).use(router).use(store).mount('#app')
    // 引入后在 src/env.d.ts 进行声明
    declare module '@/store/*'
  ```
> ### 5.集成HTTP工具 Axios (请求拦截)
