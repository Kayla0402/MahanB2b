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
        <el-col :span="3">
          <el-radio-group v-model="pageObj.type">
            <el-radio-button label="OW">单程</el-radio-button>
            <el-radio-button label="RT">往返</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="4" class="rowCenter">
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
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {
  },
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
        adultCount: '',
        childCount: '',
        cabinType: ''
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
      }
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
    }
  },
  mounted() {
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
</style>
