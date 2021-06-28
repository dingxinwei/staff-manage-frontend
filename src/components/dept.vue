<template lang="">
  <div>
    <headTop></headTop>
    <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column property="dname" label="部门" width="220">
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    headTop
  },
  created () {
    this.$api.get('dept', null, response => {
      this.tableData = response.data.data
    })
  }
}
</script>
