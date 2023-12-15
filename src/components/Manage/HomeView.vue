<script>
import myConst from "@/utils/myConst";
import ClockTimer from "@/components/Clock_Timer.vue";

export default {
  name: "homeView",
  // components: {ClockTimer},
  data() {
    return{
      user: JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY))||{},
    }
  }
}
</script>

<template>
    <div>
      <el-card>
<!--       <el-card style="width: 40%"> <ClockTimer></ClockTimer></el-card>-->
      你好,{{this.user.username}}!欢迎来到我的登陆系统!!
        <el-divider></el-divider>
        <div>
          <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
          <el-divider></el-divider>
          <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
        </div>
        <div>
          <span>雨纷纷</span>
          <el-divider direction="vertical"></el-divider>
          <span>旧故里</span>
          <el-divider direction="vertical"></el-divider>
          <span>草木深</span>
        </div>
      </el-card>
    </div>
</template>

<style scoped>

</style>