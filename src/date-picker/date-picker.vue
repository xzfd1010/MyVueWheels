<template>
  <n-pop-over position="bottom">
    <template>
      <n-input type="text"></n-input>
    </template>
    <template v-slot:content>
      <div :class="c('pop')">
        <div :class="c('nav')">
          <span><n-icon name="leftleft"></n-icon></span>
          <span><n-icon name="left"></n-icon></span>
          <span @click="onClickYear">2020年</span>
          <span @click="onClickMonth">4月</span>
          <span><n-icon name="right"></n-icon></span>
          <span><n-icon name="rightright"></n-icon></span>
        </div>
        <div :class="c('content')">
          <div>
            <span v-for="i in helper.range(0,7)">{{weekdays[i]}}</span>
          </div>
          <div :class="c('date')" v-if="mode==='date'">
            <div v-for="i in helper.range(0,6)">
              <span v-for="j in helper.range(i * 7, i * 7 + 7)">{{visibleDates[j].getDate()}} </span>
            </div>
          </div>
          <div :class="c('month')" v-else-if="mode==='months'">月份</div>
          <div :class="c('year')" v-else>年份</div>
        </div>
        <div :class="c('actions')">
          <button>清除</button>
        </div>
      </div>
    </template>
  </n-pop-over>

</template>

<script>
import NInput from '../input'
import NPopOver from '../popover'
import NIcon from '../icon'
import helper from './helper'
import ClickOutSide from '../click-outside'

export default {
  name: 'data-picker',
  directives: { ClickOutSide },
  components: {
    NInput,
    NPopOver,
    NIcon
  },
  data () {
    return {
      mode: 'date',
      value: new Date(),
      helper: helper,
      weekdays: ['一', '二', '三', '四', '五', '六', '日']
    }
  },
  computed: {
    visibleDates () {
      let date = this.value
      let [year, month, day] = helper.getYearMonthDate(date)

      let firstDay = helper.firstDayOfMonth(date)
      let lastDay = helper.lastDayOfMonth(date)
      let totalLength = 42
      let curMonthLength = lastDay.getDate() - firstDay.getDate() + 1
      let curArr = []

      // 当前月的日期
      for (let i = 1; i <= curMonthLength; i++) {
        curArr.push(new Date(year, month, i))
      }
      // 上个月的日期
      // let prevDays = firstDay.getDay() > 0 ?  firstDay.getDay() - 1 : 6
      let prevLength = (firstDay.getDay() || 7) - 1
      let prevArr = []
      for (let i = 0; i < prevLength; i++) {
        prevArr.unshift(new Date(year, month, -i))
      }
      // 下个月的日期
      let nextLength = totalLength - curArr.length - prevLength
      let nextArr = []
      for (let i = 1; i <= nextLength; i++) {
        nextArr.push(new Date(year, month + 1, i))
      }

      return [...prevArr, ...curArr, ...nextArr]
    }
  },
  methods: {
    c (className) {
      return `n-date-picker-${className}`
    },
    onClickMonth () {
      this.mode = 'months'
    },
    onClickYear () {
      this.mode = 'years'
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
  .n-date-picker{
    &-nav{
      background: red;
    }
    
  }
</style>
