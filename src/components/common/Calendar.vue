<template>
  <div id="calendar">
<!--    {{dates}}-->
    <div class="month">
      <ul>
        <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
        <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
        <li class="year-month" @click="pickYear(currentYear,currentMonth)">
          <span class="choose-year">{{ currentYear }}</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color:red">六</li>
      <li style="color:red">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li v-for="(dayobject,index) in days" style="height: 40px;" :key="index">
        <span v-if="dayobject.day< new Date()" class="other-month" @click="tips">
          {{ dayobject.day.getDate()}}</span>
        <span v-else>
            <span v-if="dayobject.index>=0" class="active"  @click="pickDay(dayobject.day)">{{ dayobject.day.getDate() }}</span>
            <span v-else class="other-month">{{ dayobject.day.getDate() }}</span>
        </span>
      </li>
    </ul>
    <el-button size="small" @click="closeCalendar">关闭</el-button>
  </div>
</template>

<script>
export default {
  name: 'demo',
  props: {
    dates: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      activeDays: this.dates.calendar
    }
  },
  created: function() { // 在vue初始化时调用
    this.initData(null)
  },
  methods: {
    initData: async function(cur) {
      let date
      let index = 0 // 控制显示预定的天数 ，比如下面设置只能预定三天的
      // this.initleftcount(); 每次初始化更新数量
      // 有两种方案  一种是每次翻页 ajax获取数据初始化   http请求过多会导致资源浪费
      // 一种是每次请求 ajax获取数据初始化    数据更新过慢会导致缺少实时性
      // 还可以setTimeout 定时请求更新数据  实现数据刷新（可能会更好）

      if (cur) {
        date = new Date(cur)
      } else {
        let now = new Date()// =======当前的时间
        let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))// ==========当前年+前一个月+1号
        d.setDate(35)// ==================当前年+前一个月+1号+35天
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))// ======当前年+当前月+1号
      }
      // date++++++++++当前年月的第一天
      // console.log(date + '==============if---date')
      // console.log(date.getDay() + '==============date.getDay')
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1

      this.currentWeek = date.getDay() // 1...6,0 当前年月的第一天的周几
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 当前年月第一天2020-02-01
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周(本周是当前年月的第一天之前的一周)
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        let dayobject = {}
        dayobject.day = d
        // console.log(dayobject)
        // let now = new Date()
        // console.log(d.getDate())
        // 当前年月的第一天之前的日期===当前时间
        // console.log(d.getMonth())
        // console.log(d.getFullYear())
        // console.log(this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate()))// =======2020-02-01
        d = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
        if (this.activeDays.indexOf(d) > -1) {
          dayobject.index = index++// 从今天开始显示供预定的数量
        }
        this.days.push(dayobject)// 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let dayobject = {}
        dayobject.day = d
        d = this.formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
        if (this.activeDays.indexOf(d) > -1) {
          dayobject.index = index++
        }
        this.days.push(dayobject)
      }
    },
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext: function(year, month) {
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear: function(year, month) {
      alert(year + ',' + month)
    },
    pickDay(day) {
      this.$emit('pickDate', { date: this.dateReset(day), closeCalendar: true, type: this.dates.type })
    },
    tips() {
      this.$message.warning('请选择有日期的航班')
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      let y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    },
    dateReset: function(day) {
      let y = day.getFullYear()
      let m = (day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : '' + (day.getMonth() + 1)
      let d = (day.getDate()) < 10 ? '0' + (day.getDate()) : '' + (day.getDate())
      return y + '-' + m + '-' + d
    },
    closeCalendar: function() {
      this.$emit('pickDate', { date: '', closeCalendar: true, type: this.dates.type })
    }
  }
}
</script>

<style scoped>
  .red {
    background-color: #00B8EC!important;
  }
  .red span {
    border-radius: 50%!important;
    border: 1px solid red!important;
  }
  ul {
    list-style-type: none;
  }
  body {
    font-family: Verdana, sans-serif;
    background: #E8F0F3;
  }
  #calendar{
    width:400px;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
  }
  .month {
    width: 100%;
    background: #00B8EC;
  }
  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }
  .choose-year {
    padding-left: 10px;
    padding-right: 10px;
  }
  .choose-month {
    text-align: center;
    font-size: 16px;
  }
  .arrow {
    padding: 10px;
  }
  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }
  .month ul li {
    color: white;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    color: #333;
    justify-content: space-around;
  }
  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }
  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 5px;
    padding-top: 5px;
    font-size: 1rem;
    color: #000;
  }
  .days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }
  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }
  .days li:hover {
    background: #e1e1e1;
  }
  .el-button{
    float: right;
  }
</style>
