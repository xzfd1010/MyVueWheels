<template>
    <div class="wrapper" :class="{error}">
        <input type="text" :value="value" :disabled="disabled" :readonly="readonly"
               @change="$emit('change',$event.target.value)"
               @focus="$emit('focus',$event.target.value)"
               @blur="$emit('blur',$event.target.value)"
               @input="$emit('input',$event.target.value)"/>
        <template v-if="error">
            <icon name="error" class="icon-error"></icon>
            <span class="error-message">{{error}}</span>
        </template>
    </div>
</template>

<script>
  import Icon from './icon'

  export default {
    name: 'my-input',
    components: {
      Icon
    },
    props: {
      value: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
    //定义变量
    $height: 32px;
    $border-color: #999;
    $border-color-hover: #666;
    $border-radius: 4px;
    $font-size: 12px;
    $box-shadow-color: rgba(0, 0, 0, 0.5);
    $red: #F1453D;
    $disabled-color: #bbb;
    .wrapper {
        font-size: $font-size;display: inline-flex;align-items: center;
        > :not(:last-child) {margin-right: 0.5em;}
        > input {height: $height;border: 1px solid $border-color;border-radius: $border-radius;padding: 0 8px;font-size: inherit;
            &:hover {border-color: $border-color-hover;}
            &:focus {box-shadow: inset 0 1px 3px $box-shadow-color;outline: none;}
            &[disabled], &[readonly] {border-color: $disabled-color;color: $disabled-color;cursor: not-allowed;}
        }
        &.error {
            > input {border-color: $red;}
        }
        .icon-error {font-size: 1.2em;margin-right: 0;fill: $red;}
        .error-message {color: $red;}
    }
</style>
