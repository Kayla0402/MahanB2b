<template>
  <div class="reschedule_container">
    <!--      面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机票预定</el-breadcrumb-item>
      <el-breadcrumb-item>改期</el-breadcrumb-item>
    </el-breadcrumb>
    <!--      卡片-->
    <el-card class="box-card">
      reschedule
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Reschedule'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
