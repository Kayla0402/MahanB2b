<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机票预定</el-breadcrumb-item>
      <el-breadcrumb-item>航班查询及预定</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="ticketInfo" border style="width: 100%" ref="ticketInfoRef">
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
      </el-table>
<!--      <el-container>-->
<!--        <el-aside width="50%" style="background-color: #63a35c">-->
<!--          <el-button>常用乘客人列表</el-button>-->
<!--        </el-aside>-->
<!--        <el-main style="background:red">-->
<!--          <el-button>联系人信息</el-button>-->
<!--          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">-->
<!--            <el-form-item label="联系人">-->
<!--              <el-input v-model="formLabelAlign.name" placeholder="必填"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="手机号码">-->
<!--              <el-input v-model="formLabelAlign.tel" placeholder="必填"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="电子邮箱">-->
<!--              <el-input v-model="formLabelAlign.type" placeholder="必填"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="国家">-->
<!--              <el-select v-model="formLabelAlign.region" placeholder="请选择所属国家">-->
<!--                <el-option label="区域一" value="shanghai"></el-option>-->
<!--                <el-option label="区域二" value="beijing"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="城市">-->
<!--              <el-select v-model="formLabelAlign.region" placeholder="请选择所在城市">-->
<!--                <el-option label="区域一" value="shanghai"></el-option>-->
<!--                <el-option label="区域二" value="beijing"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </el-main>-->
<!--      </el-container>-->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Book',
  data() {
    return {
      // table表格必须是数组
      ticketInfo: [],
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        tel: ''
      }
    }
  },
  created() {
    this.ticketInfo[0] = this.$route.query
  }
}
</script>

<style scoped>
.el-container .el-button{
  background: #333744;
  color: #fff;
  width: 50%;
  margin: 0 auto 20px;
  height: 50px;
}
.el-aside{
  width: 48%!important;
  margin-right: 6%;
}
  .el-aside, .el-main {
    width: 50%;
    display: flex;
    padding: 0;
    flex-direction: column;
  }
.el-input__inner{
  border: none!important;
  border-bottom: 1px solid #DCDFE6!important;
  border-radius: 0!important;
}
  .el-select{
    width: 100%;
  }
</style>
