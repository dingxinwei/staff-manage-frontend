<template>
  <el-row>
    <headTop></headTop>
    <el-col :span="12" :offset="4">
      <el-form label-width="110px">
        <el-form-item label="员工工号">
          <el-input placeholder="请输入工号" v-model="empnum"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input placeholder="请输入姓名" v-model="empname"></el-input>
        </el-form-item>
        <el-form-item label="入职日期">
          <el-date-picker
            v-model="date"
            placeholder="请选择日期"
            type="date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="员工性别">
          <el-radio v-model="radio" label="0">男</el-radio>
          <el-radio v-model="radio" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="value" placeholder="请选择部门">
            <el-option
              v-for="item in allDept"
              :key="item.did"
              :label="item.dname"
              :value="item.did"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addemp" :disabled="addEmp">立即添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      radio: '0',
      date: '',
      empname: '',
      empnum: '',
      value: '',
      allDept: [],
      addEmp: true
    }
  },
  components: {
    headTop
  },
  created () {
    this.$api.get('dept', null, (response) => {
      this.allDept = response.data.data
    })
    this.$api.get('emp/addEmpButton', {'role': sessionStorage.getItem('role')}, (response) => {
      this.addEmp = response.data.data
    })
  },
  methods: {
    addemp () {
      if (
        this.empname !== '' &&
        this.date !== '' &&
        this.empnum !== '' &&
        this.value !== ''
      ) {
        this.$api.put(
          'emp',
          {
            gender: this.radio,
            date: this.date,
            empname: this.empname,
            empnum: this.empnum,
            did: this.value
          },
          (response) => {
            if (response.data.code === 1) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.value = ''
              this.empname = ''
              this.empnum = ''
              this.date = ''
            } else {
              this.$message({
                showClose: true,
                message: '添加失败',
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
