/*
 * @Author: Wuwangzai 
 * @Date: 2019-12-28 15:12:59 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-30 01:01:49
 */

<template>
  <div id="jobList"> 
    <!-- {{findAllEmploymentJobhunterWithJobhAndEmplData}} -->
    <div class="topDiv">
      <div class="searchDiv">
      <el-select @change="employmentChange" size="mini" v-model="employment" clearable placeholder="全部" style="width:131px;">
        <el-option
          v-for="item in employmentName"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div id="button1" style='margin-bottom:10px'>
      <el-button size="mini" type="primary">待联系</el-button>
    </div> 
    </div>
    

   <el-table
    :data="CustomerServiceList"
    border
    
    >
     
    <el-table-column
      fixed
      prop="jobhunter.realname"
      label="求职人">
    </el-table-column>

    <el-table-column
      prop="jobhunter.telephone"
      label="联系电话"
      width="200">
    </el-table-column>     
    
    <el-table-column
      prop="employment.job"
      label="求职岗位" >
    </el-table-column>

  <el-table-column
      fixed="right"
      label="简历"
     >
      <template slot-scope="scope">
        <!-- 弹出框的启动按钮 -->
        <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>  
      </template>

    </el-table-column>

    <el-table-column
      prop="employment.publishTime"
      label="申请时间"
       width="500"
     >
    </el-table-column>
    
    
     
  </el-table>
<div style="text-align:right; margin-top:5px">
    <el-pagination :page-size="10"
     @current-change="CurrentChange1"
    :current-page.sync="currentPage"
    background
    layout="prev, pager, next"
    :total="findAllEmploymentJobhunterWithJobhAndEmplData.length">
</el-pagination  >
 </div>




 <!-- 查看的弹出框 -->


<el-dialog class="dialog" title="简历详情"  :visible.sync="dialogTableVisible" >
    <div v-if="currentjob.jobhunter">
      <div style="border-bottom:solid #0080FF 1px;">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" > <h2>{{currentjob.jobhunter.realname}}</h2> 
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
        <div style="color:#0080FF"> <h3><i class="el-icon-mobile-phone" >手机验证</i></h3> </div>
        </div></el-col>
    
      </el-row></div>
      <br><br>
      <div style="margin-top:-15px"> 
      <el-button size="mini" type="primary">个人信息</el-button></div>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <h3>性别：{{currentjob.jobhunter.gender}}</h3> 
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <h3>最高学历：{{currentjob.jobhunter.education}}</h3> 
            
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple">
           <h3>出生年月: {{currentjob.jobhunter.birth}}</h3> 
           
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <h3>工作经验： {{currentjob.jobhunter.workTime}}</h3> 
           
          </div>
        </el-col>
      </el-row>
    </div>
   
       
    
</el-dialog>



   </div>

</template>

<script>
  import {findAllEmploymentJobhunterWithJobhAndEmpl}  from "@/api/employmentJobhunter.js"
export default {
  data() {
    return {
      EmploymentJobhunter:'',
      findAllEmploymentJobhunterWithJobhAndEmplData:[],
      emplData:[],
      EmploymentJobhunterusername:[],
      // 弹出框的触发变量，默认为false
      dialogTableVisible:false,
      currentjob:{},
      currentPage:1,
      employment:'',
      employmentName:[],
      
    };
  },
  computed: {  
    
    CustomerServiceList(){
      let temp=[...this.findAllEmploymentJobhunterWithJobhAndEmplData];
      let pageSize = 10;
      let page =this.currentPage;
     
      return  temp.slice((page-1)*pageSize,pageSize*page);},
      
      },
  methods: {
    employmentChange(val){
      // console.log(val);
      this.currentPage = 1;
      if(val){
        let result = this.emplData.filter(item=>{
          return item.employment.job === val;
        });
        this.findAllEmploymentJobhunterWithJobhAndEmplData = result;
      }else{
        this.findAllJob();
      }
    },
    CurrentChange1(val){
      this.currentPage=val;

    },
    //时间处理
    timeData(){
      this.findAllEmploymentJobhunterWithJobhAndEmplData.forEach(item=>{
        item.employment.publishTime=item.employment.publishTime.slice(0,10)
      })
    },
  async  findAllJob(){
        let res =await findAllEmploymentJobhunterWithJobhAndEmpl();   
        this.emplData = res.data;  
        this.findAllEmploymentJobhunterWithJobhAndEmplData=res.data;
        this.timeData();
        let jobNameArr = res.data.map(item=>{
          // console.log(item.employment.job);
          return item.employment.job;
        })
        this.employmentName = [... new Set(jobNameArr)];
    },

    toSee(row){
      this.currentjob={...row}
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
.topDiv{
  div{
    display: inline-block;
  }
  #button1{
      float: right;
      // margin-left: 100px;
    }
  
}


#jobList{
  width: 100%;
}

.dialog{
  div{
    p{
      display: inline;
      margin-right: 50px;
      
    }
  }
}

</style>