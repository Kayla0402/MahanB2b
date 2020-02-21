<template>
  <div class="login_container">
    <div class="login_box">
      <!--      登录表单区域-->
      <el-form label-width="0" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model.trim="loginForm.username" placeholder="手机号码/邮箱"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima" v-model.trim="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <!--        按钮-->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login" class="loginBtn">登陆</el-button>
<!--          <el-button type="info" @click="resetLoginForm">重置</el-button>-->
          <el-button type="info" class="resetPassBtn" @click="resetPass">重置密码</el-button>
          <el-button type="info" class="registerBtn" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>export default {
  name: 'Login',
  data () {
    // 邮箱的正则验证规则
    let emailCheck = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    let validateTelOrEmail = (rule, value, callback) => {
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
      loginForm: {
        username: '',
        password: '',
        type: 1
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入手机号码或邮箱', trigger: 'blur' },
          { validator: validateTelOrEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
          // { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.loginForm.type = 1
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        //  验证通过是valid为true，验证不通过为false
        if (!valid) return
        if (this.loginForm.username.indexOf('@') !== -1) this.loginForm.type = 2
        const { data: res } = await this.$http.post('/user/login', this.loginForm)
        // console.log(res)
        if (res.status !== 0) return this.$message.error(res.msg)
        this.$message.success('登录成功')
        /*
        * 1.登录成功之后的token，保存到客户端的sessionStorage中
        * 1.1项目中除了登录之外的其他页面，必须在登录后才能访问
        * 1.2token值应在当前网站打开期间有效，所以将token保存在sessionStorage中
        * 2.导航跳转至首页/home
        * */
        window.sessionStorage.setItem('token', res.data.userId)
        this.$router.push('/home')
      })
    },
    register () {
      this.$router.push('/register')
    },
    // 重置密码
    resetPass() {
      this.$router.push('/resetPass')
    }
  }
}
</script>
<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login_btn {
    display: flex;
    justify-content: flex-end;
  }

  .login_form {
    position: absolute;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .loginBtn {
    width: 350px;
    margin-left: 25px;
  }
  .registerBtn{
    float: right;
    margin: 10px 25px 0 0;
    background-color: transparent;
    color: #333;
    border: 0;
  }
  .resetPassBtn{
    float: left;
    margin: 10px 25px 0 16px;
    background-color: transparent;
    color: #333;
    border: 0;
  }
  .el-button--primary {
    color: #FFF;
    /*background-color: #134743;*/
    /*border-color: #134743;*/
  }
</style>
