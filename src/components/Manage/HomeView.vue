<script>
import myConst from "@/utils/myConst";

export default {
  name: "homeView",
  data() {
    return{
      user: JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY))||{},
    }
  }
}
</script>

<template>
    <div>
      你好,{{this.user.username}}!欢迎来到我的登陆系统!!
    </div>
</template>

<style scoped>

</style>