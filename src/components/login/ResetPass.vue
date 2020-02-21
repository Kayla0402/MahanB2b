<template>
    <div class="resetPass_container">
      <div class="resetPass_box">
        <!--      重置表单区域-->
        <el-form label-width="auto" label-position="left" class="resetPass_form" :model="resetPassForm" :rules="resetPasswordFormRules" ref="resetFormRef">
<!--          手机号码-->
          <el-form-item label="手机号码/邮箱" prop="account" class="labClass">
            <el-input v-model.trim="resetPassForm.account"></el-input>
          </el-form-item>
<!--          验证码-->
          <el-form-item label="验证码" prop="pin" class="labClass">
            <el-input v-model.trim="resetPassForm.pin"></el-input>
            <el-button v-if="sendCode" class="verifyBtn" @click="verifyClick">发送验证码</el-button>
            <el-button v-else class="verifyBtn btnDisable" type="info" disabled>{{auth_time}}s</el-button>
          </el-form-item>
<!--          密码-->
          <el-form-item label="密码" prop="password" class="labClass">
            <el-input v-model.trim="resetPassForm.password" show-password></el-input>
          </el-form-item>
<!--          确认密码-->
          <el-form-item label="确认密码" prop="checkPass" class="labClass">
            <el-input v-model.trim="resetPassForm.checkPass" show-password></el-input>
          </el-form-item>
<!--          重置按钮-->
          <el-form-item class="resetPass_btn">
            <el-button type="primary" @click="resetPass" class="regBtn">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ResetPass',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.resetPassForm.checkPass !== '') {
          this.$refs.resetFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetPassForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 邮箱的正则验证规则
    let emailCheck = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    let validateAccount = (rule, value, callback) => {
      // indexOf找不到返回-1,用户输入的是手机号码
      if (value.indexOf('@') === -1) {
        if (value.trim().length !== 11) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      } else {
        if (!emailCheck.test(value)) callback(new Error('请输入正确的邮箱地址'))
        callback()
      }
    }
    return {
      // 注册信息
      resetPassForm: {
        account: '',
        password: '',
        checkPass: '',
        pin: '0231',
        type: 1
      },
      // 注册信息校验规则
      resetPasswordFormRules: {
        account: [
          { required: true, message: '请输入手机号码/邮箱', trigger: 'blur' },
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true }
        ],
        pin: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
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
    resetPass() {
      this.resetPassForm.type = 1
      this.$refs.resetFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求，
        if (this.resetPassForm.account.indexOf('@') !== -1) this.resetPassForm.type = 2
        const { data: res } = await this.$http.post('/user/modifiyPwd', this.resetPassForm)
        // console.log(res)
        if (res.status !== 0) return this.$message.error(res.msg)
        this.$message.success('修改成功')
        this.$router.push('/login')
      })
    },
    // 发送验证码
    async verifyClick() {
      this.resetPassForm.type = 1
      if (!this.resetPassForm.account) return this.$message.error('请输入手机号码或邮箱')
      this.sendCode = false
      // 设置倒计时秒
      this.auth_time = 100
      let authTimetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendCode = true
          clearInterval(authTimetimer)
        }
      }, 1000)
      // 发送验证码的请求
      if (this.resetPassForm.account.indexOf('@') !== -1) this.resetPassForm.type = 2
      const { data: res } = await this.$http.post('/securityCode/modifiyPwdSecurityCode', { account: this.resetPassForm.account, type: this.resetPassForm.type })
      // console.log(res)
      if (res.status !== 0) return this.$message.error(res.msg)
    }
  }
}
</script>

<style scoped>
  .resetPass_container {
    background-color: #2b4b6b;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 100%;
  }

  .resetPass_box {
    width: 500px;
    border-radius: 3px;
    margin: 100px auto;
  }

  .resetPass_btn {
    position: absolute;
    right: 30px;
    /*transform: translate(-50%, 0);*/
  }

  .regBtn {
    width: 320px;
    margin-bottom: 50px;
  }

  .resetPass_form {
    position: relative;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .el-button--primary {
    font-weight: bold;
  }

  .verifyBtn {
    position: absolute;
    right: 0;
    color: #333;
    top: 1px;
  }
  .btnDisable {
    background-color: #909399;
  }
</style>
