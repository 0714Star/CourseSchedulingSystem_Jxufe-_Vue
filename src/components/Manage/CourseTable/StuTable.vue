<script>

import requestHelper from "@/utils/requestHelper";
import transStu from "@/utils/CourseTableTrans/transStu";
import CourseTable from "@/components/Manage/Data/CourseTable.vue";

export default {
  name: "StuTable",
  components: {CourseTable},
  data(){
    return{
      students:[],
      courseData:[],
      curItem:{}, // 当前选中的查询的目标
      state: '',
    }
  },
  methods:{
    /**
     * 获取学生信息
     * @param {string} stuName
     */
    search_S_courseTable(stuId){
      requestHelper.get("/student/get_classes_by_id?id="+stuId).then(res=>{
        console.log("stuId : ",res.data)
        this.courseData = transStu(res.data)
      })
    },
    /**
     * 建议函数
     * 根据输出的值给出建议
     * @param queryString
     * @param cb
     */
    querySearch(queryString, cb) {
      console.log(queryString,cb)
      var students = this.students;
      var results = queryString ? students.filter(this.createFilter(queryString)) : students;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    /**
     * 字符过滤器
     * @param queryString
     * @returns {function(*): boolean}
     */
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    /**
     * 加载搜索框中的数据
     */
    loadAll() {
      requestHelper.get("/student/getAllStuName").then(res=>{
        this.students = res.data.map(stuObj=>{
          const key =  Object.keys(stuObj)[0]
          const value = Object.values(stuObj)[0]
          return {
            "value":value,
            "curId":key
          }
        })
      })
      // return [
      //   { "value": "student1", "curId": "1" },
      //   { "value": "student2", "curId": "2" },
      //   { "value": "student3", "curId": "3" },
      //   { "value": "student4", "curId": "4" },
      //   { "value": "student5", "curId": "5" },
      // ];
    },
    handleSelect(item) {
      this.curItem = item
      this.search_S_courseTable(item.curId)
    },
    handleIconClick(ev) {
      console.log(ev,"查询教师课表并展示");
      // 查询教师课表并展示
      this.search_S_courseTable(this.curTeacherId)
    },
  },
  mounted() {
    this.loadAll()
  }
}
</script>

<template>
  <div>
    <!--     检索框  -->
    <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入要查询到学生名称"
        @keydown.enter.native = "handleIconClick"
        @select="handleSelect">
      <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}( id: {{item.curId}})</div>
        <!--        <span class="addr">{{ item.curId }}</span>-->
      </template>
    </el-autocomplete>
<!--    课表    -->
    <CourseTable :courseData="courseData"></CourseTable>
  </div>
</template>

<style scoped>

</style>