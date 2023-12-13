<template>
  <div>
    <el-card style="width: 50% ;  margin: 1px 0">
      <el-form :model = "user" label-width="80px" style="padding-right: 20px" :rules="rules" ref="personFormRef">

<!--        头像上传    -->
        <div>
          <el-upload
              class="avatar-uploader"
              :action="this.$baseUrl+'/file/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers="{token:user.token}"
              style="text-align: center"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
<!--        用户名不可更改     -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="用户名" disabled></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="工号" prop="jobNumber">
          <el-input v-model="user.jobNumber" placeholder="工号"></el-input>
        </el-form-item>

        <el-form-item label="权限" prop="authortic">
          <el-input v-model="authortic" placeholder="权限" disabled></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phoneNumber" >
          <el-input v-model="user.phoneNumber" placeholder="电话"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="身份" prop="job">
          <el-input v-model="job" placeholder="身份" disabled></el-input>
        </el-form-item>

        <el-form-item label="学院" prop="college">
          <el-select v-model="optionCollege" placeholder="请选择学院">
            <el-option
                v-for="item in options"
                :key="item"
                :label="item.toLowerCase()"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>


          <div style="text-align: center; margin-bottom: 20px;">
          <el-button type="primary" @click="update">保存</el-button>
          </div>

      </el-form>

    </el-card>
  </div>
</template>

<script>
import myConst from "@/utils/myConst";
import requestHelper from "@/utils/requestHelper";
import EnumUtil from "@/utils/EnumUtil";

export default {
  name: "PersonView",
  data(){
    /**
     * 电话校验器
     */
    const telephoneValide = (rule,telephoneNumber,callback)=>{
      if(!telephoneNumber){
        callback(new Error("电话不能为空"));
      }else{
        //非空
        var nums = telephoneNumber.split('');
        var len = nums.length;

        if(len<10||len>14){
          callback(new Error("电话应为11~13位"))
        }
        for (let index = 0 ; index <len ;index++){
          let num = nums[index]
          if(isNaN(+num)){
            callback(new Error("电话应为数字"));
          }
        }
        callback();//正常执行
      }
    }
    const emailvalid = (rule,value,callback)=>{
      if(!value){
        //callback(new Error("邮箱不能为空"));
        callback();
      }else{
        //非空
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w+/;
        if(emailRegex.test(value)){
          callback();//正常执行
        }else{
          callback(new Error("邮箱格式错误"))
        }

      }
    }

    return{
      user: JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)) || {}, //获取本地user信息
      options:EnumUtil.COLLEGE, // 提前写好的枚举类
      optionCollege:null,
      authortic:null,
      job:null,
      rules:{
        "phoneNumber":[
            {required:true,message:"请输入电话",trigger:"blur"},
            {validator :telephoneValide,trigger:["change","blur"]}],
        "email":[
          {required:false,message:"请输入邮箱",trigger:"blur"},
          {validator:emailvalid,trigger:["change","blur"]}
        ]
  },
    }
  },
  beforeCreate() {
    this.user= JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)) || {}
  },
  mounted(){
    //字符转换
    this.optionCollege = EnumUtil.getEnumName_Ch(EnumUtil.TypeList.COLLEGE,this.user.college);
    this.authortic = EnumUtil.AUTHORTIC[this.user.authortic]
    this.job = EnumUtil.JOB[this.user.job]
    console.log(this.user)
  },
  methods:{
    /**
     * 提交更新个人信息
     */
    update(){
      this.$refs.personFormRef.validate((valid)=>{
        if(valid){
          this.user.college =EnumUtil.getEnumName_En(EnumUtil.TypeList.COLLEGE,this.optionCollege);//转换到后端英文

          //更新服务端 用户信息
          requestHelper.put('/user/update',this.user).then(res=>{
            if(res.code==="200"){
              this.$message({type:"success",message:"上传成功"})
              //刷新本地 信息
              localStorage.setItem(myConst.LOCAL_ITEM_KEY,JSON.stringify(this.user));
              //派发更新事件
              this.$emit("update:user",this.user)
            }else {
              this.$message({type:"error",message:res.message})
            }
          })
        }
      })
    },
    handleAvatarSuccess(response,file,fileList){
      if(response.code === "200")
      {
        this.user.avatar = response.data;
      }
    }
  }
}

</script>

<style scoped>
/deep/ .el-form-item__label{
  font-weight: bold;
}
/deep/ .el-form-item__content {
  border-radius: 50%;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border-radius: 50%;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
</style>