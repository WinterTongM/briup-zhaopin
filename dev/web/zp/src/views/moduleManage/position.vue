/*
 * @Author: wenxt 
 * 职位管理页面
 * @Date: 2019-12-29 08:40:04 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-29 12:23:47
 */
<template>
  <!-- 职位管理页面 -->
  <div id="moduleCity">
    <div class="addBut">
      <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addJobTypeBtn">添加职位类型</el-button>
    </div>
    <div class="cardDiv" v-for="(item,index) in jobTypeList" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          {{item.name}}
        </div>
        <div class="jobDataList" v-for="(jobitem,jobindex) in item.job" :key="jobindex">
          <span>{{jobitem.name}}</span>
        </div>
        <div class="jobDataList addButDiv" v-if="item.butStatu">
          <el-button type="text" @click="addjob(item)">添加</el-button>
        </div>
        <div class="jobDataList inputDiv" v-else>
          <input v-model="jobName" type="text" >
          <button @click="jobDataAdd(item)">添加</button>
        </div>
      </el-card>
    </div>
    <div class="footerDiv">
      <div class="pageDiv">
        <el-pagination :current-page.sync = "currentPage" :page-sizes = "pageSize"
          background @current-change= "pageChange"
          layout="prev, pager, next"
          :total="JobTypeData.length">
        </el-pagination>
      </div>
    </div>
    <div class="waitDiv" v-if="waiting">
      <h1>{{reminder}}</h1>
    </div>
    <el-dialog title="职位类型添加" :visible.sync="addJobVisible" width="30%">
      <el-form>
        <el-form-item label="职位类型:" :label-width="formLabelWidth">
          <el-input v-model="jobTypeName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addJobVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJobType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findAllJobType,saveOrUpdateJobType} from '@/api/jobType.js';//导入
import {findAllJob,saveOrUpdateJob} from '@/api/job.js';//导入
import config from '@/utils/config.js';

export default {
  data() {
    return {
      //职位类型数据
      JobTypeData:[],
      JobData:[],
      jobName:'请输入职位名称',
      jobTypeName:'',
      //当前页码
      currentPage:1,
      //每页条数
      pageSize:config.pageSize,
      addJobVisible:false,
      reminder:'Please wait a moment',
      waiting:true,
    };
  },
  computed: {
    jobTypeList(){
      let temp = [...this.JobTypeData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice(pageSize*(page-1),pageSize*page);
    }
  },
  methods: {
    //获取职位信息
    async findJobData(){
      try {
        let res = await findAllJob();
        this.JobData = res.data;
        } catch (error) {
          console.log(error);
        }
    },
    //获取职位类型信息
    async findJobTypeData(){
      try {
        let res = await findAllJobType();
        // this.JobTypeData = res.data;
        let temp = [...res.data];
        //在职位类型中添加职位
        try {
          let res = await findAllJob();
          this.JobData = res.data;
          console.log(res.data);
          //获取职位类型对应的职位数组
          temp.forEach(item=>{
            let jTypeId = item.id;
            let jobDataArr = this.JobData.filter(it=>{
              return it.jobTypeId ===jTypeId;
            })
            item.butStatu = 'true';
            item.job = jobDataArr;
          })
        } catch (error) {
          config.errorMsg(this,'查找错误');
          console.log(error);
        }
        // 超时调用
        setTimeout(() => {
          this.JobTypeData = temp;
          this.waiting = false;
          // console.log(this.JobTypeData);
        },2000);
      } catch (error) {
        config.errorMsg(this,'职位类型信息获取失败');
      }
    },
    addjob(val){
      val.butStatu = false;
    },
    async jobDataAdd(val){
      //根据职位类型id进行城市添加
      let jobTypeId = val.id;
      console.log(jobTypeId);
      let jobName = this.jobName;
      console.log(jobName);
      let status = val.name;
      console.log(status);
      try {
        let res = await saveOrUpdateJob({jobTypeId:jobTypeId,name:jobName,status:status});
        this.findJobTypeData();
        val.butStatu = true;
        config.successMsg(this,'职位添加成功');
        this.jobName = '请输入职位名称';
      } catch (error) {
        config.errorMsg(this,'职位添加失败');
        console.log(error);
      }
    },
    pageChange(page){
      this.currentPage = page;
    },
    addJobTypeBtn(){
      this.addJobVisible = true;
    },
    async addJobType(){
      let name = this.jobTypeName;
      try {
        let res = await saveOrUpdateJobType({name:name});
        config.successMsg(this,'职位类型添加成功');
        this.addJobVisible = false;
        this.findJobTypeData();
      } catch (error) {
        config.errorMsg(this,'职位类型添加失败');
        console.log(error);
      }
    },
  },
  //钩子函数
  created() {
    this.findJobTypeData();
  },
  mounted() {}
};
</script>
<style scoped>
.waitDiv{
  text-align: center;
}
.jobDataList{
  display: inline;
  margin-right: 10px;
}
.addBut{
  float: right;
  margin-bottom: 10px;
}
.cardDiv{
  clear: both;
  margin-bottom: 20px;
}
.pageDiv{
      float: right;
}
</style>