<template>
  <div style="height: 100vh; display: flex; align-items: center;justify-content: center;background: #4de0ba;">
    <div style="display: flex; background-color: white;width: 50%;border-radius: 5px;overflow: hidden; ">
      <!--      左侧图片-->
      <div style="flex: 1">
        <img src="@/assets/login.png" alt="" style="width: 100%; height:70vh;">
      </div>
      <div style="background-image: url('@/assets/register.png')"></div>
      <!--      右侧登录-->
      <div style="flex: 1; display: flex; align-items: center;justify-content: center">
        <!--        绑定user对象的属性-->
        <el-form :model="user" style="width: 80%" :rules="rules" ref="loginRef" @keydown.native.enter="login">
          <div style="font-size: 20px;font-weight: bold;text-align: center; margin-bottom: 20px">欢迎登陆选课系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" size="medium" placeholder="请输入用户名" v-model="user.username"
              style="width: 100%"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" size="medium" show-password placeholder="请输入密码" v-model="user.password"
              style="width: 100%"></el-input>
          </el-form-item>
          <!--验证码 code绑定验证码属性-->
          <el-form-item prop="code">
            <div style="display: flex">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-circle-check" style="flex: 1"
                v-model="user.code"></el-input>
              <div style="flex: 1">
                <valid-code @emitCode="getCode" />
              </div>
            </div>
          </el-form-item>

          <!-- 登陆按钮 -->
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login"> 登 陆 </el-button>
          </el-form-item>
          <!--注册账号-->
          <div style="display: flex">
            <div style="flex: 1">
              <span style="color: #0f9876;cursor:pointer" @click="$router.push(myConst.myroutes.register)">注册账号</span>
            </div>
            <div style="flex:1; text-align: right">
              <span style="color: #0f9876; cursor: pointer;" @click="findPassVisible = true">忘记密码</span>
            </div>
          </div>
        </el-form>
      </div>
    </div>
      <!--忘记密码-->
    <el-dialog title="重置密码" :visible.sync="findPassVisible" width="40%" >
      <forget-pass></forget-pass>
    </el-dialog>
  </div>

</template>

<script>
//导入ValidCode验证码库
import ValidCode from "@/components/ValidCode.vue";
//import axios from "axios";
import requestHelper from "@/utils/requestHelper"
import myConst from "@/utils/myConst";
import ForgetPass from "@/components/forgetPass.vue";

export default {
  name: "loginView",
  computed: {
    myConst() {
      return myConst
    }
  },
  components: {
    ForgetPass,
    ValidCode
  },
  data() {
    //验证码校验执行函数
    const validCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value.toLowerCase() !== this.code) { //验证码大小写不区分
        callback(new Error('验证码错误'));
      } else {
        callback();
      }
    }
    return {
      findPassVisible:false, //忘记密码的dialog默认关闭
      code: "", //验证码组件的code
      user: {
        code: "", //input的code
        username: "",//账号
        password: "",//密码
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        code: [
          { validator: validCode, trigger: 'blur' } //blur默认失焦执行 ， change为改变时 ， input为输入时
        ]
      },

    }
  },
  methods: {
    getCode(code) {
      this.code = code.toLowerCase();
    },
    login() {
      this.$refs['loginRef'].validate((valid) => {
        if (valid) { /////////!!!!!!!!!!!!!!!!!!!!!!xhy
          //axios请求
          var formdata = new FormData()
          formdata.append("username",this.user.username)
          formdata.append("password",this.user.password)
          requestHelper.post('/user/login', {
                username : this.user.username,
                password : this.user.password
              },{
                "Content-Type":"application/x-www-form-urlencoded"
              }
              ).then(res => {
            console.log("res信息：", res)
            if (res.code ==="200") {
              console.log("router", this.$router)
              localStorage.setItem(myConst.LOCAL_ITEM_KEY, JSON.stringify(res.data)); // 存储到本地的信息
              this.$router.push(myConst.myroutes.home)//路由到个人中心界面
              this.$message({ message: res.message, type: 'success' });
            } else {

              console.log("loginERROR:" + res.data);
              this.$message({ message: res.message || res.msg, type: 'error' })
            }
          })
        }
      })
    },
    findPassword() { //找回密码

    }
  },
  mounted() {
    console.log(this.$router)
  }
}
</script>

<style scoped></style>