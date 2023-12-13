<script>
import myConst from "@/utils/myConst";
import requestHelper from "@/utils/requestHelper";

export default {
  name: "ChangePass",
  data() {
    const validatePassword = (rule, value, callback) => {
          if(value ===''){
            callback(new Error('请确认密码'))
          }else if(value !== this.user.newPassword){
            callback(new Error('密码确认错误'))
          }else{
            callback();
          }
        };
    return {
      rules:{
        password: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        newPassword:[{
          required:true, message:'请输入新密码', trigger:'blur'
        }],
        confirmPassword:[{
          validator:validatePassword,required:true, message:'请确认新密码', trigger:'blur'
        }]
      },
      user:JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY) || '{}'),
    }
  },
  methods:{
    update(){
      this.$refs.formRef.validate((valid)=>{
        if(valid){
          //提交给后台
          requestHelper.put("/user/password",this.user).then( res => {
            if(res.code === '200')
            {
              this.$message.success("保存成功")
              this.user.password = this.user.newPassword
              //保存到本地
              localStorage.setItem(myConst.LOCAL_ITEM_KEY,JSON.stringify(this.user))
              this.$router.push(myConst.myroutes.LOGIN) //重新登陆
            }else{
              //保存失败
              this.$message.error(res.message)
            }

          })
        }
      })
    }
  }
}

</script>

<template>
  <div>
    <el-card style="width: 50%">
      <el-form ref="formRef" :model="user" :rules="rules" label-width="80px" style="padding-right: 20px">
        <el-form-item label="原始密码" prop="password">
          <el-input show-password v-model="user.password" placeholder="原始密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input show-password v-model="user.newPassword" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input show-password v-model="user.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" @click="update">确认修改</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>

</style>