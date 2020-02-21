<template>
    <div class="registerTips_container">
      <el-card class="box-card">
        您的请求已收到，我们的销售人员会尽快与您联系的，请稍等片刻！
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'RegisterTips',
  data() {
    return {}
  }
}
</script>

<style scoped>
  .registerTips_container {
    background-color: #2b4b6b;
    height: 100%;
    color: #fff;
  }
  .box-card {
    width: 480px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
