<template>
<div>
<!--  表单显示  -->
  <el-table :data="showTableData"  stripe>
<!--    <el-table-column type="selection"></el-table-column>-->
    <!--    课程班编号	 -->
    <el-table-column prop="class_ID" label="课程班编号" ></el-table-column>
    <!--    名称	-->
    <el-table-column prop="name" label="课程班名" ></el-table-column>
    <!--    课程编号	 -->
    <el-table-column prop="les_ID" label="课程编号" ></el-table-column>
    <!--    学时	-->
    <el-table-column prop="week_class_hour" label="学时" ></el-table-column>
    <el-table-column filter-placement=""></el-table-column>
    <!--    操作-->
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button c_type="primary" plain size="small" @click="showCourseStudents(scope.row)">查看课程学生</el-button>
          </template>
        </el-table-column>
  </el-table>

<!--  分页器   -->
  <page-helper ref="pageHelper" :tableData_="showTableData"  @update:tableItem="updateshowList"></page-helper>


  <el-dialog
      title="课程学生列表"
      :visible.sync = "isDialogVisiable"
      >

<!--    <el-card style="width: 100%;height: 300px">-->
<!--展示学生列表  一级 -> 学生列表信息-->
      <el-table :data = "courseStudentLists">
<!--        姓名-->
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="default_class_ID" label="行政班" ></el-table-column>
        <el-table-column prop="stu_number" label="学号" ></el-table-column>
        <el-table-column prop="major" label="专业" ></el-table-column>
        <el-table-column label="查看课表" >
          <template  v-slot="scope">
            <el-button plain size="medium" type="primary" @click="showStudentCourseTable(scope.row)">查看课表</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--    </el-card>-->

<!--    二级选中的学生课表  -->
    <el-dialog
    width="50%"
    :visible.sync = "isDialogStuCourseVisiable"
    append-to-body>
    <template>
      <course-table :courseData = "dialogStuCourseData"></course-table>
    </template>
    </el-dialog>
  </el-dialog>
</div>
</template>

<script>
import requestHelper from "@/utils/requestHelper";
import PageHelper from "@/components/Manage/UtilsComponent/PageHelper.vue";
import CourseTable from "@/components/Manage/Data/CourseTable.vue";
import transStu from "@/utils/CourseTableTrans/transStu";

export default {
  components: {CourseTable, PageHelper},
  name: "CourseData",
  methods: {
    /**
     * 从数据库获取所有信息
     */
    load(){
      requestHelper.get('/class/all').then(res=>{
        if(res.code == '200'){
          let data =res.data

          this.tableData = data.map(courseClass =>{
            let mapKeys = Object.keys(courseClass)
            const tempArray ={}
            mapKeys.forEach(key=>{
              let value = courseClass[key]
              tempArray[key] = (value)
            })
            return tempArray
          })
          this.$refs.pageHelper.tableData_ = this.tableData
          this.$refs.pageHelper.load()

          console.log("TableDATA:",this.tableData)
        }
      })
    },
    // 查看课程学生 TODO
    showCourseStudents(row){
      console.log(row,"row")
      this.isDialogVisiable = true
      //根据 课程表 id 查找学生列表
      requestHelper.post("/student/getArrayStuData",{
        stuIds:row.stu_IDs
      }).then(res=>{
        console.log(res.data)
        // 展示学生列表
        let stuItems = res.data
        this.courseStudentLists = stuItems
      })
      // 返回前端改课程的学生信息
    },
    /**
     *  根据学生id查看课表
     */
    showStudentCourseTable(row){
        requestHelper.get("/student/get_classes_by_id?id="+row.stu_ID).then(res=>{
          console.log(res.data)
          this.isDialogStuCourseVisiable = true
          this.dialogStuCourseData = transStu(res.data)
        })
    },
    /**
     * 更新当前的showlist  分页
     */
    updateshowList(showTableData){
      console.log("showTableData",showTableData)
        this.showTableData = showTableData
    }
  },
  data() {
    return {
      tableData: [],
      showTableData:[],
      courseStudentLists:[],// 学生列表
      // isShowCourse:false, //是否显示编辑数据
      isDialogVisiable:false, //是否显示弹出框
      isDialogStuCourseVisiable : false,//学生课表弹出
      dialogStuCourseData :[], //学生课表信息
    }
  },
  mounted() {
    this.load()
  }

}

</script>

<style scoped>

</style>