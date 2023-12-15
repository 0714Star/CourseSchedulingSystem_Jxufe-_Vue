/**
 * @param {string} id  后端给的id 代表周次
 * @return {string}    前端给的id 代表星期几
 */
function transIdToWeekday(id) {
    switch (id) {
        case 1:
            return "mon";
        case 2:
            return "tur";
        case 3:
            return "wes";
        case 4:
            return "thur";
        case 5:
            return "fri";
        case 6:
            return "sat";
        case 7:
            return "sun";
    }
}

function transClassroomData(receivedData) {
    if(receivedData === null){
        console.warn("转换函数接收的data为null")
        return
    }
    const resData = {}
    resData["rows"] = [
        //        0             1               2            3          4             5        6     7
        // { "num": "课节", "mon": "周一", "tur": "周二", "wes": "周三", "thur": "周四", "fri": "周五", "sat": "周六", "sun": "周日" },
        { "num": "第一节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第二节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第三节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第四节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第五节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第六节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第七节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第八节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第九节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第十节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第十一节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" },
        { "num": "第十二节", "mon": "", "tur": "", "wes": "", "thur": "", "fri": "", "sat": "", "sun": "" }
    ]
    let rowList = resData["rows"] //
    let clazzroom = receivedData[0]
    let aimClazzroom = clazzroom
    console.log(aimClazzroom)
    if (aimClazzroom) {
        let timetable = aimClazzroom.timetable
        console.log(timetable)
        timetable.forEach(_i => {
            console.log(_i)
            let scheduleItem = _i.schedule
            let week_date = scheduleItem.week_date
            let start_time = scheduleItem.start_time
            let end_time = scheduleItem.end_time
            let lesson_name = _i.lesson_name
            let weekdate_Chinese = transIdToWeekday(week_date) // 获取周几
            for (let index = start_time-1; index < end_time; index++) {
                let item =  rowList[index]
                if(!item){
                    console.log("item is nill")
                    return
                }
                item[weekdate_Chinese] = lesson_name;
                console.log("lessonName: ",lesson_name)
            }
        })
    }

    return rowList
}
export default transClassroomData

//后端给的 response.data
// let resData = transClassroomData([
//     //courseClass
//     {
//         "classroom_ID": 2,
//         "name": "W211",
//         "timetable": [{
//             "schedule": {
//                 "week_date": 1,
//                 "start_time": 1,
//                 "end_time": 2
//             },
//             "lesson_name": "C++程序设计I"
//         },
//             {
//                 "schedule": {
//                     "week_date": 1,
//                     "start_time": 3,
//                     "end_time": 4
//                 },
//                 "lesson_name": "软件工程"
//             },
//             {
//                 "schedule": {
//                     "week_date": 1,
//                     "start_time": 8,
//                     "end_time": 9
//                 },
//                 "lesson_name": "软件工程"
//             },
//             {
//                 "schedule": {
//                     "week_date": 1,
//                     "start_time": 6,
//                     "end_time": 7
//                 },
//                 "lesson_name": "Python语言与数据分析"
//             },
//             {
//                 "schedule": {
//                     "week_date": 1,
//                     "start_time": 10,
//                     "end_time": 11
//                 },
//                 "lesson_name": "Python语言与数据分析"
//             },
//             {
//                 "schedule": {
//                     "week_date": 2,
//                     "start_time": 1,
//                     "end_time": 2
//                 },
//                 "lesson_name": "Java程序设计II"
//             },
//             {
//                 "schedule": {
//                     "week_date": 2,
//                     "start_time": 3,
//                     "end_time": 4
//                 },
//                 "lesson_name": "Python语言与数据分析"
//             },
//             {
//                 "schedule": {
//                     "week_date": 2,
//                     "start_time": 6,
//                     "end_time": 7
//                 },
//                 "lesson_name": "网络工程"
//             },
//             {
//                 "schedule": {
//                     "week_date": 2,
//                     "start_time": 8,
//                     "end_time": 9
//                 },
//                 "lesson_name": "信息安全"
//             },
//             {
//                 "schedule": {
//                     "week_date": 2,
//                     "start_time": 10,
//                     "end_time": 11
//                 },
//                 "lesson_name": "网络工程"
//             },
//             {
//                 "schedule": {
//                     "week_date": 3,
//                     "start_time": 1,
//                     "end_time": 2
//                 },
//                 "lesson_name": "Java程序设计II"
//             },
//             {
//                 "schedule": {
//                     "week_date": 3,
//                     "start_time": 3,
//                     "end_time": 4
//                 },
//                 "lesson_name": "Java程序设计I"
//             },
//             {
//                 "schedule": {
//                     "week_date": 3,
//                     "start_time": 6,
//                     "end_time": 7
//                 },
//                 "lesson_name": "信息安全"
//             },
//             {
//                 "schedule": {
//                     "week_date": 3,
//                     "start_time": 8,
//                     "end_time": 9
//                 },
//                 "lesson_name": "计算机科学与技术"
//             },
//             {
//                 "schedule": {
//                     "week_date": 3,
//                     "start_time": 10,
//                     "end_time": 11
//                 },
//                 "lesson_name": "C++程序设计II"
//             },
//             {
//                 "schedule": {
//                     "week_date": 4,
//                     "start_time": 3,
//                     "end_time": 4
//                 },
//                 "lesson_name": "计算机科学与技术"
//             },
//             {
//                 "schedule": {
//                     "week_date": 4,
//                     "start_time": 6,
//                     "end_time": 7
//                 },
//                 "lesson_name": "C++程序设计II"
//             },
//             {
//                 "schedule": {
//                     "week_date": 4,
//                     "start_time": 1,
//                     "end_time": 2
//                 },
//                 "lesson_name": "物联网工程"
//             },
//             {
//                 "schedule": {
//                     "week_date": 4,
//                     "start_time": 8,
//                     "end_time": 9
//                 },
//                 "lesson_name": "Python语言与数据分析"
//             },
//             {
//                 "schedule": {
//                     "week_date": 4,
//                     "start_time": 10,
//                     "end_time": 11
//                 },
//                 "lesson_name": "C++程序设计I"
//             }
//         ]
//     }
// ])

// console.log(resData)