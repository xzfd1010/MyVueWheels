<template>
  <g-slides class="wrapper" :selected.sync="selected" :autoplay="true">
    <g-slides-item name="11">
      <div class="box">0</div>
    </g-slides-item>
    <g-slides-item name="22">
      <div class="box">1</div>
    </g-slides-item>
    <g-slides-item name="33">
      <div class="box">2</div>
    </g-slides-item>
  </g-slides>
</template>

<script>
  import GSlides from './slides'
  import GSlidesItem from './slides-item'

  export default {
    name: 'demo',
    components: {
      GSlides,
      GSlidesItem
    },
    data () {
      return {
        selected: ''
      }
    },
    mounted () {
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wrapper{
    margin: 40px;
  }

  .box {
    width: 100%;
    height: 300px;
    background: #ddd;
    border: 1px solid red;
  }
</style>
