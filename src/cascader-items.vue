<template>
  <div class="child" :style="{height}">
    <div class="left">
      <div class="label" v-for="item in children" @click="leftSelected=item">
        {{item.name}}
        <icon name="right" v-if="item.children" class="icon"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cascader-items :children="rightItems" :height="height"></cascader-items>
    </div>
  </div>
</template>

<script>
  import icon from './icon'

  export default {
    name: 'cascaderItems',
    props: {
      children: {
        default: Array
      },
      height: {
        type: String
      }
    },
    components: {
      icon
    },
    data () {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems () {
        if (this.leftSelected && this.leftSelected.children) {
          return this.leftSelected.children
        } else {
          return null
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "styles/var";
  .child {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    /*padding: 0.3em 0;*/
    .left {
      padding: 0.3em 0;
      //@extend .box-shadow;
      .label {
        padding: 0.3em 1em;
        display: flex;
        align-items: center;
      }
      .icon{
        transform: scale(0.8);
        margin-left: 0.5em;
      }
    }
    .right {
      // margin-top: -1px;
      border-left: 1px solid $border-color-light;
    }
  }
</style>
