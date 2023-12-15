<script>
import myConst from "../../utils/myConst";

export default {
  name: "FileSubmit",
  computed: {
    myConst() {
      return myConst
    }
  },
  data(){
    return{
      user:JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)) || {}
    }
  },

  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file) {
      console.log("Remove:",file);
      this.$message({type:"success",message:file.name+"已成功移除"})
    },
    handlePreview(file) {
      console.log("pre:",file);
    },
    handlerError(err, file){
      this.$message({type:"error",message:file.name+"上传失败"})

      console.log(err,file)
    },
    handleSuccess(response, file){
      this.$message({type:"success",message:file.name+"上传成功"})
      console.log("fileSubmit:hook-response".response);

    }
  }
}
</script>

<template>
<div>
<!-- "http://localhost:8080/file/upload" -->

  <el-upload
      ref="upload"
      :action="'http://'+this.$baseUrl+'/file/upload'"
      :headers="{token:user.token}"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-error="handlerError"
      :on-success="handleSuccess"
      :auto-upload="false">

    <el-button size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">请上传xlsx/csv格式文件</div>
  </el-upload>
</div>
</template>

<style scoped>

</style>