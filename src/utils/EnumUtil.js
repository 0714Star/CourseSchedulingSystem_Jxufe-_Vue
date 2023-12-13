/**
 * 功能：这个脚本用于前端的数据枚举和后端的枚举类型进行一个统一
 * 作者：熊浩毅
 * 日期：2023/10/31 12:57
 */


//没写完!!!!!!!!!!
class EnumUtil{
    static TypeList = {
        AUTHORTIC:"AUTHORTIC",
        COLLEGE:"COLLEGE",
        JOB:"JOB"
    }
    static AUTHORTIC ={
        NORMAL_ADMIN:"普通管理员",
        TEACHER:"教师权限",
        STU:"学生权限",
        MAX:"最高权限"
    }

    static COLLEGE ={
        VR_COLLEGE:"VR学院",
        Art_COLLEGE:"艺术学院",
        Software_COLLEGE:"软件学院",
        InfoManage_COLLEGE:"信息管理学院",
        Account_COLLEGE:"会计学院",
        Finnance_COLLEGE:"金融学院",
        Traval_COLLEGE:"旅游学院",
        IC_COLLEGE:"工商学院",
        Sports_COLLEGE:"体育学院",
    }

    static JOB ={
        TEACHER:"教师",
        STU:"学生",
        ADMIN:"管理员"
    }

    /**
     * 枚举类型 值 -> 变量名
     * 例如：给了字符串管理员 , 我们需要将其转为ADMIN
     * @param TypeList 传递 EnumUtil.TypeList
     * @param str
     * @returns 返回的是该中文对应的英文
     */
    static getEnumName_En(TypeList , str){
        let list = EnumUtil[TypeList]
        var entries = Object.entries(list);
        for(let item of entries)
        {
            if(item[1]===str)
            {
                return item[0];
            }
        }
        return undefined
    }

    /**
     * 枚举类型 变量名 -> 值
     * 例如：给了字符串ADMIN , 我们需要将其转为管理员
     * @param TypeList 传递 EnumUtil.TypeList
     * @param str
     * @returns 返回的是该中文对应的英文
     */
    static getEnumName_Ch(TypeList , str){
        let list = EnumUtil[TypeList]
        return list[str]
    }

}

EnumUtil.AUTHORTIC.MAX.class
export default EnumUtil