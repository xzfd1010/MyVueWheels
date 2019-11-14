<template>
  <div class="slides">
    <div class="slides-window">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slides',
    props:{
      selected:{
        type:String
      }
    },
    methods:{
      updateChildren(){
        let first = this.$children[0]
        let selected = this.selected || first.name
        this.$children.forEach((vm)=>{
          vm.selected = selected
        })
      }
    },
    mounted(){
      this.updateChildren()
    },
    updated(){
      this.updateChildren()
    }
  }
</script>

<style scoped lang="scss">
  .slides {
    display: inline-block;
    border: 1px solid #000;
    &-window {
      position: relative;
      overflow: hidden;
    }
  }

</style>
