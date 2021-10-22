import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2' // 在 vite 里运行 vue2 项目
import { resolve } from 'path'
const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  // root: process.cwd(), // 默认  项目根目录（index.html 文件所在的位置） 可以是一个绝对路径，或者一个相对于该配置文件本身的路径。
  base: './', // 打包路径 默认是 '/' // 配置之后build后访问index.html就不会出现空白页
  plugins: [
    vue(),
    // createVuePlugin()
  ],
  mode: isProd ? 'production' : 'development',
  resolve: {
    // 定义路径别名
    alias: {
      '@': resolve(__dirname, 'src'),
      // "pages": resolve('src/pages/'),
      // "components": resolve('src/components/'),
      // "utils": resolve('src/utils/'),
      // "routes": resolve('src/routes/'),
      // "styles": resolve('src/styles/'),
    }
  },
  css: {},
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})
