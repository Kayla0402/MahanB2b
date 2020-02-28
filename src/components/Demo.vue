<!--<template>-->
<!--  <el-main>-->
<!--    <el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">-->
<!--      <h3 class="login-text">手机注册</h3>-->
<!--      <el-form-item prop="tel">-->
<!--        <el-input type="text" v-model.number="ReginForm.tel" placeholder="手机号码">-->
<!--        </el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item prop="password">-->
<!--        <el-input type="password" v-model="ReginForm.password" placeholder="密码">-->
<!--        </el-input>-->
<!--      </el-form-item>-->
<!--      <div>-->
<!--        <input class="auth_input" type="text" v-model="verification" placeholder="输入验证码"/>-->
<!--        <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>-->
<!--        <span v-show="!sendAuthCode" class="auth_text">-->
<!--          <span class="auth_text_blue">{{auth_time}} </span>-->
<!--          秒之后重新发送验证码-->
<!--        </span>-->
<!--      </div>-->
<!--      <el-form-item>-->
<!--        <el-button type="success" class="submitBtn" round @click.native.prevent="submit" :loading="logining">注册-->
<!--        </el-button>-->
<!--        <hr>-->
<!--        <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </el-main>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Demo',-->
<!--  data() {-->
<!--    // let confirmpasswordCheck = (rule, value, callback) => {-->
<!--    //   if (value === '') {-->
<!--    //     return callback(new Error('密码是必须的'))-->
<!--    //   } else {-->
<!--    //     return callback()-->
<!--    //   }-->
<!--    // }-->
<!--    let telCheck = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        return callback(new Error('电话号码是必须的'))-->
<!--      } else if (!Number.isInteger(value)) {-->
<!--        return callback(new Error('电话号码必须是数字'))-->
<!--      } else if (value.toString().length !== 11) {-->
<!--        return callback(new Error('电话号码必须是11位数字'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    return {-->
<!--      ReginForm: {-->
<!--        password: '',-->
<!--        tel: ''-->
<!--      },-->
<!--      logining: false,-->
<!--      sendAuthCode: true,-->
<!--      // 布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时'-->
<!--      auth_time: 0,-->
<!--      // 倒计时 计数器-->
<!--      verification: '',-->
<!--      // 绑定输入验证码框框-->
<!--      rule: {-->
<!--        password: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: '密码是必须的！',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        tel: [-->
<!--          {-->
<!--            required: true,-->
<!--            validator: telCheck,-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    //  验证-->
<!--    getAuthCode: function () {-->
<!--      // const verification = this.ReginForm.tel;-->
<!--      const url = ' '-->
<!--      console.log('url', url)-->
<!--      this.$http.get(url).then(function (response) {-->
<!--        console.log('请求成功', response)-->
<!--      }, function (error) {-->
<!--        console.log('请求失败', error)-->
<!--      })-->
<!--      this.sendAuthCode = false-->
<!--      // 设置倒计时秒-->
<!--      this.auth_time = 10-->
<!--      let authTimetimer = setInterval(() => {-->
<!--        this.auth_time&#45;&#45;-->
<!--        if (this.auth_time <= 0) {-->
<!--          this.sendAuthCode = true-->
<!--          clearInterval(authTimetimer)-->
<!--        }-->
<!--      }, 1000)-->
<!--    },-->
<!--    // 封装注册发送请求方法-->
<!--    thisAjax() {-->
<!--      // const passwordData = this.ReginForm.password;-->
<!--      // const phoneData = this.ReginForm.tel;-->
<!--      // const mCodeData = this.verification;-->
<!--      //  手机注册-->
<!--      // emulateJSON:true设置后post可跨域-->
<!--      const url = '填接口'-->
<!--      this.$http.post(url, { '填传入的参数': '123' }, { emulateJSON: true }).then(function (response) {-->
<!--        // 登录后跳转的页面-->
<!--        this.$router.push('/')-->
<!--      }, function (error) {-->
<!--        alert('请求失败', error)-->
<!--      })-->
<!--    },-->
<!--    // ...-->
<!--    submit() {-->
<!--      this.$refs.ReginForm.validate(valid => {-->
<!--        if (valid) {-->
<!--          this.logining = true-->
<!--          this.thisAjax()-->
<!--          console.log('开始写入后台数据')-->
<!--        } else {-->
<!--          console.log('submit err')-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    reset() {-->
<!--      this.$refs.ReginForm.resetFields()-->
<!--    },-->
<!--    tologin() {-->
<!--      // 已经注册过跳转到登入界面-->
<!--      this.$router.push('/phoneLogin')-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--  .regform {-->
<!--    margin: 20px auto;-->
<!--    width: 310px;-->
<!--    background: #fff;-->
<!--    box-shadow: 0 0 10px #B4BCCC;-->
<!--    padding: 30px 30px 0 30px;-->
<!--    border-radius: 25px;-->
<!--  }-->
<!--  .submitBtn {-->
<!--    width: 65%;-->
<!--  }-->
<!--  .to {-->
<!--    color: #FA5555;-->
<!--    cursor: pointer;-->
<!--  }-->
<!--  .auth_input{-->
<!--    width:140px;-->
<!--    height:38px;-->
<!--    margin-bottom:20px;-->
<!--    border:1px solid #DCDFE6;-->
<!--    /* color:red; */-->
<!--    padding-left:10px;-->
<!--    border-radius: 8%;-->
<!--  }-->
<!--  .regform[data-v-92def6b0]{-->
<!--    width:370px;-->
<!--    min-height: 440px;-->
<!--  }-->
<!--  .login-text{-->
<!--    text-align: center;-->
<!--    margin-bottom:20px;-->
<!--  }-->
<!--</style>-->
<template>
<!--  <div id="calendar" ref="box" v-if="isShowDialog">-->
<!--    <div class="month">-->
<!--      <ul>-->
<!--        &lt;!&ndash;点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) &ndash;&gt;-->
<!--        <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>-->
<!--        <li class="year-month" @click="pickYear(currentYear,currentMonth)">-->
<!--          <span class="choose-year">{{ currentYear }}</span>-->
<!--          <span class="choose-month">{{ currentMonth }}月</span>-->
<!--        </li>-->
<!--        <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>-->
<!--      </ul>-->
<!--    </div>-->
<!--    &lt;!&ndash; 星期 &ndash;&gt;-->
<!--    <ul class="weekdays">-->
<!--      <li>一</li>-->
<!--      <li>二</li>-->
<!--      <li>三</li>-->
<!--      <li>四</li>-->
<!--      <li>五</li>-->
<!--      <li style="color:red">六</li>-->
<!--      <li style="color:red">日</li>-->
<!--    </ul>-->
<!--    &lt;!&ndash; 日期 &ndash;&gt;-->
<!--    <ul class="days">-->
<!--      &lt;!&ndash; v-for循环 每一次循环用<li>标签创建一天 &ndash;&gt;-->
<!--      <li v-for="(dayobject,index) in days" style="height: 40px;" :key="index" @click="pickDay(dayobject.day)">-->
<!--        &lt;!&ndash;本月&ndash;&gt;-->
<!--        &lt;!&ndash;如果不是本月  改变类名加灰色&ndash;&gt;-->
<!--        <span v-if="dayobject.day< new Date()" class="other-month">-->
<!--          {{ dayobject.day.getDate()}}</span>-->

<!--        &lt;!&ndash;如果是本月  还需要判断是不是这一天&ndash;&gt;-->
<!--        <span v-else>-->
<!--          &lt;!&ndash;今天  同年同月同日&ndash;&gt;-->
<!--          <span-->
<!--            v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"-->
<!--            class="active">{{ dayobject.day.getDate() }}</span>-->
<!--          <span v-else>{{ dayobject.day.getDate() }}</span>-->
<!--        </span>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
  <div class="index" @click.stop>
    <button @click="isShow = !isShow ">{{ isShow ? '关闭':'打开' }}弹窗</button>
    <div class="content" v-show="isShow"></div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data: function() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      activeDays: ['2020-02-28', '2020-02-29', '2020-03-10', '2020-03-15'],
      isShowDialog: true,
      isShow: false
    }
  },
  created: function() { // 在vue初始化时调用
    this.initData(null)
    document.addEventListener('click', (e) => {
      console.log(this.$refs.box.contains(e.target))
      if (!this.$refs.box.contains(e.target)) {
        this.isShowDialog = false
      }
    })
  },
  methods: {
    initData: async function(cur) {
      // console.log(this.activeDays)
      // let leftcount = 0 // 存放剩余数量
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
      console.log('上个月')
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext: function(year, month) {
      console.log('下个月')
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear: function(year, month) {
      alert(year + ',' + month)
    },
    pickDay(day) {
      console.log(day)
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      let y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  },
  mounted() {
    document.body.addEventListener('click', () => {
      this.isShow = false
    }, false)
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
  .index { width:200px; }
  .content {
    margin-top:10px;
    width:200px;
    height:200px;
    background:#ccc;
  }
</style>

<!--<template>-->
<!--  <div>-->
<!--    <br>-->
<!--    <input type="text" id="test" v-model="date" class="ipt">-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  name: 'hello',-->
<!--  data () {-->
<!--    return {-->
<!--      date: null,-->
<!--      // 获取全局的laydate，带入到组件中-->
<!--      laydate: window.laydate,-->
<!--      results: ['2017-08-09', '2017-09-11', '2017-09-24', '2018-01-12'],-->
<!--      mark: null-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.laydate.render({-->
<!--      elem: '#test',-->
<!--      value: '',-->
<!--      showBottom: false,-->
<!--      mark: {-->
<!--        '2020-2-28': ''-->
<!--      },-->
<!--      min: 0,-->
<!--      done: (value) => {-->
<!--        // 2020-02-25-->
<!--        this.date = value-->
<!--      }-->
<!--    })-->
<!--  },-->
<!--  methods: {-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--  .laydate-day-mark{-->
<!--    background-color: red;-->
<!--  }-->
<!--</style>-->

<!--<template>-->
<!--   <div class="search_num">-->
<!--     <div adult-count="pageObj.adultCount" child-count="pageObj.childCount" total-count="pageObj.totalCount" @mouseover="showNum=true" @mouseleave="showNum=false">-->
<!--       <input class="selectValue" type="button" value="23"> 人-->
<!--       <div class="selectOL" v-if="showNum">-->
<!--         <div class="li">-->
<!--           <span class="ng-binding">成人</span>-->
<!--           <div class="numberEmp clearfix">-->
<!--             <input class="numBtn plus adult" type="button" value="+">-->
<!--             <input class="number number_1" type="button" value="20">-->
<!--             <input class="numBtn reduce adult" type="button" value="-">-->
<!--           </div>-->
<!--         </div>-->
<!--         <div class="li">-->
<!--           <span class="ng-binding">儿童</span>-->
<!--           <div class="numberEmp clearfix">-->
<!--             <input class="numBtn plus child" type="button" value="+">-->
<!--             <input class="number number_2" type="button" value="3">-->
<!--             <input class="numBtn reduce child" type="button" value="-">-->
<!--           </div>-->
<!--         </div>-->
<!--       </div>-->
<!--     </div>-->
<!--   </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      totalCount: 0,-->
<!--      adultCount: 1,-->
<!--      childCount: 0,-->
<!--      showNum: false-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--  .search_num {-->
<!--    margin-left: 50px;-->
<!--    margin-top: 50px;-->
<!--    background: #fff;-->
<!--    cursor: pointer;-->
<!--    line-height: 50px;-->
<!--    float: left;-->
<!--    margin-right: 0.5%;-->
<!--    width: 15%;-->
<!--    position: relative;-->
<!--    white-space: nowrap;-->
<!--    width: 8%;-->
<!--    border: 1px solid #D4B364;-->
<!--  }-->

<!--  .selectValue {-->
<!--    width: 50px;-->
<!--    text-align: center;-->
<!--    white-space: nowrap;-->
<!--    overflow: hidden;-->
<!--    text-overflow: ellipsis;-->
<!--    vertical-align: top;-->
<!--    line-height: 50px;-->
<!--    height: 50px;-->
<!--    cursor: pointer;-->
<!--    border: none;-->
<!--    background: transparent;-->
<!--    display: inline-block;-->
<!--  }-->

<!--  .selectOL {-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    top: 100%;-->
<!--    /* display: none; */-->
<!--    min-width: 100%;-->
<!--    box-shadow: 0 5px 15px -5px #333;-->
<!--  }-->

<!--  .li {-->
<!--    background: #fff;-->
<!--    margin-top: 1px;-->
<!--    padding: 10px 15px;-->
<!--    line-height: 30px;-->
<!--  }-->

<!--  .numberEmp {-->
<!--    display: inline-block;-->
<!--    vertical-align: top;-->
<!--    margin-left: 6px;-->
<!--  }-->

<!--  .numberEmp .numBtn {-->
<!--    width: 30px;-->
<!--    text-align: center;-->
<!--    background: url(../assets/images/plus.png) no-repeat;-->
<!--    text-indent: -999px;-->
<!--  }-->

<!--  .numberEmp input {-->
<!--    line-height: 30px;-->
<!--    height: 30px;-->
<!--    vertical-align: top;-->
<!--    border: none-->
<!--  }-->

<!--  .numberEmp .reduce {-->
<!--    background-position: 0 -30px;-->
<!--  }-->

<!--  .selectOL .li {-->
<!--    background: #fff;-->
<!--    margin-top: 1px;-->
<!--    padding: 10px 15px;-->
<!--    line-height: 30px;-->
<!--  }-->

<!--  input {-->
<!--    width: 30px;-->
<!--    text-align: center;-->
<!--  }-->
<!--</style>-->

<!--<template>-->
<!-- <div>-->
<!--   <el-table-->
<!--     :data="data"-->
<!--     border-->
<!--   >-->
<!--     <el-table-column-->
<!--       prop="userName"-->
<!--       :label="$t('user.username')"-->
<!--     >-->
<!--     </el-table-column>-->
<!--     &lt;!&ndash; 自定义列的遍历&ndash;&gt;-->
<!--     <el-table-column v-for="(item, index) in colunmName" :key="index" :label="item" >-->
<!--       &lt;!&ndash; 数据的遍历  scope.row就代表数据的每一个对象&ndash;&gt;-->
<!--       <template slot-scope="scope">-->
<!--         <span>{{scope.row.list[index].value}}</span>-->
<!--       </template>-->
<!--     </el-table-column>-->
<!--     <el-table-column-->
<!--       prop="Total"-->
<!--       :label="$t('ad.totalNumber')"-->
<!--     >-->
<!--     </el-table-column>-->
<!--   </el-table>-->
<!-- </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'demo1',-->
<!--  data() {-->
<!--    return {-->
<!--      colunmName: ['澳中线-悉尼-仓库', '澳中线-悉尼-仓库1'],-->
<!--      totalNumber: 100,-->
<!--      data: [{-->
<!--        list: [-->
<!--          {-->
<!--            name: '澳中线-悉尼-仓库1',-->
<!--            value: 1-->
<!--          },-->
<!--          {-->
<!--            name: '澳中线-悉尼-仓库1',-->
<!--            value: 1-->
<!--          }-->
<!--        ],-->
<!--        userName: 'admin'-->
<!--      }, {-->
<!--        list: [-->
<!--          {-->
<!--            name: '澳中线-悉尼-仓库1',-->
<!--            value: 1-->
<!--          },-->
<!--          {-->
<!--            name: '澳中线-悉尼-仓库1',-->
<!--            value: 1-->
<!--          }-->
<!--        ],-->
<!--        userName: 'jason'-->
<!--      }]-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="stylus" rel="stylesheet/stylus">-->

<!--</style>-->
