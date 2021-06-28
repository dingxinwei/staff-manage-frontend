<template>
  <div>
    <headTop></headTop>
    <el-table :data="tabledata" style="width:100%">
      <el-table-column type="index" label="#" width="100px"></el-table-column>
      <el-table-column property="username" label="用户名" width="150px"></el-table-column>
      <el-table-column property="role" label="权限" width="150px"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      tabledata: []
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.$api.get('user/userList', null, response => {
      this.tabledata = response.data.data
      this.tabledata.forEach(item => {
        item.role = item.role === 1 ? '超级管理员' : '普通管理员'
      })
    })
  }
}
</script>
