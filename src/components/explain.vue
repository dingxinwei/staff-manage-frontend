<template lang="">
  <div>
    <headTop></headTop>
    <p>本系统是一个员工考勤管理系统</p>
    <p>用户分为超级管理员和普通管理员</p>
    <p>超级管理拥有所有权限，普通管理员只有修改和查看的权限</p>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  components: {
    headTop
  }
}
</script>
<style scoped>
 p {
   font-size: 20px;
 }
</style>
