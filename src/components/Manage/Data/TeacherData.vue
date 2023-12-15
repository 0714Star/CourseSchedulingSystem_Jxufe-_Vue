<script>
import requestHelper from "@/utils/requestHelper";
import EditData from "@/components/Manage/Data/EditData.vue";
import myConst from "@/utils/myConst";
export default {
  name: "TeacherData",
  components: {EditData},
  methods: {
    /**
     * 页面的数据加载
     */
    load(){
      requestHelper.get('/teacher/selectAll').then(res=>{
        if(res.code === '200'){
          this.tableData = res.data;
          this.handleCurrentChange(1)
        }
      })
    },
    /**
     * 打开编辑界面
     * @param row
     */
    handleEdit(row){
      this.isOpenEidt = true;
      this.$refs.EditData.openDialog(row,"/course/update"); //开启弹窗
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
  data() {
    return {
      tableData: [],// 所有Ittem
      isOpenEidt:false, //是否显示编辑数据
      user : JSON.parse(localStorage.getItem(myConst.LOCAL_ITEM_KEY)) || {}, //获取token
      // 页面相关的
      currentPage:1, // 当前页面 id
      pageSizes:[10,20,30,50],// 可选的显示个数 []
      pageSize:10,//每页显示的个数
      tablePageShowData:[], // 根据页面展示的部分item
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
  mounted() {
    this.load()
  }
}

</script>

<template>
  <div>
    <!--  表单显示  -->
    <el-table :data="tablePageShowData"  stripe>
<!--      <el-table-column type="selection"></el-table-column>-->
      <!--    教师编号	 -->
      <el-table-column prop="teacher_ID" label="教师编号" ></el-table-column>
      <!--    名称	-->
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <!--    查看课表信息  -->
<!--      <el-table-column label="信息">-->
<!--        <template v-slot="scope">-->
<!--          <el-button c_type="primary" plain size="small" @click="handleEdit(scope.row)" style="display: flex;text-align: center">查看</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <!--  编辑修改信息弹窗 ，请传递课程信息在 handleEdit函数中传递 数据 和 提交地址 -->
    <EditData ref="EditData"  @update:table="this.load"   :visibleEdit="isOpenEidt" title_="课程" :listTitle="{
    cid:'课程编号',
    ccapacity:'课程容量',
    chours:'学时',
    cname:'名称',
    ctype:'类型',
    ccredit:'学分'
  }"></EditData>
<!--  分页器  -->
    <div>
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
    </div>
  </div>
</template>

<style scoped>

</style>