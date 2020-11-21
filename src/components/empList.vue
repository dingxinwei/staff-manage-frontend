<template>
  <div class="fillcontain">
    <headTop></headTop>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column property="date" label="入职日期" width="220">
        </el-table-column>
        <el-table-column property="empname" label="员工姓名" width="220">
        </el-table-column>
        <el-table-column property="empnum" label="员工工号"> </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
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
      <el-dialog
        title="修改员工信息"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        >>
        <el-form :model="selectTable">
          <el-form-item label="员工工号" label-width="100px">
            <el-input v-model="selectTable.empnum"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" label-width="100px">
            <el-input v-model="selectTable.empname"></el-input>
          </el-form-item>
          <el-form-item label="员工性别" label-width="100px">
            <el-input v-model="selectTable.gender"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="selectTable.date"
              placeholder="请选择日期"
              type="date"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateEmpInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      limit: 20,
      count: 0,
      offset: 0,
      dialogVisible: false,
      selectTable: {}
    }
  },
  components: {
    headTop
  },
  created () {
    this.$api.post('getEmp', {}, (response) => {
      response.data.data.forEach((element) => {
        let date = new Date(element.date)
        element.date =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
      })
      this.count = response.data.data.length
      this.tableData = response.data.data.slice(this.offset, this.offset + 20)
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getEmpList()
    },
    getEmpList () {
      this.$api.post('getEmp', {}, (response) => {
        response.data.data.forEach((element) => {
          let date = new Date(element.date)
          element.date =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate()
        })
        this.tableData = response.data.data.slice(
          this.offset,
          this.offset + 20
        )
      })
    },
    handleDelete (index, row) {
      this.$api.delete('delEmp', { empID: row.empnum }, (response) => {
        if (response.data.code === 1) {
          this.tableData.splice(index, 1)
          this.count = this.tableData.length
        } else {
          alert('删除失败')
        }
      })
    },
    handleEdit (row) {
      this.selectTable = row
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    updateEmpInfo () {
      this.$api.post(
        'updEmp',
        {
          empnum: this.selectTable.empnum,
          empname: this.selectTable.empname,
          gender: this.selectTable.gender,
          date: this.selectTable.date
        },
        (response) => {}
      )
    }
  }
}
</script>
<style>
.table_container {
  padding: 20px;
}
</style>
