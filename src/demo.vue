<template>
  <div>
    <g-slides class="wrapper" :selected.sync="selected" :autoplay="true">
      <g-slides-item name="11">
        <div class="box">1</div>
      </g-slides-item>
      <g-slides-item name="22">
        <div class="box">2</div>
      </g-slides-item>
      <g-slides-item name="33">
        <div class="box">3</div>
      </g-slides-item>
    </g-slides>

    <g-button-group>
      <g-button>哈哈</g-button>
      <g-button>嘿嘿</g-button>
    </g-button-group>

  </div>

</template>

<script>
  import GSlides from './slides/slides'
  import GSlidesItem from './slides/slides-item'
  import GButton from './button/button'
  import GButtonGroup from './button/button-group'

  export default {
    name: 'demo',
    components: {
      GSlides,
      GSlidesItem,
      GButton,
      GButtonGroup,
    },
    data () {
      return {
        selected: '11'
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

  .wrapper {
    margin: 40px;
  }

  .box {
    width: 100%;
    height: 300px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

  }
</style>
