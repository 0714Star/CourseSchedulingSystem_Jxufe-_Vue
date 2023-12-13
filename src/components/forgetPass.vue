
<template>
  <div>
    <el-form :model="forgetUserForm" label-width="80px" style="padding-right: 20px" onclose="close">
      <el-form-item label="用户名">
        <el-input v-model="forgetUserForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="forgetUserForm.phoneNumber" autocomplete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
<!--      <el-button @click="findPassVisible = false">取 消</el-button>-->
      <el-button type="primary" @click="resetPassword">确 定</el-button>
    </div>
  </div>
</template>

<script>
import requestHelper from "@/utils/requestHelper";

export default {
  name: "forgetPass",
  data() {
    return {
      forgetUserForm: {},   // 忘记密码的表单数据
      forgetPassDialogVis: false,
    }
  },

  created() {

  },
  methods: {
    handleForgetPass() {   //  初始化表单的数据
      this.forgetUserForm = {}
    },
    resetPassword() {
      this.forgetUserForm.newPassword = "123456"
      requestHelper.put('/user/resetPass', this.forgetUserForm).then(res => {
        if (res.code === '200') {
          this.$message.success('重置成功')
          this.showNewPassword()
          this.forgetPassDialogVis = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    close() {
      this.forgetPassDialogVis = false
    },
    showNewPassword(){
      this.$alert(
        '123456',
        '重置后的密码为',
        {
          confirmButtonText: '确定',
          callback: action => {
            this.close()
          }
        }
     );
    }
  },

}
</script>

<style scoped>
/deep/.el-form-item__label {
  font-weight: bold;
}
</style>