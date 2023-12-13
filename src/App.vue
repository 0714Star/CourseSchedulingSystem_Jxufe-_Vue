<template>

 <div class="app">
<!--   登陆界面   -->
<keep-alive>
  <router-view></router-view>
</keep-alive>

 </div>

</template>

<script>

  export default {
    name :'app',
    components:{

    },
    data(){
      return{
        isLogin:false,//登陆状态
        sessionId:"", //存储sessionid
      }},
    mounted() {
      console.log(this.$router)
    }
  }
</script>

<style>

</style>
