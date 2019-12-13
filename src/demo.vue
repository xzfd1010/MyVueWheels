<template>
  <div>
    <my-nav :selected.sync="selected" style="margin: 20px;">
      <my-nav-item name="home">
        <a href="https://www.google.com" target="_blank">首页</a>
      </my-nav-item>
      <my-sub-nav name="about">
        <!--        <my-nav-item name="about">关于</my-nav-item>-->
        <template slot="title">关于</template>
        <my-nav-item name="culture">企业文化</my-nav-item>
        <my-nav-item name="developers">开发团队</my-nav-item>
        <!--        <my-nav-item name="contacts">联系电话</my-nav-item>-->
        <my-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <my-nav-item name="wechat">微信</my-nav-item>
          <my-nav-item name="qq">qq</my-nav-item>
          <my-sub-nav name="phone">
            <template slot="title">手机号</template>
            <my-nav-item name="cm">移动</my-nav-item>
            <my-nav-item name="cu">联通</my-nav-item>
            <my-nav-item name="cn">电信</my-nav-item>
          </my-sub-nav>
        </my-sub-nav>
      </my-sub-nav>
      <my-nav-item name="hire">招聘</my-nav-item>
    </my-nav>
    <!--  大部分人使用single，所以只在multiple时候需要写  -->
    <!--  multiple  -->
    <my-nav :selected.sync="selected" vertical style="width: 200px;margin: 20px;">
      <my-nav-item name="home">首页</my-nav-item>
      <my-sub-nav name="about">
        <!--        <my-nav-item name="about">关于</my-nav-item>-->
        <template slot="title">关于</template>
        <my-nav-item name="culture">企业文化</my-nav-item>
        <my-nav-item name="developers">开发团队</my-nav-item>
        <!--        <my-nav-item name="contacts">联系电话</my-nav-item>-->
        <my-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <my-nav-item name="wechat">微信</my-nav-item>
          <my-nav-item name="qq">qq</my-nav-item>
          <my-sub-nav name="phone">
            <template slot="title">手机号</template>
            <my-nav-item name="cm">移动</my-nav-item>
            <my-nav-item name="cu">联通</my-nav-item>
            <my-nav-item name="cn">电信</my-nav-item>
          </my-sub-nav>
        </my-sub-nav>
      </my-sub-nav>
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
        selected: 'home'
      }
    },
    watch: {
      selected (newValue) {
        if (newValue === 'hire') {
          alert('hi')
        }
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
