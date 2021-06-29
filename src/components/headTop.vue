<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <a href="#" style="color:black;font-size:15px" @click.prevent="logout">退出</a>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$router.push('/')
      sessionStorage.removeItem('sid')
      this.$api.post('user/logout', null, reponse => {
        if (reponse.data.code === 200) {
          this.$message({
            showClose: true,
            message: '退出成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '退出失败',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style>
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
</style>
