/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: wangzai
 * @Last Modified time: 2019-12-28 11:35:25
 */
<template>

  <div id="jobList"> 
 

    <div id="button1">
      <el-button size="mini" type="primary">待联系</el-button>
      <!-- <el-button  size="mini" type="success">稍后联系</el-button> -->
      <!-- <el-button  size="mini" type="warning">已联系</el-button> -->
    </div> 

   <el-table
    :data="findAllEmploymentJobhunterWithJobhAndEmplData"
    border
    >
    <el-table-column
      fixed
      prop="jobhunter.realname"
      label="求职人"
     >
    </el-table-column>
    <el-table-column
      prop="jobhunter.telephone"
      label="联系电话"
      >
    </el-table-column>     <el-table-column
      prop="employment.job"
      label="求职岗位"
       width="100"
     >
    </el-table-column>
    <el-table-column
      prop="employment.publishTime"
      label="申请时间"
       width="500"
     >
    </el-table-column>
    
    <el-table-column
      fixed="right"
      label="简历"
      width="100">
      <template slot-scope="scope">
        <!-- 弹出框的启动按钮 -->
        <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>  
      
      </template>


    </el-table-column>
  </el-table>





 <!-- 查看的弹出框 -->


<el-dialog class="dialog" title="收货地址" :visible.sync="dialogTableVisible">
   
        <div><p>姓名，（手机认证）</p></div> 
        <div><p>个人信息</p></div>
        <div><p>性别：</p><p>最高学历：</p></div>
        <div><p>出生年月</p><p>工作经验：</p> </div>
    
</el-dialog>






   </div>

</template>

<script>
  import {findAllEmploymentJobhunterWithJobhAndEmpl  }  from "@/api/job.js"
export default {
  data() {
    return {
      EmploymentJobhunter:'',
      findAllEmploymentJobhunterWithJobhAndEmplData:[],
      EmploymentJobhunterusername:[],
      // 弹出框的触发变量，默认为false
      dialogTableVisible:false,
       gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],

    };
  },
  computed: {},
  methods: {
   
  async  findAllJob(){
        let res =await findAllEmploymentJobhunterWithJobhAndEmpl();
        this.findAllEmploymentJobhunterWithJobhAndEmplData=res.data;
     
        


    },

 toSee(row){

    this.dialogTableVisible=true;
      // alert("查看");
    },
  },
  created() {
    this.findAllJob();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
#jobList{
  width: 100%;
}
/* #button1{
  float: right;
  margin-top: -50px;
} */
.dialog{
  div{
    p{
      display: inline;
      margin-right: 50px;
    }
  }
}
</style>