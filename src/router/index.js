import Vue from 'vue'
import VueRouter from 'vue-router'
import myConst from "@/utils/myConst";

Vue.use(VueRouter)

const routes = [
    {
        path: "/noFound",
        name:"nofound",
        meta:{
            isAuth: true,
            title: "404找不到资源"
        },
        component:()=>import('../views/NoFoundView.vue')
    },
    { //登陆
        mode:'history',
        path: '/login',
        name: 'login',
        meta:{
            isAuth: true,//是否授权 授权则无需验证 , 其余都需要开启验证
        },
        component: ()=>import('../views/LoginView.vue'),
        children:[
            {
                path:"forgetPass",
                name:"forgetPass",
                meta:{
                    title:"忘记密码"
                },
                component:()=>import('../components/forgetPass.vue')
            }
        ]
    },
    { //注册
        mode:'history',
        path:'/register',
        name:'Register',
        meta:{
            isAuth: true, //是否授权
            title:"注册界面"
        },
        component: ()=>import('../views/RegisterView.vue'),
    }
        ,{
        mode:'history', //管理界面
        path:'/',
        name:'manage',
        meta:{
            title:"排课系统"
        },
        component: ()=>import('../views/ManageView.vue'),
        redirect:'/home', //重定向到home界面
        children: [
            {
                path:"person",
                name:"person",
                meta:{
                    title:"个人信息"
                },
                component: ()=> import("../components/Manage/PersonView.vue")
            },
            {
                path:"changePass",
                name:"changePass",
                meta:{
                    title:"修改密码"
                },
                component:()=>import("../components/Manage/ChangePass.vue")
            }
            ,
            {
                path:"home",
                name:"home",
                meta:{
                    title:"主页"
                },
                component: ()=> import("../components/Manage/HomeView.vue")
            },
            {   //智能排课
                path:"sortCourse",
                name:"sortCourse",
                meta:{
                    title:"智能排课"
                },
                component:()=>import("../components/Manage/SortCourse.vue")
            },
            {   //课程设置
                path:"courseSetting",
                name:"courseSetting",
                meta:{
                    title:"课程设置"
                },
                component:()=>import("../components/Manage/CourseSetting.vue")
            },
            {   //教师表
                path:"teacherTable",
                name:"teachaerTable",
                meta:{
                    title:"教师表"
                },
                component:()=>import("../components/Manage/TeacherTable.vue")
            },
            {   //学生表
                path:"stuTable",
                name:"stuTable",
                meta:{
                    title:"学生表"
                },
                component:()=>import("../components/Manage/StuTable.vue")
            },
            {   //班级表
                path:"classTable",
                name:"classTable",
                meta:{
                    title:"班级表"
                },
                component:()=>import("../components/Manage/ClassTable.vue")
            },
            {   //课程信息
                path:"courseData",
                name:"courseData",
                meta:{
                    title:"课程信息"
                },
                component:()=>import("../components/Manage/Data/CourseData.vue")
            },
            {   //教师信息
                path:"teacherData",
                name:"teacherData",
                meta:{
                    title:"教师信息"
                },
                component:()=>import("../components/Manage/Data/TeacherData.vue")
            },
            {   //学生信息
                path:"stuData",
                name:"stuData",
                meta:{
                    title:"学生信息"
                },
                component:()=>import("../components/Manage/Data/StuData.vue")
            },
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//前置路由守卫
router.beforeEach( (to,from,next)=>{

    console.log( to ,from,!to.meta.isAuth)
    if(!to.meta.isAuth){ //需要验证
       var localData =  localStorage.getItem(myConst.LOCAL_ITEM_KEY)?JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)):{}

        var token = localData.token
        if(token==null)
        {
            alert("请登录后重试")
            router.push(myConst.myroutes.LOGIN) //到登陆界面
            return
        }
    }
    next();
})

//后置路由守卫
router.afterEach((to, from) => {
    //console.log(to,from,"后置执行")
    from.meta;
    document.title = to.meta.title || '小淮的登陆系统'
})

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router