<template>
  <div class="fillcontain">
    <headTop></headTop>
    <exportExcel :data="tableData"></exportExcel>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column property="empnum" label="员工工号"> </el-table-column>
        <el-table-column property="empname" label="员工姓名" width="220">
        </el-table-column>
        <el-table-column property="dname" label="部门"> </el-table-column>
        <el-table-column property="date" label="入职日期" width="220">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              :disabled="deleteEmp"
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
      >
        <el-form :model="selectTable">
          <el-form-item label="员工工号" label-width="100px">
            <el-input v-model="selectTable.empnum" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" label-width="100px">
            <el-input v-model="selectTable.empname"></el-input>
          </el-form-item>
          <el-form-item label="员工性别" label-width="100px">
            <el-radio v-model="selectTable.gender" label="0">男</el-radio>
            <el-radio v-model="selectTable.gender" label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="入职日期" label-width="100px">
            <el-date-picker
              v-model="selectTable.date"
              placeholder="请选择日期"
              type="date"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="部门" label-width="100px" >
          <el-select v-model="selectTable.did" placeholder="请选择部门">
            <el-option
              v-for="item in allDept"
              :key="item.did"
              :label="item.dname"
              :value="item.did"
            >
            </el-option>
          </el-select>
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
import exportExcel from '@/components/exportExcel'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      limit: 20,
      count: 0,
      offset: 0,
      dialogVisible: false,
      selectTable: {},
      allDept: [],
      deleteEmp: true
    }
  },
  components: {
    headTop,
    exportExcel
  },
  created () {
    this.$api.get('emp', null, response => {
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
    this.$api.get('dept', null, (response) => {
      this.allDept = response.data.data
    })
    this.$api.get('emp/deleteEmpButton', {'role': sessionStorage.getItem('role')}, response => {
      this.deleteEmp = response.data.data
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getEmpList()
    },
    getEmpList () {
      this.$api.get('emp', null, response => {
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
      this.$api.delete(`emp/${row.empnum}`, null, response => {
        if (response.data.code === 1) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(index, 1)
          this.count = this.tableData.length
        } else {
          this.$message({
            showClose: true,
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    handleEdit (row) {
      this.selectTable = row
      this.selectTable.gender = this.selectTable.gender.toString()
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
        'emp',
        {
          empnum: this.selectTable.empnum,
          empname: this.selectTable.empname,
          gender: this.selectTable.gender,
          date: this.selectTable.date,
          did: this.selectTable.did
        },
        (response) => {
          if (response.data.code === 1) {
            this.dialogVisible = false
            this.$message({
              showClose: true,
              message: '更新成功',
              type: 'success'
            })
            this.getEmpList()
          } else {
            this.dialogVisible = false
            this.$message({
              showClose: true,
              message: '更新失败',
              type: 'error'
            })
          }
        }
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
