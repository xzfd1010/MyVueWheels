<template>
  <div id="app">
    <n-button @click="showToast('top')">from top</n-button>
    <n-button @click="showToast('middle')">from middle</n-button>
    <n-button @click="showToast('bottom')">from bottom</n-button>
  </div>
</template>
<script>
import NButton from './button/button'

export default {
  components: {
    NButton
  },
  methods: {
    showToast (position) {
      this.$toast({
        position,
        message: '这是一条提示信息',
      })
    }
  }
}
</script>
<style lang="scss"></style>
