import axios from 'axios'
import myConst from "@/utils/myConst";
import router from "@/router";

// 创建可一个新的axios对象
const requestHelper = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,   // 后端的接口地址  ip:port
    timeout: 30000 //超时时间 ，30s内后端未返回，报错
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
requestHelper.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; //application/x-www-form-urlencoded application/json;charset=utf-8
    let user = localStorage.getItem(myConst.LOCAL_ITEM_KEY) ? JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)) : {}
    config.headers['token'] = user.token  // 设置请求头 ,将获取的token数据放到请求头中携带，后端会解析请求头总是否带有token ， 进行拦截等操作

    return config
}, error => { //拒绝的回调
    console.error('request error: ' + error) // for debug
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
requestHelper.interceptors.response.use(
    response => {
        let res = response.data;
        // int -> string
        try {
            res.code = res.code.toString()
        }catch (eror){
            console.error("此类型不是字符串BY XHY : ",eror)
        }
        // 强行插入一个message
        res.message = res.msg

        console.log("res.code:"+res.code)
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        if(res.code =='401'){ // 权限不足，跳转到登陆界面
            alert("res.code-:"+res.code)
            localStorage.removeItem(myConst.LOCAL_ITEM_KEY)
           router.push(myConst.myroutes.LOGIN)
        }else if(res.code =='404'){
            router.push(myConst.myroutes.noFound)
        }else if(res.code =='500'){
            alert(res.message)
        }
        return res;
    },
    error => {
        console.error('response error: ' + error) // for debug
        return Promise.reject(error)
    }
)


export default requestHelper