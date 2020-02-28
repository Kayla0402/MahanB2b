<template>
  <div class="search_container">
    <!--      面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机票预定</el-breadcrumb-item>
      <el-breadcrumb-item>航班查询及预定</el-breadcrumb-item>
    </el-breadcrumb>
    <!--      卡片-->
    <el-card class="box-card">
      <el-row>
        <el-col :span="1">
          <el-radio v-model="pageObj.type" label="OW">单程</el-radio>
          <el-radio v-model="pageObj.type" label="RT">往返</el-radio>
        </el-col>
        <el-col :span="4" class="rowCenter mL10">
          <span>出发地：</span>
          <el-cascader
            v-model="pageObj.deptCity"
            :options="options"
            class="city"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            @change="handleChangeDep" clearable>
          </el-cascader>
        </el-col>
        <el-col :span="4" class="rowCenter">
          <span>目的地：</span>
          <el-cascader
            v-model="pageObj.arrCity"
            :options="options"
            class="city"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            @change="handleChangeArr" clearable>
          </el-cascader>
        </el-col>
        <el-col :span="4" class="rowCenter date">
          出发日期：
          <el-input
            v-model="pageObj.deptDate" @focus="deptDateFocus">
          </el-input>
          <calendar class="calendar" v-if="showDepDate" :dates="deptCalendar" @pickDate="getDate"/>
        </el-col>
        <el-col :span="4" class="rowCenter date" v-if="pageObj.type==='RT'">
          返程日期：
          <el-input
            v-model="pageObj.returnDate"  @focus="returnDateFocus">
          </el-input>
          <calendar class="calendar" v-if="showReturnDate" :dates="returnCalendar" @pickDate="getDate"/>
        </el-col>
        <el-col :span="2" style="position: relative">
          <div class="search_num" @mouseover="showNum=true" @mouseleave="showNum=false">
            {{totalCount}} 人
            <div class="selectOL" v-if="showNum">
              <div class="li">
                <span class="ng-binding">成人</span>
                <div class="numberEmp clearfix">
                  <input class="numBtn plus adult" type="button" value="+" @click="adultAdd">
                  <input class="number number_1" type="button" v-model="pageObj.adultCount">
                  <input class="numBtn reduce adult" type="button" value="-" @click="adultReduce">
                </div>
              </div>
              <div class="li">
                <span class="ng-binding">儿童</span>
                <div class="numberEmp clearfix">
                  <input class="numBtn plus child" type="button" value="+" @click="childAdd">
                  <input class="number number_2" type="button" v-model="pageObj.childCount">
                  <input class="numBtn reduce child" type="button" value="-" @click="childReduce">
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <el-form style="width: 100px">
            <el-form-item>
              <el-select v-model="pageObj.cabinType" placeholder="活动区域">
                <el-option label="经济舱" value="Y"></el-option>
                <el-option label="商务舱" value="C"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1" style="display: flex;margin-left: 5px">
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-col>
      </el-row>
      <el-table :data="routings" border style="width: 100%" ref="searchListRef">
        <el-table-column label="" width="50">
          <template scope="scope">
            <el-radio style="color: #fff" :label="scope.$index" v-model="bookParams" @change.native="checkSearch(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="航班号" >
          <template slot-scope="scope">
            <p v-for="(num,a) in scope.row.depSegments" :key="a">{{num.flightNo}}</p>
            <p class="ret" v-for="(num,b) in scope.row.retSegments" :key="'ret-'+b">{{num.flightNo}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="出发机场">
          <template slot-scope="scope">
            <p v-for="(num,c) in scope.row.depSegments" :key="c">{{num.depAirportStr}}</p>
            <p class="ret" v-for="(num,d) in scope.row.retSegments" :key="'ret-'+d">{{num.depAirportStr}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="到达机场">
          <template slot-scope="scope">
            <p v-for="(num,e) in scope.row.depSegments" :key="e">{{num.arrAirportStr}}</p>
            <p class="ret" v-for="(num,f) in scope.row.retSegments" :key="'ret-'+f">{{num.arrAirportStr}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="出发时间">
          <template slot-scope="scope">
            <p v-for="(num,g) in scope.row.depSegments" :key="g">{{num.depDate | dateReset}}</p>
            <p class="ret" v-for="(num,h) in scope.row.retSegments" :key="'ret-'+h">{{num.depDate | dateReset}}</p>
          </template>
        </el-table-column>
        <el-table-column label="到达时间">
          <template slot-scope="scope">
            <p v-for="(num,i) in scope.row.depSegments" :key="i">{{num.arrDate | dateReset}}</p>
            <p class="ret" v-for="(num,j) in scope.row.retSegments" :key="'ret-'+j">{{num.arrDate | dateReset}}</p>
          </template>
        </el-table-column>
        <el-table-column label="历时">
          <template slot-scope="scope">
            <p v-for="(num,k) in scope.row.depSegments" :key="k">{{num.journeyDuration}}</p>
            <p class="ret" v-for="(num,l) in scope.row.retSegments" :key="'ret-'+l">{{num.journeyDuration}}</p>
          </template>
        </el-table-column>
        <el-table-column label="舱种">
          <template slot-scope="scope">
            <p v-for="(num,f) in scope.row.depSegments" :key="f">
              <span v-if="num.cabinType === 'Y'">经济舱</span>
              <span v-else>商务舱</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="totalFare" label="价格" width="80"></el-table-column>
      </el-table>
      <div class="book">
        <el-button type="primary" @click="book" :disabled="isBook">预定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入城市数据
import citys from '@constants/Citys'
// 导入日期组件
import Calendar from '../common/Calendar'
Object.freeze(citys)
export default {
  name: 'Search',
  components: {
    Calendar
  },
  data() {
    return {
      // 查询参数
      pageObj: {
        type: 'OW',
        deptCity: '',
        arrCity: '',
        deptDate: '',
        returnDate: '',
        adultCount: 1,
        childCount: 0,
        cabinType: 'C',
        startDate: '1990-01-01',
        endDate: '2222-01-01'
      },
      options: citys,
      // 人数选择的显示和隐藏
      showNum: false,
      // 总的航班信息
      routings: [],
      // 单选
      radio: 1,
      bookParams: '',
      // 控制去程日历的显示
      showDepDate: false,
      showReturnDate: false,
      // 去程时间数据
      deptCalendar: {
        calendar: [],
        type: 'dept'
      },
      // 返程时间数据
      returnCalendar: {
        calendar: [],
        type: 'arr'
      },
      // 预定参数
      goBookParams: {}
    }
  },
  methods: {
    // 日期转换的方法
    handleChangeDep(value) {
      if (value.length > 0) {
        this.pageObj.deptCity = value[1]
      } else {
        this.pageObj.deptCity = ''
      }
    },
    handleChangeArr(value) {
      if (value.length > 0) {
        this.pageObj.arrCity = value[1]
      } else {
        this.pageObj.arrCity = ''
      }
    },
    // 下拉菜单
    handleClick() {
      alert('button click')
    },
    adultAdd() {
      return this.pageObj.adultCount >= 9 ? 9 : this.pageObj.adultCount++
    },
    adultReduce() {
      return this.pageObj.adultCount <= 1 ? 1 : this.pageObj.adultCount--
    },
    childAdd() {
      return this.pageObj.childCount >= 9 ? 9 : this.pageObj.childCount++
    },
    childReduce() {
      return this.pageObj.childCount <= 0 ? 0 : this.pageObj.childCount--
    },
    // 搜索
    async search() {
      const { data: res } = await this.$http.post('/flight/searchFlight', this.pageObj)
      if (res.status !== 0) return this.$message.error(res.msg)
      this.routings = res.data.routings
    },
    // 选去程
    checkSearch(params) {
      this.goBookParams = params
    },
    // 去程日历
    async deptDateFocus() {
      // 获取去程日历的时间
      if (!this.pageObj.deptCity || !this.pageObj.arrCity) return this.$message.error('请先选择出发地和目的地')
      let depDateParams = {
        deptCity: this.pageObj.deptCity,
        arrCity: this.pageObj.arrCity,
        startDate: '1990-01-01',
        endDate: '2222-01-01'
      }
      const { data: res } = await this.$http.post('/flight/avFlightLineCalendar', depDateParams)
      if (res.status !== 0) return this.$message.error(res.msg)
      this.deptCalendar.calendar = res.data.flightScheduleCalendar
      this.showDepDate = true
    },
    // 返程日历
    async returnDateFocus() {
      // 获取去程日历的时间
      if (!this.pageObj.deptCity || !this.pageObj.arrCity) return this.$message.error('请先选择出发地和目的地')
      let returnDateParams = {
        deptCity: this.pageObj.arrCity,
        arrCity: this.pageObj.deptCity,
        startDate: '1990-01-01',
        endDate: '2222-01-01'
      }
      const { data: res } = await this.$http.post('/flight/avFlightLineCalendar', returnDateParams)
      if (res.status !== 0) return this.$message.error(res.msg)
      this.returnCalendar.calendar = res.data.flightScheduleCalendar
      this.showReturnDate = true
    },
    // 子组件选择去程日期，
    getDate(msg) {
      if (msg.type === 'arr') {
        this.showReturnDate = false
        this.pageObj.returnDate = msg.date
      } else {
        this.showDepDate = false
        this.pageObj.deptDate = msg.date
      }
    },
    // 预定页面
    book() {
      this.goBookParams.pageObj = this.pageObj
      let pageObj = []
      pageObj[0] = this.goBookParams
      this.$router.push({ path: '/order/book', query: this.goBookParams })
    }
  },
  computed: {
    totalCount() {
      return this.pageObj.adultCount + this.pageObj.childCount
    },
    isBook() {
      if (JSON.stringify(this.goBookParams) === '{}') {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
  .city{
    width: 120px;
  }
  .dateInput{
    -webkit-appearance: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 10px;
    width: 120px;
    margin-left: 10px;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-input-number{
    width: 120px;
  }
  .el-input-number[data-v-8074698e]{
    margin-right: 15px;
  }
/*  人数的选择*/
  .search_num {
    background: #fff;
    cursor: pointer;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    width: 80px;
    text-align: center;
  }
  .selectOL {
    position: absolute;
    left: 0;
    top: 42px;
    min-width: 180px;
    box-shadow: 0 5px 15px -5px #333;
    z-index: 9999;
  }

  .li {
    background: #fff;
    margin-top: 1px;
    padding: 10px 15px;
    line-height: 30px;
  }

  .numberEmp {
    display: inline-block;
    vertical-align: top;
    margin-left: 6px;
  }

  .numberEmp .numBtn {
    width: 30px;
    text-align: center;
    background: url(../../assets/images/plus.png) no-repeat;
    text-indent: -999px;
  }

  .numberEmp input {
    line-height: 30px;
    height: 30px;
    vertical-align: top;
    border: none
  }

  .numberEmp .reduce {
    background-position: 0 -30px;
  }

  .selectOL .li {
    background: #fff;
    margin-top: 1px;
    padding: 10px 15px;
    line-height: 30px;
  }

  input {
    width: 30px;
    text-align: center;
  }
/*  人数选择结束*/
  thead .el-table-column--selection .cell{
    display: none;
  }
  .el-card{
    overflow: visible;
  }
  .tabelCol .el-radio__label{
    color: #fff;
  }
  .date {
    position: relative;
  }
  .date .el-input{
    width: 115px;
  }
  .date .calendar{
    position: absolute;
    z-index: 99999;
    left: 0;
    top: 40px
  }
  .book{
    display: flex;
    justify-content: flex-end;
    padding-top: 30px;
  }
</style>
