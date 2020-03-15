<template>
  <div id="app">
    <tabs :selected.sync="selectedTab">
      <tabs-head>
        <template slot="actions">
          <n-button>编辑</n-button>
        </template>
        <tabs-item name="woman">
          <icon name="settings"></icon>
          美女
        </tabs-item>
        <tabs-item name="life">
          生活
        </tabs-item>
        <tabs-item name="finance" disabled>
          财经
        </tabs-item>
      </tabs-head>
      <tabs-body>
        <tabs-pane name="woman">
          美女相关资讯
        </tabs-pane>
        <tabs-pane name="finance">
          财经相关资讯
        </tabs-pane>
      </tabs-body>
    </tabs>
  </div>


</template>
<script>
import Tabs from './tabs/tabs'
import TabsPane from './tabs/tabs-pane'
import TabsHead from './tabs/tabs-head'
import TabsItem from './tabs/tabs-item'
import TabsBody from './tabs/tabs-body'
import Icon from './icon'
import NButton from './button/button'

export default {
  components: {
    Icon,
    Tabs,
    TabsHead,
    TabsBody,
    TabsItem,
    TabsPane,
    NButton,
  },
  data () {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      selectedTab: 'woman'
    }
  },

}
</script>
<style lang="scss"></style>
