<template>
  <div>
  <el-table  :data="tablePageShowData"  stripe>
    <!--    课程编号	 -->
    <el-table-column prop="stu_ID" label="学生编号" ></el-table-column>
    <!--    学号-->
    <el-table-column prop="stu_number" label="学号" ></el-table-column>
    <!--    名称	-->
    <el-table-column prop="name" label="姓名" ></el-table-column>
    <!--    教学班	-->
    <el-table-column prop="default_class_ID" label="行政班"></el-table-column>
    <!--    专业	-->
    <el-table-column prop="major" label="专业"></el-table-column>
    <!--    操作-->
<!--    <el-table-column label="操作">-->
<!--      <template v-slot="scope">-->
<!--        <el-button c_type="primary" plain size="small" @click="getDetails(scope.row)">编辑</el-button>-->
<!--      </template>-->
<!--    </el-table-column>-->
  </el-table>

  <!--  分页器  -->
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>

<!--    查看课表  -->
    <CourseTable :course-data="selectStuCourseData" width="100px" v-if="showCourseTable"></CourseTable>
  </div>
</template>

<script>
import requestHelper from "@/utils/requestHelper";
import CourseTable from "@/components/Manage/Data/CourseTable.vue";

export default {
  name:"StuData",
  components: {CourseTable},
  data() {
    return {
      // 页面相关的
      tableData: [],// 所有Ittem
      currentPage:1, // 当前页面 id
      pageSizes:[10,20,30,50],// 可选的显示个数 []
      pageSize:10,//每页显示的个数
      tablePageShowData:[], // 根据页面展示的部分item
      showCourseTable:false,//是否显示学生课表
      selectStuCourseData : [] , // 选中的学生信息
    }
  },
computed:{
  /**
   * item个数
   * @returns {number}
   */
  total(){
    return this.tableData.length || 0
  }
},
  methods: {
  /**
   * 加载信息
   */
  load(){
    requestHelper.get("/student/selectAll").then(res=>{
      console.log(res.data)
      if(res.code == "200"){
        this.tableData = res.data
        this.handleCurrentChange(1)
        console.log(res.data)
      }
    })
  },
    /**
     * 获取用户详细信息
     * @param row
     */
    getDetails(row){
      // 弹出弹窗
      this.showCourseTable = true
      // 根据学生id 获取所有信息
      requestHelper.get("/student/get_classes_by_name?name="+row.name,).then(res=>{
        console.log("学生的id:", row.name,res)
        alert("获取到了信息，记得TODO一下弹窗！")
        // 列出学生所有课程和课表 TODO
      })
    },
    /**
     * 每页大小改变的回调
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log(this.currentPage)
      let leftIndex = (this.currentPage-1) * val
      let rightIndex = this.currentPage *val
      this.tablePageShowData = this.tableData.slice(leftIndex , rightIndex)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let leftIndex = (val-1) * this.pageSize
      let rightIndex = val *this.pageSize
      this.tablePageShowData = this.tableData.slice(leftIndex,rightIndex)
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>

</style>