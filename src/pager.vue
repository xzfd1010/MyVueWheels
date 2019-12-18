<template>
  <div class="my-pager" :class="{hide:hideIfOnePage && totalPage===1}">
    <span class="my-pager-nav prev" :class="{disabled:currentPage===1}"
          @click="onClickPage(currentPage-1)">
      <icon name="left"></icon>
    </span>
    <template v-for="page in pages">
      <template v-if="page === currentPage">
        <span class="my-pager-item current">
          {{page}}
        </span>
      </template>
      <template v-else-if="page === '...'">
        <span class="my-pager-separator">
          <icon name="dots"></icon>
        </span>
      </template>
      <template v-else>
        <span class="my-pager-item other" @click="onClickPage(page)">
          {{page}}
        </span>
      </template>
    </template>
    <span class="my-pager-nav next" :class="{disabled:currentPage===totalPage}"
          @click="onClickPage(currentPage+1)">
      <icon name="right"></icon>
    </span>
  </div>
</template>

<script>
  import Icon from '@/icon'

  export default {
    name: 'pager',
    components: { Icon },
    props: {
      totalPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      hideIfOnePage: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      pages () {
         // 不提供initialValue的话，第一个元素会被当成initialValue
        return unique([1, this.totalPage,
          this.currentPage,
          this.currentPage - 1,
          this.currentPage - 2,
          this.currentPage + 1,
          this.currentPage + 2]
          .filter((n) => n >= 1 && n <= this.totalPage)
          .sort((a, b) => a - b))
          .reduce((prev, current, index, array) => {
            prev.push(array[index])
            if (array[index + 1] !== undefined && array[index + 1] - array[index] > 1) {
              prev.push('...')
            }
            return prev
          }, [])
      }
    },
    methods: {
      onClickPage (page) {
        this.$emit('update:currentPage', page)
      }
    }
  }

  function unique (array) {
    // return [...new Set(array)]
    const object = {}
    array.map((number) => {
      object[number] = true
    })
    return Object.keys(object).map((s) => parseInt(s, 10))
    // 不能直接.map(parseInt)，因为相当于.map(function(item,index,self))
    // 相当于 parseInt("1",0,array),parseInt("2",1,array),parseInt("3",2,array)
    // parseInt的第二个参数是进制，radix
  }
</script>

<style scoped lang="scss">
  @import "../styles/var";
  .my-pager {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    $width: 20px;
    $height: 20px;
    $font-size: 12px;
    user-select: none;
    &.hide {
      display: none;
    }
    &-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: $width;
      height: $height;
      border: 1px solid $grey;
      border-radius: $border-radius;
      margin: 0 4px;
      padding: 0 4px;
      font-size: $font-size;
      cursor: pointer;
      &.current, &:hover {
        border-color: $blue;
      }
      &.current {
        cursor: default;
      }
    }
    &-separator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: $width;
      height: $height;
      font-size: $font-size;
      margin: 0 4px;
      border: none;
      cursor: default;
    }
    &-nav {
      width: $width;
      height: $height;
      margin: 0 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: $grey;
      font-size: $font-size;
      border-radius: $border-radius;
      cursor: pointer;
      &.disabled {
        svg {
          fill: darken($grey, 30%);
        }
        cursor: default;
      }
    }
  }
</style>
