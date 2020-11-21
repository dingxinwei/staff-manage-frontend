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
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="员工性别">
          <el-radio v-model="radio" label="0">男</el-radio>
          <el-radio v-model="radio" label="1">女</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addemp">立即创建</el-button>
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
      radio: '1',
      date: '',
      empname: '',
      empnum: ''
    }
  },
  components: {
    headTop
  },
  methods: {
    addemp () {
      this.$api.post(
        'addemp',
        {
          gender: this.radio,
          date: this.date,
          empname: this.empname,
          empnum: this.empnum
        },
        (response) => {
          if (response.data.code === 1) {
            alert('添加成功')
          } else {
            alert('添加失败')
          }
        }
      )
    }
  }
}
</script>
