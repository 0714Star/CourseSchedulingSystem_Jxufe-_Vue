<template>
<div>
<!--  上传区域 action="http://localhost:8080/course/import"       :action="$baseUrl+'/course/import'"  -->
  <el-upload
      :action="this.$baseUrl+'/course/import'"
      :headers="{token:user.token}"
      :on-exceed="this.load"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      >
    <el-button size="small" type="primary">点击上传课程信息</el-button>
    <div slot="tip" class="el-upload__tip">请上传excel文件，不能超过1024MB</div>
  </el-upload>
<!--  表单显示  -->
  <el-table :data="tableData"  stripe>
    <el-table-column type="selection"></el-table-column>
    <!--    课程编号	 -->
    <el-table-column prop="cid" label="课程编号" ></el-table-column>
    <!--    课程容量	-->
    <el-table-column prop="ccapacity" label="课程容量" ></el-table-column>
    <!--    学时	-->
    <el-table-column prop="chours" label="学时" ></el-table-column>
    <!--    名称	-->
    <el-table-column prop="cname" label="名称" ></el-table-column>
    <!--    类型	-->
    <el-table-column prop="ctype" label="类型"></el-table-column>
    <!--    学分-->
    <el-table-column prop="ccredit" label="学分" ></el-table-column>
    <!--    操作-->
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button c_type="primary" plain size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button c_type="danger" plain size="small" @click="deleteItem(scope.row.cid)">删除</el-button>
          </template>
        </el-table-column>
  </el-table>
<!--  编辑修改信息弹窗 ，请传递课程信息在 handleEdit函数中传递 数据 和 提交地址 -->
  <EditData ref="EditData"  @update:table="this.load"   :visibleEdit="isOpenEidt" title_="课程" :listTitle="{
    cid:'课程编号',
    ccapacity:'课程容量',
    chours:'学时',
    cname:'名称',
    ctype:'类型',
    ccredit:'学分'
  }"></EditData>
</div>
</template>

<script>
import requestHelper from "@/utils/requestHelper";
import EditData from "@/components/Manage/Data/EditData.vue";
import myConst from "@/utils/myConst";

export default {
  components: {EditData},
  c_name: "CourseData",
  methods: {
    handleAvatarSuccess(){
      this.load();
      this.$message({type:"success" , message:"上传成功！"})
    },
    load(){
      console.log("load!!")
      requestHelper.get('/course/all').then(res=>{
        if(res.code == '200'){
          this.tableData = res.data;
          console.log("update!!")
        }
      })
    },
    handleEdit(row){
      this.isOpenEidt = true;
      this.$refs.EditData.openDialog(row,"/course/update"); //开启弹窗
    },
    //删除一条
    deleteItem(cid){ //根据id删除信息
      this.$confirm('确认删除该信息？', '确认删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
          .then(() => {
            requestHelper.post("/course/delete/one",{cid:cid}).then(res=>{
                this.$message({
                  type: 'info',
                  message: res.message
                });
                this.load();
            })
          })
          .catch(action => {
            if(action === 'cancel'){
              this.$message({
                type: 'info',
                message:'已取消'
              })
            }
          });
    }
  },
  data() {
    return {
      tableData: [],
      isOpenEidt:false, //是否显示编辑数据
      user : JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)) || {}, //获取token
    }
  },
  mounted() {
    this.load()
  }

}

</script>

<style scoped>

</style>