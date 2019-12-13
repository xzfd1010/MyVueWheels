<template>
  <div>
    <!--  大部分人使用single，所以只在multiple时候需要写  -->
    <!--  multiple  -->
    <my-nav :selected.sync="selected" >
      <my-nav-item name="home">首页</my-nav-item>
      <my-nav-item name="about">关于</my-nav-item>
      <my-nav-item name="hire">招聘</my-nav-item>
    </my-nav>
  </div>

</template>

<script>
  import MyNav from '@/nav/nav'
  import MyNavItem from '@/nav/nav-item'
  import MySubNav from '@/nav/sub-nav'

  export default {
    name: 'demo',
    components: {
      MyNav,
      MyNavItem,
      MySubNav
    },
    data () {
      return {
        selected: ['home']
      }
    },
    mounted () {
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wrapper {
    margin: 40px;
  }

  .box {
    width: 100%;
    height: 300px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

  }
</style>
