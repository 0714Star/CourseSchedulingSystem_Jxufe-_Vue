<script>
import FileSubmit from "@/components/Manage/FileSubmit.vue";
import requestHelper from "@/utils/requestHelper";

export default {
  name: "SortCourse",
  components: {FileSubmit},
methods:{
  sortCourse(){
    requestHelper.get("/schedule/start").then(res=>{
      if(res.success === true){
        this.$message.success("排课成功！")
      }else if(res.success === false){
        this.$message.error("已经重复排课或排课失败！")
      }
    })
  }
}
}
</script>

<template>
<div>
这里是排课界面
  <el-card style="width: 100%;height: 200px">
    <el-button type="primary" size="medium" @click="sortCourse">点击排课</el-button>
  </el-card>
  <FileSubmit slot="学生"/>
</div>
</template>

<style scoped>

</style>