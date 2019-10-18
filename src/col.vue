<template>
  <div class="col" :class="colClass"
       :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-col',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      },
    },
    data () {
      return {
        gutter: 0
      }
    },
    computed: {
      colClass () {
        let { span, offset } = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`
        ]
      },
      colStyle () {
        let { gutter } = this
        return {
          paddingLeft: gutter / 2 + 'px',
          paddingRight: gutter / 2 + 'px'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .col {
    /*width: 50%;*/
    height: 50px;
    > div {
      background: gray;
      border: 1px solid red;
    }
    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: $n / 24 * 100%;
      }
    }
    $offset-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$offset-prefix}#{$n} {
        margin-left: $n / 24 * 100%;
      }
    }
  }
</style>
