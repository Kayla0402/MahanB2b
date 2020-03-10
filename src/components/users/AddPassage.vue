<template>
  <div class="addPassBox">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple leftPrice">
          <p class="numPerson">1</p>
          <span class="priceType">{{isAdult}}票 ￥{{showPriceType}}</span>
        </div>
      </el-col>
      <el-col :span="20" style="border-left: 1px dashed #ccc">
        <div class="grid-content bg-purple">
          <el-form :inline="true" :model="itemC" :rules="rules" class="demo-form-inline addPeoForm">
            <el-form-item label="姓(拼音)Surname:" prop="surNameCN" style="width: 30%">
              <el-input v-model="itemC.surNameCN"></el-input>
            </el-form-item>
            <el-form-item label="名(拼音)Given name:" prop="givenNameCN" style="width: 30%">
              <el-input v-model="itemC.givenNameCN"></el-input>
            </el-form-item>
            <el-form-item label="国籍:" prop="nationCode" style="width:25%">
              <el-select v-model="itemC.nationCode" placeholder="请选择国籍:">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item class="delAddPass">
              <i class="el-icon-close" @click="deleteP"></i>
            </el-form-item>
            <el-form-item prop="gender" style="width: 30%">
              <el-radio v-model="itemC.gender" label="M">男</el-radio>
              <el-radio v-model="itemC.gender" label="F">女</el-radio>
            </el-form-item>
            <el-form-item label="出生年月:" prop="birthday" style="width: 30%">
              <el-date-picker v-model="itemC.birthday" type="date" placeholder="请选择出生年月" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="手机号码:" prop="mobile" style="width: 25%">
              <el-input v-model="itemC.mobile"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="护照:" prop="passportNo" style="width: 30%">
              <el-input v-model="itemC.passportNo"></el-input>
            </el-form-item>
            <el-form-item label="护照有效日期:" prop="expireDay" style="width: 40%">
              <el-date-picker v-model="itemC.expireDay" type="date" placeholder="请选择有效日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppPassage',
  props: {
    itemC: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // 国籍
      options: [{
        value: 'CN',
        label: '中国'
      }, {
        value: 'IR',
        label: '伊朗'
      }, {
        value: 'IQ',
        label: '伊拉克'
      }, {
        value: 'AE',
        label: '阿联酋'
      }, {
        value: 'ES',
        label: '西班牙'
      }, {
        value: 'IN',
        label: '印度'
      }, {
        value: 'IT',
        label: '意大利'
      }, {
        value: 'MY',
        label: '马来西亚'
      }, {
        value: 'RS',
        label: '塞尔维亚'
      }, {
        value: 'RU',
        label: '俄罗斯'
      }, {
        value: 'TH',
        label: '泰国'
      }, {
        value: 'TR',
        label: '土耳其'
      }
      ],
      // 验证规则
      rules: {
        surNameCN: [
          { required: true, message: '请输入英文姓', trigger: 'blur' }
        ],
        givenNameCN: [
          { required: true, message: '请输入英文名', trigger: 'blur' }
        ],
        nationCode: [
          { required: true, message: '请选择国籍', trigger: 'change' }
        ],
        passportNo: [
          { required: true, message: '请输入护照号', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生年月', trigger: 'blur' }
        ],
        expireDay: [
          { required: true, message: '请选择出生年月', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        mobile: [
          { message: '请输入手机号码', trigger: 'blur' },
          { type: 'number', message: '手机号码必须为数字', trigger: 'blur' }
        ]
      },
      // 成人或者儿童
      showPrice: ''
    }
  },
  methods: {
    // 发射事件给父组件，删除当前乘客
    deleteP() {
      this.$emit('deleteIndex', { index: this.index, item: this.itemC })
    }
  },
  computed: {
    isAdult() {
      return this.isADT(this.itemC.birthday)
    },
    showPriceType() {
      if (this.isAdult === '成人') {
        return 5555
      } else {
        return 1111
      }
    }
  }
}
</script>

<style scoped>
  .addPassBox{
    margin: 10px 10px;
    border: 1px solid #eaedf1;
    border-radius: 10px;
  }
  .addPeoForm{
    margin: 10px 20px 10px 0;
    /*background-color: #eaedf1;*/
    position: relative;
    padding: 15px 15px 0;
    border-radius: 10px;
  }
  .addPeoForm >>> .el-input__inner{
    border:none;
    border-bottom: 1px solid #eaedf1;
    border-radius: 0;
    /*background-color: #eaedf1;*/
  }
  .delAddPass{
    position: absolute!important;
    right: 0px;
    top:0px;
    padding: 0 0 0 20px;
  }
  .el-select{
    margin-right: 8px;
    /*width: 120px;*/
  }
  >>> .el-form--inline .el-form-item{
    position: relative;
  }
  >>> .el-form--inline .el-form-item__label{
    font-size: 10px;
    position: absolute;
    top: -20px;
    left: 0;
    z-index: 99;
  }
  .el-date-editor{
    width: 160px;
  }
  .numPerson{
    font-size: 26px;
    color: #eaedf1;
  }
  .priceType{
    font-size: 12px;
  }
  .leftPrice{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
