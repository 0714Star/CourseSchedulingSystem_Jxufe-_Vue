
<template>
  <div>
    <el-container>
      <!--    侧边栏  -->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #001529">
        <div style="height: 60px; color: white; display: flex; align-items: center; justify-content: center">
          <img :src="user.avatar || defaultHead" alt="" style="width: 40px; height: 40px;border-radius: 50%">
          <span class="logo-title" v-show="!isCollapse">{{user.authortic}}</span>
        </div>

        <el-menu :collapse="isCollapse" :collapse-transition="false" router background-color="#001529" text-color="rgba(255, 255, 255, 0.65)" active-text-color="#fff" style="border: none" :default-active="$route.path">
            <!-- 首页界面 index 会路由到指定位置并设置高亮-->
          <el-menu-item index="/home">
            <i class="el-icon-house"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <!-- 智能排课设置-->
          <el-menu-item index="/sortCourse">
            <i class="el-icon-house"></i>
            <span slot="title">智能排课</span>
          </el-menu-item>
          <!-- 课程设置-->
          <el-menu-item index="/courseSetting">
            <i class="el-icon-house"></i>
            <span slot="title">课程设置</span>
          </el-menu-item>

<!--          课表查看-->
          <el-submenu index="/Table" >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>课表查看</span>
            </template>
            <el-menu-item  index="/teacherTable" >教师课表</el-menu-item>
            <el-menu-item  index="/classTable">班级课表</el-menu-item>
<!--            index="/" -->
            <el-menu-item index="/stuTable">学生课表</el-menu-item>
          </el-submenu>

<!--          基本信息上传  权限设置 ADMIN 管理员才可以显示-->
          <el-submenu v-if="user.job == 'ADMIN' " index="/Data">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>基本信息</span>
            </template>
            <el-menu-item  index="/teacherData" >教师信息</el-menu-item>
            <el-menu-item  index="/courseData">课程信息</el-menu-item>
            <el-menu-item index="/stuData">学生信息</el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>

      <el-container>
        <!--        头部区域-->
        <el-header>

          <i :class="collapseIcon" style="font-size: 26px" @click="handleCollapse"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1; width: 0; display: flex; align-items: center; justify-content: flex-end">
            <i class="el-icon-quanping" style="font-size: 26px" @click="handleFull"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex; align-items: center; cursor: default;">
                <img :src="user.avatar ||defaultHead" alt="" style="width: 40px; height: 40px; margin: 0 5px;border-radius: 50%">
                <span>{{user.username}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toPersonCenter">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="toChangePass">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>

        <!--        主体区域-->
        <el-main>

          <router-view @update:user="updateUser" />

        </el-main>

      </el-container>


    </el-container>
  </div>
</template>

<script>

import myConst from "@/utils/myConst";
import EnumUtil from "@/utils/EnumUtil";
import router from "@/router";

export default {
  name: 'ManageView',
  data() {
    return {
      defaultHead:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      isCollapse: false,  // 不收缩
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
      user:{},
    }
  },
  methods: {
    updateUser(user){
      //这里传递的是引用,但是我不需要引用传递，因此需要深拷贝
      this.user = JSON.parse(JSON.stringify(user))
      this.refeshDataShow();
    },
    refeshDataShow(){
      var strData = localStorage.getItem(myConst.LOCAL_ITEM_KEY)
      var data = JSON.parse(strData);
      this.user = data;
      this.user.authortic = EnumUtil.AUTHORTIC[data.authortic] //!!!!注意转换xhy
    },
    handleFull() {
      document.documentElement.requestFullscreen()
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.asideWidth = this.isCollapse ? '64px' : '200px'
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    logOut(){ //退出登陆
      localStorage.removeItem(myConst.LOCAL_ITEM_KEY) ;//移除token等信息
      this.$router.push(myConst.myroutes.LOGIN)//到达登陆界面
      this.$message.success('退出成功')
    },
    toPersonCenter(){
      router.push(myConst.myroutes.person)
    },
    toChangePass(){ //路由到修改密码界面
      router.push(myConst.myroutes.changePass)
    }
  },
  activated() {
    this.refeshDataShow()
  }
}
</script>

<style>
.el-menu--inline {
  background-color: #000c17 !important;
}
.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
  padding-left: 49px !important;
}
.el-menu-item:hover, .el-submenu__title:hover {
  color: #fff !important;
}
.el-submenu__title:hover i {
  color: #fff !important;
}
.el-menu-item:hover i {
  color: #fff !important;
}
.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px !important;
  width: calc(100% - 8px);
  margin-left: 4px;
}
.el-menu-item.is-active i, .el-menu-item.is-active .el-tooltip{
  margin-left: -4px;
}
.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
}
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
.el-submenu .el-menu-item {
  min-width: 0 !important;
}
.el-menu--inline .el-menu-item.is-active {
  padding-left: 45px !important;
}
/*.el-submenu__icon-arrow {*/
/*  margin-top: -5px;*/
/*}*/

.el-aside {
  transition: width .3s;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
}
.logo-title {
  margin-left: 5px;
  font-size: 20px;
  transition: all .3s;   /* 0.3s */
}
.el-header {
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  display: flex;
  align-items: center;
}
</style>