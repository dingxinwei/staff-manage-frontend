<template>
  <el-button type="primary" @click="exportExcel" class="right">导出</el-button>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: ['data', 'tableHeader'],
  methods: {
    exportExcel () {
      const sheetData = this.data.map(this.getHeader)
      const sheet1 = XLSX.utils.json_to_sheet(sheetData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, sheet1, '收件人列表')
      XLSX.writeFile(wb, '考勤.xlsx')
    },
    getHeader (item) {
      if ('flag' in item) {
        return {
          'ID': item.eid,
          '姓名': item.ename,
          '日期': item.date,
          '考勤': item.flag
        }
      } else {
        return {
          'ID': item.empnum,
          '姓名': item.empname,
          '部门': item.dname,
          '入职日期': item.date
        }
      }
    }
  }
}
</script>

<style>
  .right{
    float: right;
    margin-top: 10px
  }
</style>
