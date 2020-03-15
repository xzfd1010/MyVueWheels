---
title: 快速上手
---

# 使用
> 直接引入组件及样式即可
>
```vue
<template>
    <div id="app">
        <GButton></Gbutton>
    </div>
</template>
<script>
import {NButton} from 'nick-vue-wheels' 
import 'nick-vue-wheels/dist/my-wheel.css'

export default{
    name:'app'
    components:{NButton},
}
</script>
```
