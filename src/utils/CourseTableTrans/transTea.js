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

function transTeaData(receivedData) {
    if(receivedData === null){
        console.warn("转换函数接收的data为null")
        return
    }
    const resData = {}
    resData["rows"] = [
        //        0             1               2            3          4             5        6     7
        //{ "num": "课节", "mon": "周一", "tur": "周二", "wes": "周三", "thur": "周四", "fri": "周五", "sat": "周六", "sun": "周日" },
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
    let clazzes = receivedData["classes"]
    clazzes.forEach(_clazz => {
        let timetable = _clazz.timetable
        let courseName = _clazz.name
        timetable.forEach(i => {

            let roomId = i.room_ID
            let scheduleItem = i.weekly_schedule
            let weekdata = scheduleItem.week_date
            // 设置起始 和结束
            let weekdate_Chinese = transIdToWeekday(weekdata)
            // 设置 节次
            for (let index = scheduleItem.start_time-1; index < scheduleItem.end_time; index++) {
                let curIndex = rowList[index]
                curIndex[weekdate_Chinese]= courseName
                // rowList[index][weekdate_Chinese] = courseName
            }
        })
    })
    return rowList
}
export default transTeaData

// let resData = transTeaData({
//     "teacher": {
//         "teacher_ID": 1,
//         "name": "teacher1",
//         "class_IDs": [
//             1,
//             2
//         ],
//         "preference": {
//             "no_class_time": [{
//                 "week_date": 4,
//                 "start_time": 3,
//                 "end_time": 5
//             },
//                 {
//                     "week_date": 4,
//                     "start_time": 10,
//                     "end_time": 11
//                 }
//             ]
//         }
//     },
//     "classes": [{
//         "class_ID": 1,
//         "name": "软件工程001班",
//         "les_ID": 1,
//         "stu_IDs": [
//             5,
//             8,
//             19,
//             21,
//             31,
//             32,
//             46,
//             49,
//             50,
//             50,
//             56,
//             59,
//             62,
//             63,
//             72
//         ],
//         "teacher_ID": 1,
//         "week_num": [
//             1,
//             2,
//             3,
//             4,
//             5,
//             6,
//             7,
//             8,
//             9,
//             10,
//             11,
//             12,
//             13,
//             14,
//             15,
//             16
//         ],
//         "timetable": [{
//             "room_ID": 1,
//             "weekly_schedule": {
//                 "week_date": 4,
//                 "start_time": 1,
//                 "end_time": 2
//             }
//         }],
//         "week_class_hour": 2
//     },
//         {
//             "class_ID": 2,
//             "name": "软件工程002班",
//             "les_ID": 1,
//             "stu_IDs": [
//                 6,
//                 7,
//                 13,
//                 15,
//                 29,
//                 38,
//                 43,
//                 54,
//                 57,
//                 62,
//                 68,
//                 76
//             ],
//             "teacher_ID": 1,
//             "week_num": [
//                 1,
//                 2,
//                 3,
//                 4,
//                 5,
//                 6,
//                 7,
//                 8,
//                 9,
//                 10,
//                 11,
//                 12,
//                 13,
//                 14,
//                 15,
//                 16
//             ],
//             "timetable": [{
//                 "room_ID": 2,
//                 "weekly_schedule": {
//                     "week_date": 1,
//                     "start_time": 3,
//                     "end_time": 4
//                 }
//             }],
//             "week_class_hour": 2
//         }
//     ]
// })
//
// console.log(resData)