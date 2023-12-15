<script >
// 课程表子组件 （复用）
export default {
  name: "CourseTable",
  props: {
    courseData: Array, // 课程数据
    width:String,
  },
};
</script>

<template>
  <div>
    <!-- 课表展示 -->
    <el-table :data="courseData">
      <el-table-column prop="num" label="课节" :width="width"></el-table-column>
      <el-table-column prop="mon" label="周一" :width="width"></el-table-column>
      <el-table-column prop="tur" label="周二" :width="width"></el-table-column>
      <el-table-column prop="wes" label="周三" :width="width"></el-table-column>
      <el-table-column prop="thur" label="周四" :width="width"></el-table-column>
      <el-table-column prop="fri" label="周五" :width="width"></el-table-column>
      <el-table-column prop="sat" label="周六" :width="width"></el-table-column>
      <el-table-column prop="sun" label="周日" :width="width"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>