<template>
  <div>

    <el-input v-model="phoneNumber" type="text"></el-input>
    <el-button size="small" type="primary" :disabled="sended" @click="sendCode">{{ buttonText }}</el-button>
  </div>
</template>

<script>


import requestHelper from "@/utils/requestHelper";

export default {
  name: "TeleValidCode",
  data() {
    return {
      phoneNumber: '',
      sended: false,
      buttonText: '获取验证码'
    }
  },
  methods: {
    sendCode() {
      // 发送验证码请求
      requestHelper.post('/api/send_code', { phone_number: this.phoneNumber })
          .then(response => {
            // 请求成功后将 sended 设为 true，按钮禁用，并显示倒计时
            this.sended = true;
            this.buttonText = '已发送';
            let countDown = 60;
            const timer = setInterval(() => {
              if (countDown > 0) {
                this.buttonText = `${countDown}s 后重试`;
              } else {
                this.sended = false;
                this.buttonText = '获取验证码';
                clearInterval(timer);
              }
              countDown--;
            }, 1000);
            console.log('验证码已发送');
          })
          .catch(error => {
            console.error(`发送验证码失败：${error.message}`);
          });
    }
  }
}
</script>