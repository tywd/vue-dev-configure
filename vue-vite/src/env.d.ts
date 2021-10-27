/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 在main.ts 引入后在此处声明 router module
declare module '@/router/*'

// 在main.ts 引入后在此处声明 store module
declare module '@/store/*'