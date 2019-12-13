<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]:true}"
          @click="$emit('click')">
    <icon class="icon" v-if="icon && !loading" :name="icon"></icon>
    <icon class="icon loading" v-if="loading" name="loading"></icon>
    <span class="content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  import Icon from '../icon'

  export default {
    name: 'my-button',
    components: {
      'icon': Icon
    },
    props: {
      icon: {
        type: String,
      },
      loading: {
        type: Boolean,
        default: false
      },
      iconPosition: {
        type: String,
        default: 'left',
        validator (value) {
          return value === 'left' || value === 'right'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/var";
  .g-button {
    font-size: $font-size;
    height: $button-height;
    line-height: 1;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $button-bg;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: $border-color-hover;
    }
    &:active {
      background-color: $button-active-bg;
    }
    &:focus {
      outline: none;
    }
    > .icon {
      order: 1;
      margin-right: .1em;
    }
    > .content {
      order: 2;
    }
    &.icon-right {
      > .icon {
        order: 2;
        margin-left: .1em;
        margin-right: 0;
      }
      > .content {
        order: 1;
      }
    }
    .loading {
      animation: spin 1.5s infinite linear;
    }
  }


</style>
