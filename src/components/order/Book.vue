<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机票预定</el-breadcrumb-item>
      <el-breadcrumb-item>航班查询及预定</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-container>
        <el-aside width="70%" style="padding: 0 0 15px 15px;margin-right: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <p>乘客：</p>
          <el-checkbox-group v-model="checkedContacts">
            <el-checkbox v-for="item in users" :key="item.id" @change="chooseContact(item,$event)"
                         :label="item.id">{{item.surNameCN}}_{{item.givenNameCN}}</el-checkbox>
            <el-button size="mini" icon="el-icon-plus" class="addPeo" @click="addContact">添加常旅客</el-button>
          </el-checkbox-group>
          <add-passage v-for="(peoInfo, index) in people"
                       :key="index"
                       :index="index"
                       :itemC="peoInfo" @deleteIndex="del"></add-passage>
          <el-button size="mini" icon="el-icon-plus" @click="addPassClick" class="mt15">添加乘客</el-button>
          <p>联系人：</p>
          <el-radio-group v-model="userUuid" @change="chooseUser">
            <el-radio :label="item.uuid" v-for="item in contacts" :key="item.uuid">{{item.name}}</el-radio>
            <el-radio :label="10">添加临时联系人</el-radio>
            <el-button size="mini" icon="el-icon-plus" class="addPeo" @click="addUser">添加常用联系人</el-button>
          </el-radio-group>
          <br>
          <el-form :inline="true" :model="contact" :rules="contactRules" class="demo-form-inline addContForm" v-if="isShowContact" ref="addContactRefs">
            <el-form-item label="手机号码:" prop="mobile">
              <el-input v-model.trim="contact.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model.trim="contact.email"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="submitBtn" @click="submit">提交订单</el-button>
        </el-aside>
        <el-main style="font-size: 12px">
          <span>{{ticketInfo.pageObj.deptDate}}</span>
          <el-row class="ticket_top">
            <el-col :span="8" class="justCenter f14">W1234 &nbsp;| &nbsp; {{ticketInfo.pageObj.cabinType=='Y'?'经济舱':'商务舱'}}</el-col>
            <el-col :span="14" class="rowCenter f14 justEnd">
              {{ticketInfo.pageObj.deptCityCN}}<img src="@assets/images/row.png" style="width: 30px">{{ticketInfo.pageObj.arrCityCN}}
            </el-col>
          </el-row>
          <el-row class="ticket_center borderB">
            <el-col :span="8">
              <el-row class="ticket_center_airport justCenter">{{ticketInfo.depSegment.depDate|timeReset}}</el-row>
<!--              <el-row class="ticket_center_airport justCenter"></el-row>-->
              <el-row class="ticket_center_airport justCenter">{{ticketInfo.depSegment.depAirportStr}}</el-row>
            </el-col>
            <el-col :span="8" class="justCenter">2h30m</el-col>
            <el-col :span="8">
              <el-row class="ticket_center_airport justCenter">{{ticketInfo.depSegment.arrDate|timeReset}}</el-row>
<!--              <el-row class="ticket_center_airport justCenter"></el-row>-->
              <el-row class="ticket_center_airport justCenter">{{ticketInfo.depSegment.arrAirportStr}}</el-row></el-col>
          </el-row>
          <el-row class="lineH30">
            <el-col :span="12" class="justStart">成人单价</el-col>
            <el-col :span="12" class="justEnd">￥{{ticketInfo.adultFare}}*{{ticketInfo.pageObj.adultCount}}</el-col>
          </el-row>
          <el-row class="lineH30">
            <el-col :span="12" class="justStart">成人税额</el-col>
            <el-col :span="12" class="justEnd">￥{{ticketInfo.adultTax}}*{{ticketInfo.pageObj.adultCount}}</el-col>
          </el-row>
          <el-row class="borderB lineH30">
            <el-col :span="12" class="justStart">成人费额</el-col>
            <el-col :span="12" class="justEnd">￥{{ticketInfo.adultFee}}*{{ticketInfo.pageObj.adultCount}}</el-col>
          </el-row>
          <div v-if="childPrice">
            <el-row class="lineH30">
              <el-col :span="12" class="justStart">儿童单价</el-col>
              <el-col :span="12" class="justEnd">￥{{ticketInfo.childFare}}*{{ticketInfo.pageObj.childCount}}</el-col>
            </el-row>
            <el-row class="lineH30">
              <el-col :span="12" class="justStart">儿童税额</el-col>
              <el-col :span="12" class="justEnd">￥{{ticketInfo.childTax}}*{{ticketInfo.pageObj.childCount}}</el-col>
            </el-row>
            <el-row class="borderB lineH30">
              <el-col :span="12" class="justStart">儿童费额</el-col>
              <el-col :span="12" class="justEnd">￥{{ticketInfo.childFee}}*{{ticketInfo.pageObj.childCount}}</el-col>
            </el-row>
          </div>
          <el-row class="totalBox">
            <el-col :span="12">{{ticketInfo.pageObj.adultCount}}成人+{{ticketInfo.pageObj.childCount}}儿童 含税价</el-col>
            <el-col :span="12" class="justEnd totalM">￥{{ticketInfo.adultFare*ticketInfo.pageObj.adultCount+ticketInfo.childFare*ticketInfo.pageObj.childCount}}</el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import AddPassage from '../users/AddPassage'
