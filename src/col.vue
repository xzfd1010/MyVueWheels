<template>
  <div class="col" :class="colClass"
       :style="colStyle">
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
    name: 'my-col',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      },
      phone: { type: Object, validator },
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
    computed: {
      colClass () {
        let { span, offset, phone, ipad, narrowPc, pc, widePc } = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`,
          ...[phone ? `col-phone-${phone.span}` : []],
          ...[ipad ? `col-ipad-${ipad.span}` : []],
          ...[narrowPc ? `col-narrow-pc-${narrowPc.span}` : []],
          ...[pc ? `col-pc-${pc.span}` : []],
          ...[widePc ? `col-wide-pc-${widePc.span}` : []],
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
    @media(max-width: 568px) {
      $class-prefix: col-phone-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $offset-prefix: offset-phone-;
      @for $n from 1 through 24 {
        &.#{$offset-prefix}#{$n} {
          margin-left: $n / 24 * 100%;
        }
      }
    }
    @media(min-width: 569px) and(max-width: 768px) {
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
    @media(min-width: 769px) and(max-width: 992px) {
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
    @media(min-width: 993px) and(max-width: 1200px) {
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
