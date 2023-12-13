<script>
import FileSubmit from "@/components/Manage/FileSubmit.vue";

export default {
  name: "SortCourse",
  components: {FileSubmit},

}
</script>

<template>
<div>
这里是排课界面

  <FileSubmit slot="学生"/>
<!--  <FileSubmit slot="教师"/>-->
<!--  <FileSubmit slot="课程"/>-->
<!--  <FileSubmit slot="班级"/>-->

</div>
</template>

<style scoped>

</style>