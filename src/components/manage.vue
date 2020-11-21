<template>
  <div class="manage_page">
    <el-row style="height: 100%">
      <el-col :span="4" style="height: 100%; background-color: #324057">
        <el-menu
          style="min-height: 100%"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="defaultActive"
          router
        >
          <el-menu-item index="manage">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">员工管理</template>
            <el-menu-item index="empList">员工列表</el-menu-item>
            <el-menu-item index="addEmp">添加员工</el-menu-item>
            <el-menu-item index="selEmp">查询员工</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">考勤管理</template>
            <el-menu-item index="attence">考勤统计</el-menu-item>
            <el-menu-item index="selAttence">查询考勤</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">部门管理</template>
            <el-menu-item index="depList">部门列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">用户管理</template>
            <el-menu-item index="userList">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">设置</template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">说明</template>
            <el-menu-item index="explain">系统说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>
<style>
.manage_page {
  width: 100%;
  height: 100%;
}
html,
body {
  height: 100%;
  margin-top: 0px;
  margin-left: 0px;
}
</style>
