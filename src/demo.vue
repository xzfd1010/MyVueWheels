<template>
  <div>
    <g-slides :selected="selected">
      <g-slides-item name="1">
        <div class="box">1</div>
      </g-slides-item>
      <g-slides-item name="2">
        <div class="box">2</div>
      </g-slides-item>
      <g-slides-item name="3">
        <div class="box">3</div>
      </g-slides-item>
    </g-slides>
  </div>
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
      let n = 1
      setInterval(() => {
        if (n > 3) {
          n = 1
        }
        this.selected = n.toString()
        n++
      }, 3000)
    }

  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .box {
    width: 200px;
    height: 150px;
    background: #ddd;
    border: 1px solid red;
  }
</style>
