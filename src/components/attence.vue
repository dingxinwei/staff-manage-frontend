<template lang="">
  <div>
    <headTop></headTop>
    <exportExcel :data="tableData"></exportExcel>
    <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column property="eid" label="员工工号" width="220">
        </el-table-column>
        <el-table-column property="ename" label="员工姓名" width="220">
        </el-table-column>
        <el-table-column property="date" label="日期"> </el-table-column>
        <el-table-column property="flag" label="考勤"> </el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left; margin-top: 10px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count"
      >
      </el-pagination>
    </div>
    <el-select v-model="value" placeholder="请选择员工进行筛选" @change="handleChange">
      <el-option
      v-for="item in allEmp"
      :key="item.empnum"
      :label="item.empnum"
      :value="item.empnum">
      </el-option>
  </el-select>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import exportExcel from '@/components/exportExcel'
import Sortable from 'sortablejs'
export default {
  data () {
    return {
      tableData: [],
      copyTableDate: [],
      count: 0,
      currentPage: 1,
      offset: 0,
      limit: 20,
      allEmp: [],
      value: ''
    }
  },
  components: {
    headTop,
    exportExcel
  },
  created () {
    this.$api.get('attence', null, response => {
      response.data.data.forEach(element => {
        let date = new Date(element.date)
        element.date =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
        if (element.flag === 1) {
          element.flag = '正常'
        } else {
          element.flag = '缺勤'
        }
      })
      this.count = response.data.data.length
      this.copyTableDate = response.data.data
      this.tableData = response.data.data.slice(this.offset, this.offset + 20)
    })
    this.$api.get('emp', null, response => {
      this.allEmp = response.data.data
    })
  },
  mounted () {
    this.rowDrop()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getAttenceList()
    },
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody)
    },
    getAttenceList () {
      this.$api.get('attence', null, response => {
        response.data.data.forEach((element) => {
          let date = new Date(element.date)
          element.date =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate()
          if (element.flag === 1) {
            element.flag = '正常'
          } else {
            element.flag = '缺勤'
          }
        })
        this.tableData = response.data.data.slice(
          this.offset,
          this.offset + 20
        )
      })
    },
    handleChange () {
      this.tableData = this.copyTableDate
      this.tableData = this.tableData.filter(item => {
        return item.eid === this.value
      })
      this.count = this.tableData.length
    }
  }
}
</script>
