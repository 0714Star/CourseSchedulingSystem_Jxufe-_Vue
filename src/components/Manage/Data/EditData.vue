<!--
弹窗编辑器
修改
-->
<script>
import requestHelper from "@/utils/requestHelper";

export default {
  name: "EditData",

  props:{
    listTitle:{},// key提交到后端的显示 ，value 为前端的显示 例如<id : 编号 >
    title_:String, //
  },
  data(){
    return{
      confirmVisible:false, //确认界面是否可见
      visibleEdit_Son:false, //是否可见编辑界面 ， 当前界面是props传入的，不允许更改传入的数据，这里进行拷贝 this.visibleEdit
      editData:{},
      putUrl:"",//后端路径
    }
  },
  methods:{
    openDialog(row,putUrl){
      this.editData = JSON.parse(JSON.stringify(row))//深拷贝
      this.putUrl = putUrl
      this.visibleEdit_Son = true;
    },
    closeDialog(){
      this.visibleEdit_Son = false;
    },
    openConfirmMessage(){
      this.$confirm('是否保存修改', '提交', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        requestHelper.post(this.putUrl,this.editData).then(res=>{
          if(res.code == "200"){
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            //更新父类
            this.$emit("update:table")
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '保存失败'
        });
      });
    }
  },

}
</script>

<template >
<div >
  <el-dialog :title = "title_"  :visible.sync="visibleEdit_Son"  >
  <el-form >
<!--    :label="item"-->
    <el-form-item v-for="(item,index) in listTitle" :key="index" class="tableStyle">
      <div class="content">
      <label style="width:70px">{{ item }}：</label>
      <el-input v-model="editData[index]" style="align-items: center;width: 70%"></el-input>
      </div>
    </el-form-item>
  </el-form>
    <div class="tableStyle">
    <el-button type="primary" @click.native="openConfirmMessage">保存</el-button>
    </div>
  </el-dialog>

</div>
</template>

<style scoped>
.tableStyle{
  display: flex;
  justify-content: center;
flex-direction: row;
}
.content{
  display: flex;
  justify-content: space-between;
flex-direction: row;
  width: 320px;
}
</style>