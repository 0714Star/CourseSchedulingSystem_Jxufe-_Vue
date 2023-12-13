<template>
  <div style="height: 100vh; display: flex; align-items: center;justify-content: center;background-color: #ef6691">
    <div style="display: flex; background-color: white;width: 50%;border-radius: 5px;overflow: hidden;" >
      <!--      左侧图片-->
      <div style="flex: 1">
        <img src="@/assets/register.png" alt="熊浩毅"  style="width: 100%; height:70vh;">
      </div>
      <!--      右侧登录-->
      <div style="flex: 1; display: flex; align-items: center;justify-content: center" >
        <!--        绑定user对象的属性-->
        <el-form :model="user" style="width: 80%" :rules = "rules" ref="registerRef" >
          <div style="font-size: 20px;font-weight: bold;text-align: center; margin-bottom: 20px">注册账户</div>
          <!--账户名-->
          <el-form-item prop="username">
            <el-input  prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名" v-model="user.username" style="width: 100%"></el-input>
          </el-form-item>
          <!--账号密码-->
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码" v-model="user.password" style="width: 100%"></el-input>
          </el-form-item>
          <!--验证码 code绑定验证码属性-->
          <el-form-item prop="confirmPassword">
            <div style="display: flex">
              <el-input placeholder="请再次输入密码" prefix-icon="el-icon-lock" show-password style="flex: 1" v-model="user.confirmPassword"></el-input>
            </div>
          </el-form-item>
          <!--电话号码-->
          <el-form-item prop="phoneNumber">
<!-- 本来想用电话验证码的但是需要钱就没写前后端了<TeleValidCode></TeleValidCode>-->
            <el-input v-model="user.phoneNumber" placeholder="电话"></el-input>
          </el-form-item>

          <!-- 注册按钮 -->
          <el-form-item>
            <el-button type="info" style="width: 100%"  @click="register"> 注 册 </el-button>
          </el-form-item>
          <!--返回登陆界面-->
          <div style="display: flex">
            <div style="flex: 1">
              <span style="color: #6e77f2;cursor:pointer" @click="toLogin">返回登陆</span>
            </div>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import requestHelper from "@/utils/requestHelper"
import myConst from "@/utils/myConst";
export default {
  name :"registerView",
  data(){
    //密码二次校验
    const validConfirmPassword =(rule,confirmPass,callback)=>{
      if(confirmPass === ''){
        callback(new Error('请确认密码'));
      }else if(confirmPass !== this.user.password){ //验证码大小写不区分
        callback(new Error('两次密码不一致'));
      }else{
        callback();
      }
    }
    /**
     * 电话格式校验器
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
    return{
      code:"", //验证码组件的code
      user:{
        username:"",//账号
        password:"",//密码
        confirmPassword:"",//二次确认密码
        phoneNumber :"",
      },
      rules:{
        username:[
          {required:true,message:"请输入账号",trigger:"blur"}
        ],
        password:[
          {required:true,message:"请输入密码",trigger:"blur"}
        ],
        confirmPassword:[
            //validator 验证器 , validConfirmPassword验证方法
          { validator:validConfirmPassword , message:"请确认密码",trigger:'blur'} //blur默认失焦执行 ， change为改变时 ， input为输入时
        ],
        phoneNumber:[
          {required:true,message:"请输入电话",trigger:"blur"},
          {validator :telephoneValide,trigger:["change","blur"]}]
      },
    }
  },
  methods:{
    toLogin(){
      this.$router.push(myConst.myroutes.LOGIN)//返回到login界面s
    }
    ,
    register(){
      this.$refs['registerRef'].validate((valid)=>{
        if(valid){
          //axios请求
          requestHelper.post('/user/register',{
            "username":this.user.username,
            "password":this.user.password,
            "phoneNumber":this.user.phoneNumber
          }).then(res=>{
            console.log(res)
            if(res.code === '200'){
              this.$message({message:res.message + "2s后跳转至登陆界面",type: 'success'});
              setTimeout(()=>{
                this.$router.push(myConst.myroutes.LOGIN)//到login界面
                 },2000)
            }else{
              console.log("loginERROR:"+res);
              //this.$message().error("错误信息"); // 弹出msg信息  res.data.msg
              this.$message({message: res.message,type: 'error'})
            }
          })
        }

      })
    }
  },
  mounted() {
    console.log(this.$router)
  }
}
</script>

<style scoped>

</style>