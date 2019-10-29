<template>
  <div class="child">
    <div class="left">
      <div class="label" v-for="item in children" @click="leftSelected=item">
        {{item.name}}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <cascader-items :children="rightItems"></cascader-items>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cascaderItems',
    props: {
      children: {
        default: Array
      }
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
  .child {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    .left {
      border: 1px solid red;
    }
    .right {
      // margin-top: -1px;
    }
  }
</style>
