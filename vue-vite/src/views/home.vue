<script setup lang="ts">
import { ref } from 'vue'
import Cjty from '../components/Cjty.vue'

// defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>Home.vue</h1>
  <Cjty msg="天宇无敌" />
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
