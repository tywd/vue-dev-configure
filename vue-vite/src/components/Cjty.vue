<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>() // 接收父组件传来的参数

const count = ref(0)
</script>

<template>
  <h1>Cjty.vue</h1>
  <h1>{{ msg }}</h1>
  <h2>嗨木嗨啊</h2>

</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
