<template>
  <div id="app" style="margin:100px;">
    <popover>
      <template v-slot:content="{close}">
        <div>popover1里面的内容</div>
        <n-button @click="close">关闭</n-button>
      </template>
      <template>
        <n-button>点我</n-button>
      </template>
    </popover>
    
    <popover position="bottom">
      <template slot="content">
        <div>popover2里面的内容</div>
      </template>
      <template>
        <n-button>点我</n-button>
      </template>
    </popover>
    
    <popover position="left">
      <template slot="content">
        <div>popover3里面的内容</div>
      </template>
      <template>
        <n-button>点我</n-button>
      </template>
    </popover>
    
    <popover position="right">
      <template slot="content">
        <div>popover4里面的内容</div>
      </template>
      <template>
        <n-button>点我</n-button>
      </template>
    </popover>
    
    <div style="margin-top:100px;">
      <popover trigger="hover">
        <template v-slot:content="{close}">
          <div>popover1里面的内容</div>
          <n-button @click="close">关闭</n-button>
        </template>
        <template>
          <n-button>点我</n-button>
        </template>
      </popover>
      
      <popover trigger='hover' position="bottom">
        <template slot="content">
          <div>popover2里面的内容</div>
        </template>
        <template>
          <n-button>点我</n-button>
        </template>
      </popover>
      
      <popover trigger='hover' position="left">
        <template slot="content">
          <div>popover3里面的内容</div>
        </template>
        <template>
          <n-button>点我</n-button>
        </template>
      </popover>
      
      <popover trigger='hover' position="right">
        <template slot="content">
          <div>popover4里面的内容</div>
        </template>
        <template>
          <n-button>点我</n-button>
        </template>
      </popover>
    </div>
  
  </div>


</template>
<script>
import Popover from './popover'
import NButton from './button/button'

export default {
  components: {
    Popover,
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
