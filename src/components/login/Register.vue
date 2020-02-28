<template>
    <div class="register_container">
      <div class="register_box">
        <!--      注册表单区域-->
        <el-form label-width="auto" label-position="left" class="register_form" :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
<!--          手机号码-->
          <el-form-item label="手机号码" prop="mobile" class="labClass">
            <el-input v-model.trim="registerForm.mobile"></el-input>
          </el-form-item>
<!--          密码-->
          <el-form-item label="密码" prop="password" class="labClass">
            <el-input v-model.trim="registerForm.password" show-password></el-input>
          </el-form-item>
<!--          确认密码-->
          <el-form-item label="确认密码" prop="checkPass" class="labClass">
            <el-input v-model.trim="registerForm.checkPass" show-password></el-input>
          </el-form-item>
<!--          验证码-->
          <el-form-item label="验证码" prop="pin" class="labClass">
            <el-input v-model.trim="registerForm.pin"></el-input>
            <el-button v-if="sendCode" class="verifyBtn" @click="verifyClick">发送验证码</el-button>
            <el-button v-else class="verifyBtn btnDisable" type="info" disabled>{{auth_time}}s</el-button>
          </el-form-item>
<!--          公司名称-->
          <el-form-item label="公司名称" prop="companyName" class="labClass">
            <el-input v-model.trim="registerForm.companyName"></el-input>
          </el-form-item>
<!--          公司所在城市-->
          <el-form-item label="公司所在城市" prop="city" class="labClass">
            <el-input v-model.trim="registerForm.city"></el-input>
          </el-form-item>
<!--          公司地址-->
          <el-form-item label="公司地址" class="labClass">
            <el-input v-model.trim="registerForm.address"></el-input>
          </el-form-item>
<!--          联系人姓名-->
          <el-form-item label="联系人姓名" prop="contant" class="labClass">
            <el-input v-model.trim="registerForm.contant"></el-input>
          </el-form-item>
<!--          联系人部门-->
          <el-form-item label="联系人部门" class="labClass">
            <el-input v-model.trim="registerForm.customerDept"></el-input>
          </el-form-item>
<!--          联系人邮箱-->
          <el-form-item label="联系人邮箱" class="labClass" prop="email">
            <el-input v-model.trim="registerForm.email"></el-input>
          </el-form-item>
<!--          关注的业务-->
          <el-form-item label="关注的业务" class="labClass">
            <el-radio-group v-model="registerForm.business">
              <el-radio label="1" name="type">散客机票</el-radio>
              <el-radio label="2" name="type">团队机票</el-radio>
              <el-radio label="3" name="type">散客机票+团队机票</el-radio>
              <el-radio label="4" name="type">其他业务</el-radio>
              <el-radio label="5" name="type">散客+其他业务</el-radio>
              <el-radio label="6" name="type">团队+其他业务</el-radio>
              <el-radio label="7" name="type">散客+团队+其他业务</el-radio>
              <el-input v-model.trim="registerForm.businessOther" placeholder="其他业务" class="focusInput"></el-input>
            </el-radio-group>
          </el-form-item>
<!--          注册按钮-->
          <el-form-item class="register_btn">
            <el-button type="primary" @click="register" class="regBtn">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    let validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('负责人手机号不可为空'))
      } else {
        if (value !== '') {
          let reg = /^1[3456789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'))
          }
        }
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 注册信息
      registerForm: {
        mobile: '',
        password: '',
        checkPass: '',
        pin: '',
        // 公司
        companyName: '',
        city: '',
        address: '',
        // 联系人
        contant: '',
        customerDept: '',
        email: '',
        // 关注的业务
        business: '7',
        businessOther: ''
      },
      // 注册信息校验规则
      registerFormRules: {
        mobile: [
          // { required: true, message: '请输入手机号码', trigger: 'blur' },
          // { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }
          { validator: validateMobilePhone, trigger: 'blur', required: true }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true }
        ],
        pin: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        contant: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入公司所在城市', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      // 发送验证码切换按钮
      sendCode: true,
      // 布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时'
      auth_time: 0
    }
  },
  methods: {
    // 注册
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        if (this.auth_time === 0) return this.$message.error('验证码已失效，请重新获取')
        // 发起请求，
        // console.log(this.registerForm)
        const { data: res } = await this.$http.post('/user/reg', this.registerForm)
        // console.log(res)
        if (res.status !== 0) return this.$message.error(res.msg)
        this.$router.push('/register/tips')
      })
    },
    // 发送验证码
    async verifyClick() {
      if (!this.registerForm.mobile) return this.$message.error('请输入手机号码')
      this.sendCode = false
      // 设置倒计时秒
      this.auth_time = 120
      let authTimetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendCode = true
          clearInterval(authTimetimer)
        }
      }, 1000)
      // 发送验证码的请求
      const { data: res } = await this.$http.post('/securityCode/registerSecurityCode', { mobile: this.registerForm.mobile })
      if (res.status !== 0) return this.$message.error(res.msg)
    }
  }
}
</script>

<style scoped>
  .register_container {
    background-color: #2b4b6b;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 100%;
  }

  .register_box {
    width: 500px;
    border-radius: 3px;
    margin: 0 auto;
  }

  .register_btn {
    position: absolute;
    right: 30px;
    /*transform: translate(-50%, 0);*/
  }

  .regBtn {
    width: 400px;
    margin-bottom: 50px;
  }

  .register_form {
    position: relative;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .el-radio {
    color: #fff;
    margin-bottom: 10px;
  }

  .verifyBtn {
    position: absolute;
    right: 0;
    /*background: #134743;*/
    color: #333;
    top: 1px;
  }
  .btnDisable {
    background-color: #909399;
  }

  .focusInput {
    margin-top: 10px;
  }
</style>
