<script>
/**
 * 分页组件
 */
export default {
  name: "PageHelper",
  props:{
    /**
     * 可选的显示个数 []
     */
    pageSizes_:{
      type:[],
      require:false
    },
    /**
     * 每页显示的个数
     */
    pageSize_:{
      type:Number,
      require:false
    },
    /**
     * 页面item个数切换的回调
     */
    handleSizeChange_:{
      type:Function,
      require:false
    },
    /**
     * 页号切换的回调
     */
    handleCurrentChange_:{
      type:Function,
      require:false
    },
    /**
     * item信息[]
     * 必选
     */
    // tableData_:{
    //   type :[],
    //   require :true,
    // }
  },
  data(){
    return{
      pageSizes:[10,20,30],// 可选的显示个数 []
      pageSize:10,//每页显示的个数

      currentPage:1,
      tableData_:[],
      tableData:[],
      tablePageShowData:[],
    }
  },
  computed:{
    /**
     * item总数
     * @returns {number}
     */
    total(){
      return this.tableData.length
    }
  },
  methods:{
    /**
     * 进行内部拷贝数据
     */
    load(){
      this.tableData = JSON.parse(JSON.stringify(this.tableData_)) //深拷贝！
      this.handleSizeChange(1);
      this.handleCurrentChange(1);
    },
    /**
     * 更新数据
     */
  updateNewData() {
    this.pageSizes  = (this.pageSizes_? this.pageSizes_:this.pageSizes_)
    this.pageSize = (this.pageSize_?this.pageSizes_:this.pageSize_)
    this.handleSizeChange = (this.handleSizeChange_? this.handleCurrentChange_ : this.handleSizeChange)
    this.handleCurrentChange = (this.handleCurrentChange_? this.handleSizeChange_ : this.handleCurrentChange )
    // 必给项
    this.tableData = this.tableData_
    console.log(this.tableData_)
  },
    /**
     * 每页item个数改变的回调
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // let this.total / val
      console.log(this.currentPage)
      let leftIndex = (this.currentPage-1) * val
      let rightIndex = this.currentPage *val
      this.tablePageShowData = this.tableData.slice(leftIndex , rightIndex)
      // 如果
      this.$emit("update:tableItem",this.tablePageShowData)
    },
    /**
     * 页号切换回调
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let leftIndex = (val-1) * this.pageSize
      let rightIndex = val *this.pageSize
      this.tablePageShowData = this.tableData.slice(leftIndex,rightIndex)
      this.$emit("update:tableItem",this.tablePageShowData)
    }
  }
}
</script>

<template>
<div>
  <slot name="tablePage"></slot>
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
</template>

<style scoped>

</style>