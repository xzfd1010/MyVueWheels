<template>
  <div class="my-pager">
    <span v-for="page in pages" class="my-pager-item"
          :class="{active:page===currentPage, separator:page==='...'}">
      {{page}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'pager',
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
    data () {
      let pages = unique([1, this.totalPage,
        this.currentPage,
        this.currentPage - 1,
        this.currentPage - 2,
        this.currentPage + 1,
        this.currentPage + 2]
        .sort((a, b) => a - b))
        .reduce((prev, current, index, array) => {
          prev.push(array[index])
          if (array[index + 1] !== undefined && array[index + 1] - array[index] > 1) {
            prev.push('...')
          }
          return prev
        }, []) // 不提供initialValue的话，第一个元素会被当成initialValue
      return {
        pages: pages
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
    &-item {
      border: 1px solid $grey;
      border-radius: $border-radius;
      padding: 0 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      min-width: 20px;
      height: 20px;
      margin: 0 4px;
      cursor: pointer;
      &.active, &:hover {
        border-color: $blue;
      }
      &.active {
        cursor: default;
      }
      &.separator{
        border: none;
        cursor: default;
      }
    }
  }
</style>