export default {
  name: 'Book',
  components: {
    AddPassage
  },
  data() {
    return {
      // table表格必须是数组
      ticketInfo: {},
      // 联系人
      userUuid: '',
      people: [],
      // 是否显示儿童票价
      childPrice: true,
      // 乘客列表
      users: [
        {
          'id': '000322a5-1e29-11ea-9021-00163e0033a8',
          'userId': '98ea0e50-516f-11ea-9586-00163e0216e7',
          'surNameCN': 'zhang',
          'givenNameCN': 'san',
          'gender': 'M',
          'nationCode': 'CN',
          'birthday': '1969-10-30',
          'passportNo': 'G56392114',
          'expireDay': '1969-10-30',
          'mobile': '18221221990',
          'psgrType': 'ADT'
        },
        {
          'id': '6e09fcab-1e2a-11ea-9021-00163e0033a8',
          'userId': '98ea0e50-516f-11ea-9586-00163e0216e7',
          'surNameCN': 'li',
          'givenNameCN': 'si',
          'gender': 'M',
          'nationCode': 'CN',
          'birthday': '1974-11-27',
          'passportNo': 'E91759119',
          'expireDay': '1969-10-30',
          'mobile': '18221221990',
          'psgrType': 'ADT'
        },
        {
          'id': '8698540c-1e27-11ea-9021-00163e0033a8',
          'userId': '98ea0e50-516f-11ea-9586-00163e0216e7',
          'surNameCN': 'wang',
          'givenNameCN': 'wu',
          'gender': 'M',
          'nationCode': 'CN',
          'birthday': '1984-07-03',
          'passportNo': 'E87071356',
          'expireDay': '1969-10-30',
          'mobile': '18221221990',
          'psgrType': 'ADT'
        },
        {
          'id': 'a034f103-1ef1-11ea-9021-00163e0033a8',
          'userId': '98ea0e50-516f-11ea-9586-00163e0216e7',
          'surNameCN': 'zhao',
          'givenNameCN': 'liu',
          'gender': 'F',
          'nationCode': 'CN',
          'birthday': '1974-02-02',
          'passportNo': 'E01694178',
          'expireDay': '1969-10-30',
          'mobile': '18221221990',
          'psgrType': 'ADT'
        },
        {
          'id': 'c1f4ac4f-2556-11ea-9021-00163e0033a8',
          'userId': '98ea0e50-516f-11ea-9586-00163e0216e7',
          'surNameCN': 'liu',
          'givenNameCN': 'qi',
          'gender': 'F',
          'nationCode': 'CN',
          'birthday': '1971-10-30',
          'passportNo': 'EJ0320852',
          'expireDay': '1969-10-30',
          'mobile': '18221221990',
          'psgrType': 'ADT'
        },
        {
          'id': 'c501a1ac-1e28-11ea-9021-00163e0033a8',
          'userId': '98ea0e50-516f-11ea-9586-00163e0216e7',
          'surNameCN': 'gou',
          'givenNameCN': 'ba',
          'gender': 'F',
          'nationCode': 'CN',
          'birthday': '1969-01-16',
          'passportNo': 'G56392103',
          'expireDay': '1969-10-30',
          'mobile': '18221221990',
          'psgrType': 'ADT'
        }
      ],
      // 联系人列表
      contacts: [
        {
          'uuid': '1',
          'name': '张三',
          'mobile': '18221221990',
          'email': '974297362@qq.om',
          'userid': null,
          'companyid': null,
          'createdate': null,
          'createby': null
        },
        {
          'uuid': '2',
          'name': '李四',
          'mobile': '18621105520',
          'email': '1111111@qq.com',
          'userid': null,
          'companyid': null,
          'createdate': null,
          'createby': null
        }
      ],
      // userId
      userId: '',
      // 选中项的乘机人
      checkedContacts: [],
      // 临时联系人信息
      contact: {
        mobile: '',
        email: ''
      },
      contactRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      // 提交订单的联系人信息
      contactBook: [],
      // 验价传回的sessionId
      sessionId: ''
    }
  },
  created() {
    this.ticketInfo = this.$route.query
    this.userId = this.getToken('token')
    this.getContacts()
    this.getUsers()
    this.testPrice()
  },
  methods: {
    addPassClick() {
      this.people.unshift({ 'id': '', 'userId': '', 'surNameCN': '', 'givenNameCN': '', 'gender': '', 'nationCode': '', 'birthday': '', 'passportNo': '', 'expireDay': '', 'mobile': '', 'psgrType': '' })
    },
    del(val) {
      // 从people列表中删除这个乘客
      this.people.splice(val.index, 1)
      // contacts中，要把复选框状态改为false状态
      this.checkedContacts = this.checkedContacts.filter(checkedContact => {
        return checkedContact !== val.item.id
      })
      // if (val !== 0) {
      //   console.log('删除')
      //   this.people.splice(val, 1)
      //   // 删除了常用乘客，要把复选框默认为false状态
      // }
    },
    confirm() {
      console.log(this.people)
    },
    // 请求联系人数据
    async getContacts() {
      const { data: res } = await this.$http.post('/user/queryTempContacts', { userId: this.userId })
      if (res.status !== 0) return this.$message.error(res.msg)
      // this.contacts = res.data.list
    },
    // 请求乘机人数据
    async getUsers() {
      const { data: res } = await this.$http.post('/user/queryTempUsers', { userId: this.userId })
      if (res.status !== 0) return this.$message.error(res.msg)
      // this.users = res.data.list
    },
    // 乘机人选中
    chooseContact(item, e) {
      if (e) {
        this.people.unshift(item)
      } else {
        this.people = this.people.filter(per => {
          return per.id !== item.id
        })
      }
    },
    // 添加常用乘客
    addContact() {
      this.$message.success('跳转至添加常用乘客页面')
    },
    // 添加常用联系人
    addUser() {
      this.$message.success('跳转至添加常用User联系人页面')
    },
    // 选择联系人
    chooseUser() {
      if (this.userUuid !== 10) {
        this.contactBook = this.contacts.filter(contact => {
          return contact.uuid === this.userUuid
        })
      } else {
        this.contactBook[0] = this.contact
      }
    },
    // 提交订单
    async submit() {
      // 如果是添加联系人，验证表单
      if (this.userUuid === 10) {
        this.$refs.addContactRefs.validate(valid => {
          //  验证通过是valid为true，验证不通过为false
          if (!valid) return false
        })
      }
      let params = {
        userId: this.userId,
        routing: this.ticketInfo,
        passengers: this.people,
        contact: this.contactBook[0],
        appId: '',
        privateKey: '',
        sessionId: this.sessionId
      }
      const { data: res } = await this.$http.post('/flight/book', params)
      console.log(res)
      if (res.status !== 0) return this.$message.error(res.msg)
    },
    // 验价
    async testPrice() {
      let params = {
        routing: this.ticketInfo,
        appId: '',
        privateKey: '',
        adultNum: this.ticketInfo.pageObj.adultCount,
        childNum: this.ticketInfo.pageObj.childCount,
        sessionId: this.ticketInfo.sessionId
      }
      const { data: res } = await this.$http.post('/flight/price', params)
      if (res.status !== 0) {
        this.$router.push('/order/search')
        return this.$message.error('验价失败，请重新查询')
      }
      this.sessionId = res.data.sessionId
    }
  },
  computed: {
    isShowContact() {
      return this.userUuid === 10
    }
  }
}
</script>

<style scoped>
  /deep/ .el-card__body{
    padding: 0;
  }
.el-table td{
  padding: 0;
}
.addPeo{
  padding: 7px 7px;
  margin-left: 20px;}
  .ticket_top{height: 40px;line-height: 40px}
  .ticket_center{height: 80px;line-height: 80px;}
  .ticket_center_airport{height: 35px;line-height: 35px}
  .borderB{
    border-bottom:1px dashed #eaedf1;
    padding-bottom: 10px;
  }
  .totalM{
    color: orangered;
    font-size: 26px;
    font-weight: bold;
  }
  .lineH30{
    line-height: 30px;
  }
  .addContForm{
    margin-top: 15px;
  }
  .totalBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
  .submitBtn{
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
  }
</style>
