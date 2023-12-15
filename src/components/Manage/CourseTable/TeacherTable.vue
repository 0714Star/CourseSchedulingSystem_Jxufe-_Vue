<script>
import requestHelper from "@/utils/requestHelper";
import transTeaData from "@/utils/CourseTableTrans/transTea";
import CourseTable from "@/components/Manage/Data/CourseTable.vue";

export default {
  name: "TeacherTable",
  components: {CourseTable},
  data(){
    return{
      courseData:[],
      teachers: [], // 教师列表 name id
      curItem:{}, // 当前选中的查询的目标
      state: '',
  }},
  computed:{

  },
  methods: {
    /**
     * 搜索教师信息
     */
    search_T_courseTable(teacherId){
      requestHelper.get("/teacher/get_by_id?id="+teacherId).then(res=>{
        this.courseData = transTeaData(res.data)
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
      var teachers = this.teachers;
      var results = queryString ? teachers.filter(this.createFilter(queryString)) : teachers;
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
        requestHelper.get("/teacher/allTeacherName").then(res=>{
          const resData = res.data.map(teacherObj => {
            const key = Object.keys(teacherObj)[0];
            const value = Object.values(teacherObj)[0];

            return {
              "value": value,
              "curId": key,
            };
          });
          this.teachers = resData;
        });


    }
,
    handleSelect(item) {
      this.curItem = item
      this.search_T_courseTable(item.curId)
    },
    handleIconClick(ev) {
      console.log(ev,"查询教师课表并展示");
      // 查询教师课表并展示
      this.search_T_courseTable(this.curItem.curId)
    },

  },
  mounted() {

      this.loadAll();
    console.log("B")
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
        placeholder="请输入要查询到教师名称"
        @keydown.enter.native = "handleIconClick"
        @select="handleSelect">
      <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}( id: {{item.curId}})</div>
      </template>
    </el-autocomplete>

    <!--  课表展示  -->

    <CourseTable :course-data="courseData"></CourseTable>

  </div>

</template>

<style scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>