<script>
import requestHelper from "@/utils/requestHelper";
import transClassroomData from "@/utils/CourseTableTrans/transClassroom";
import CourseTable from "@/components/Manage/Data/CourseTable.vue";

export default {
  name: "ClassTable",
  components: {CourseTable},
  data(){
    return{
      courseData:[],
      classrooms: [], // 教室列表 value: name curid : id
      selectItem :{}, // 当前选中的对象
      state: '',
    }},
  computed:{

  },
  methods: {
    /**
     * 搜索教室信息 , 根据教室Name
     */
    search_T_courseTable(classroomName){
      requestHelper.get("/classroom/get_by_name?name="+classroomName).then(res=>{
            console.log(res.data)
            this.courseData = transClassroomData(res.data)
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
      var classrooms = this.classrooms;
      var results = queryString ? classrooms.filter(this.createFilter(queryString)) : classrooms;
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
     * 加载搜索框中的数据  教室名称
     */
    loadAll() {
      requestHelper.get("/classroom/allClassroomName").then(res=>{
        this.classrooms = res.data.map(ClassObj =>{
          const key = Object.keys(ClassObj)[0]
          const value = Object.values(ClassObj)[0]
          return {
            "value":value,
            "curId":key
          }
        })
      })
      // return [
      //   { "value": "W205", "curId": "1" },
      //   { "value": "W211", "curId": "2" },
      // ];
    },
    handleSelect(item) {
      console.log(item)
      this.selectItem = item
      this.search_T_courseTable(item.value)
    },
    handleIconClick(ev) {
      console.log(ev,"查询班级课表并展示");
      // 查询教室的课表并展示
      this.search_T_courseTable(this.selectItem.value)
    },

  },
  mounted() {
    this.loadAll();
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
        placeholder="请输入要查询到班级名称"
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

      <CourseTable :course-data="courseData"></CourseTable>


  </div>
</template>

<style scoped>

</style>