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

function transStuData(receivedData) {
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
    let stuName = ""
    for (let _stuName in receivedData) {
        stuName = _stuName
    }
    let studentCourses = receivedData[stuName]
    console.log(receivedData)

    studentCourses.forEach(course => {
        let courseName = ""
        for (let key in course) {
            courseName = key
        }
        let courseDetails = course[courseName]
        let timetable = courseDetails.timetable
        if (timetable) {
            timetable.forEach(i => {
                let weekly_schedule = i.weekly_schedule
                let start_time = weekly_schedule.start_time
                let end_time = weekly_schedule.end_time
                let weekdate_Chinese = transIdToWeekday(weekly_schedule.week_date) // 获取周几
                for (let index = start_time - 1; index < end_time; index++) {
                    let t =rowList[index]
                    t = courseName;
                }
            })
        }
    })

    return rowList
}

export default transStuData

// let receivedData = {
//     "student1": [{
//         "信息安全": {
//             "class_ID": 14,
//             "name": "信息安全014班",
//             "les_ID": 4,
//             "stu_IDs": [
//                 11,
//                 17,
//                 35,
//                 39,
//                 64,
//                 64
//             ],
//             "teacher_ID": 7,
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
//             "timetable": [],
//             "week_class_hour": 2
//         }
//     },
//         {
//             "Java程序设计II": {
//                 "class_ID": 34,
//                 "name": "Java程序设计II034班",
//                 "les_ID": 9,
//                 "stu_IDs": [
//                     9,
//                     14,
//                     15,
//                     31,
//                     42,
//                     42,
//                     50,
//                     51,
//                     69,
//                     70,
//                     73,
//                     75
//                 ],
//                 "teacher_ID": 17,
//                 "week_num": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5,
//                     6,
//                     7,
//                     8,
//                     9,
//                     10,
//                     11,
//                     12,
//                     13,
//                     14,
//                     15,
//                     16
//                 ],
//                 "timetable": [],
//                 "week_class_hour": 2
//             }
//         },
//         {
//             "计算机科学与技术": {
//                 "class_ID": 8,
//                 "name": "计算机科学与技术008班",
//                 "les_ID": 2,
//                 "stu_IDs": [
//                     10,
//                     17,
//                     25,
//                     27,
//                     28,
//                     30,
//                     39,
//                     48,
//                     51,
//                     64,
//                     70,
//                     77
//                 ],
//                 "teacher_ID": 4,
//                 "week_num": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5,
//                     6,
//                     7,
//                     8,
//                     9,
//                     10,
//                     11,
//                     12,
//                     13,
//                     14,
//                     15,
//                     16
//                 ],
//                 "timetable": [],
//                 "week_class_hour": 2
//             }
//         },
//         {
//             "C++程序设计II": {
//                 "class_ID": 27,
//                 "name": "C++程序设计II027班",
//                 "les_ID": 7,
//                 "stu_IDs": [
//                     2,
//                     12,
//                     31,
//                     33,
//                     57,
//                     64,
//                     67,
//                     74,
//                     79
//                 ],
//                 "teacher_ID": 14,
//                 "week_num": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5,
//                     6,
//                     7,
//                     8,
//                     9,
//                     10,
//                     11,
//                     12,
//                     13,
//                     14,
//                     15,
//                     16
//                 ],
//                 "timetable": [],
//                 "week_class_hour": 2
//             }
//         },
//         {
//             "计算机科学与技术": {
//                 "class_ID": 8,
//                 "name": "计算机科学与技术008班",
//                 "les_ID": 2,
//                 "stu_IDs": [
//                     10,
//                     17,
//                     25,
//                     27,
//                     28,
//                     30,
//                     39,
//                     48,
//                     51,
//                     64,
//                     70,
//                     77
//                 ],
//                 "teacher_ID": 4,
//                 "week_num": [
//                     1,
//                     2,
//                     3,
//                     4,
//                     5,
//                     6,
//                     7,
//                     8,
//                     9,
//                     10,
//                     11,
//                     12,
//                     13,
//                     14,
//                     15,
//                     16
//                 ],
//                 "timetable": [],
//                 "week_class_hour": 2
//             }
//         }
//     ]
// }

// let res = transStuData(receivedData)
// console.log("transAfter:",res)