<template>
  <div class="wrapper">
    <date-picker></date-picker>
  </div>
</template>

<script>
import DatePicker from './date-picker/date-picker'

export default {
  name: 'demo',
  components: {
    DatePicker
  }
}
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
