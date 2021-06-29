<template>
  <div class="login_page">
    <div class="box">
      <el-form>
        <el-form-item  class="item">
          <h1>员工考勤管理系统</h1>
        </el-form-item>
        <el-form-item class="item">
          <el-input v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-input
            type="password"
            v-model="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" style="width: 100%" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username !== '' && this.password !== '') {
        this.$api.post(
          'user/login',
          { username: this.username, password: this.password },
          reponse => {
            if ('data' in reponse) {
              if (reponse.data.code === 200) {
                this.$message({
                  showClose: true,
                  message: '恭喜你，登录成功',
                  type: 'success'
                })
                sessionStorage.setItem('sid', '1')
                if (reponse.data.data.role) {
                  sessionStorage.setItem('role', reponse.data.data.role)
                }
                this.$router.push('manage')
              } else {
                this.$message({
                  showClose: true,
                  message: '用户名或密码错误',
                  type: 'error'
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: '网络错误或服务器未启动',
                type: 'error'
              })
            }
          }
        )
      }
    }
  }
}
</script>
<style scoped>
.login_page {
  height: 625px;
  background-image: url('../assets/login-background.jpg');
  background-size: cover;
}
.item{
  width: 300px;
}
.box{
  width: 300px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

}

</style>
