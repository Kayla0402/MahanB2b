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
            @change="handleChange">
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
            @change="handleChange">
          </el-cascader>
        </el-col>
        <el-col :span="4" class="rowCenter">
          <span>出发时间:</span>
          <input type="text" id="deptDate" v-model="pageObj.deptDate" class="dateInput" @click="deptDateClick">
        </el-col>
        <el-col :span="4" class="rowCenter" v-if="pageObj.type==='RT'">
          <span>到达时间:</span>
          <input type="text" id="arrDate" v-model="pageObj.arrDate" class="dateInput" @click="arrDateClick">
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
        <el-col :span="3">
          <el-form style="width: 100px">
            <el-form-item>
              <el-select v-model="pageObj.cabinType" placeholder="活动区域">
                <el-option label="经济舱" value="C"></el-option>
                <el-option label="商务舱" value="Y"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1" style="display: flex;margin-left: 10px">
          <el-button type="primary" @click="search">搜 索</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      // 获取全局的laydate，带入到组件中
      laydate: window.laydate,
      // 查询参数
      pageObj: {
        type: 'OW',
        deptCity: '',
        arrCity: '',
        deptDate: '',
        arrDate: '',
        adultCount: 1,
        childCount: '',
        cabinType: 'C'
      },
      options: [
        {
          value: 'CN',
          label: '中国',
          children: [{
            value: 'SHA',
            label: '上海'
          }, {
            value: 'BJS',
            label: '北京'
          }]
        },
        {
          value: 'IR',
          label: '伊朗',
          children: [{
            value: 'SYZ',
            label: '设拉子'
          }, {
            value: 'THR',
            label: '德黑兰'
          }
          ]
        },
        {
          value: 'IQ',
          label: '伊拉克',
          children: [{
            value: 'ISU',
            label: '苏莱曼尼亚'
          }, {
            value: 'EBL',
            label: '埃尔比勒'
          }]
        }
      ],
      mark: {
        '2020-2-25': ''
      },
      // 人数选择的显示和隐藏
      showNum: false
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    // 选择出发日期
    deptDateClick() {
      this.laydate.render({
        elem: '#deptDate',
        value: '',
        showBottom: false,
        mark: this.mark,
        trigger: 'click',
        min: 0,
        change: (value, date, endDate) => {
          console.log(value)
        },
        done: (value) => {
          console.log(555)
          // 2020-02-25
          this.pageObj.deptDate = value
        }
      })
    },
    // 选择到达日期
    arrDateClick() {
      this.laydate.render({
        elem: '#arrDate',
        value: '',
        showBottom: false,
        mark: this.mark,
        trigger: 'click',
        min: 0,
        ready: function(date) {
          // 得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        },
        done: (value) => {
          // 2020-02-25
          this.pageObj.arrDate = value
        }
      })
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
    search() {
      console.log(this.pageObj)
    }
  },
  computed: {
    totalCount() {
      return this.pageObj.adultCount + this.pageObj.childCount
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
</style>
