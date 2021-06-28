<template>
  <div class="login_page">
    <section class="content">
      <div class="title">
        <p>员工考勤管理系统</p>
      </div>
      <el-form>
        <el-form-item>
          <el-input v-model="username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </section>
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
              if (reponse.data.code === 1) {
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
  width: 100%;
  height: 100%;
}
.content {
  width: 400px;
  height: 300px;
  margin: auto;
  margin-top: 100px;
}
html,
body {
  width: 100%;
  height: 100%;
  margin-top: 0px;
  margin-left: 0px;
}
p {
  font-size: 30px;
}
.title {
  margin-bottom: 50px;
}
</style>
