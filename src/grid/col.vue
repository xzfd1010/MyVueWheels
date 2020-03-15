<template>
  <div :class="colClass" :style="colStyle"
       class="col">
    <slot></slot>
  </div>
</template>

<script>
  let validator = (value) => {
    let keys = Object.keys(value)
    let valid = true
    keys.forEach(key => {
      if (!['span', 'offset'].includes(key)) {
        valid = false
      }
    })
    return valid
  }
  export default {
    name: 'n-col',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      },
      ipad: { type: Object, validator },
      narrowPc: { type: Object, validator },
      pc: { type: Object, validator },
      widePc: { type: Object, validator },
    },
    data () {
      return {
        gutter: 0
      }
    },
    methods: {
      createClass (spanAndOffset, prefix = '') {
        if (!spanAndOffset) return []
        let classes = []
        if (spanAndOffset.span) {
          classes.push(`col-${prefix}${spanAndOffset.span}`)
        }
        if (spanAndOffset.offset) {
          classes.push(`offset-${prefix}${spanAndOffset.offset}`)
        }
        return classes
      }
    },
    computed: {
      colClass () {
        let { span, offset, ipad, narrowPc, pc, widePc, createClass } = this
        return [
          createClass({ span, offset }),
          createClass(ipad, 'ipad-'),
          createClass(narrowPc, 'narrow-pc-'),
          createClass(pc, 'pc-'),
          createClass(widePc, 'wide-pc-')
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

<style lang="scss" scoped>
  .col {
    /*width: 50%;*/
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
    @media(min-width: 569px) {
      $class-prefix: col-ipad-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $offset-prefix: offset-ipad-;
      @for $n from 1 through 24 {
        &.#{$offset-prefix}#{$n} {
          margin-left: $n / 24 * 100%;
        }
      }
    }
    @media(min-width: 769px) {
      $class-prefix: col-narrow-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $offset-prefix: offset-narrow-pc-;
      @for $n from 1 through 24 {
        &.#{$offset-prefix}#{$n} {
          margin-left: $n / 24 * 100%;
        }
      }
    }
    @media(min-width: 993px) {
      $class-prefix: col-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $offset-prefix: offset-pc-;
      @for $n from 1 through 24 {
        &.#{$offset-prefix}#{$n} {
          margin-left: $n / 24 * 100%;
        }
      }
    }
    @media(min-width: 1201px) {
      $class-prefix: col-wide-pc-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $offset-prefix: offset-wide-pc-;
      @for $n from 1 through 24 {
        &.#{$offset-prefix}#{$n} {
          margin-left: $n / 24 * 100%;
        }
      }
    }
  }
</style>
