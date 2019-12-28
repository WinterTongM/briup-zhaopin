/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: YangHt
 * @Last Modified time: 2019-12-28 11:04:39
 */
<template>
  <div class="waiterList">
  
    <!-- 添加客服按钮功能 -->
    <div class="button1">
      <el-button  @click="toAdd" type="danger" size="mini">添加客服</el-button>
      <el-dialog title="添加客服" :visible.sync="dialogFormVisible">
        <el-form :model="CustomerService">
          
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="CustomerService.username" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="CustomerService.realname" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="CustomerService.status" autocomplete="off"></el-input>
          </el-form-item>


          <el-form-item label="性别" :label-width="formLabelWidth">
           <el-radio v-model="CustomerService.gender" label="男" >男</el-radio>
          <el-radio v-model="CustomerService.gender" label="女">女</el-radio>
        
          </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
         
          
          <el-button size="medium" type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>






      <el-button type="primary" size="mini" @click="warning1">导入客服</el-button>



      </div>




        <!-- 选择下拉框 -->
    
     <div class="searchDiv">
      <el-select 
      v-model="status"
      @change="stuatsChang"
      size="mini" 
      style="width:131px;" 
      clearable placeholder="状态">
    <el-option
      v-for="item in statusData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
  <el-select 
  v-model="gender" 
  @change="genderChang" 
  size="mini" 
  style="width:131px;" 
  clearable placeholder="性别">
    <el-option
      v-for="item in genderData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
 
  </el-select>



    </div>

  <div class="seleteDiv1">
    <el-select 
    size="mini" 
    style="width:100px;"
    v-model="value" 
    clearable placeholder="请选择" 
    @change="seleteChang" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">

    </el-option>
   
  </el-select>
   <el-input
      style="width:120px"
      size="mini"
      placeholder="请输入内容"
      v-model="input"
      clearable
      @change="inputChang"
    >
      
    </el-input>
 <el-button icon="el-icon-search" size='mini'  @click="seach" ></el-button>
  </div>



{{value}}
{{input}}
    <!-- 界面数据主体 -->
    <div  id="data">
       <el-table
    ref="multipleTable"
    :data=" CustomerServiceList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="SelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      >
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="realname"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
     > 
     <!-- show-overflow-tooltip -->
    </el-table-column>
     <el-table-column
      prop="status"
      label="状态"
      >
    </el-table-column> 
   <el-table-column
   
      label="分配工作"
      width="120">
      <template slot-scope="scope">
        <el-button
         @click="toEdit(scope.row)"
         type="text"
          size="small"
          
          >
          分配
        </el-button>
      </template>
    </el-table-column>


 






    
    <el-table-column
   
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
         @click="toDelete(scope.row)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align:right; margin-top:5px">{{CustomerServiceData.length}}
    <el-pagination :page-size="4"
     @current-change="CurrentChange1"
    :current-page.sync="currentPage"
    background
    layout="prev, pager, next"
    :total="CustomerServiceData.length">
</el-pagination  >
 </div>



   <!-- 分配分页 -->
 <!-- <div style="text-align:right; margin-top:5px">{{findAllEmpJobData.length}}
    <el-pagination :page-size="4"
     @current-change="CurrentChange1"
    :current-page.sync="currentPage"
    background
    layout="prev, pager, next"
    :total="findAllEmpJobData.length">
</el-pagination  >
 </div> -->





  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
    </div>
     
  <el-dialog title="收货地址" :visible.sync="scopeVisible">
   <el-table
    ref="multipleTable"
    :data="findAllEmpJobData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="SelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column

      prop='jobhunter.realname'
      label="求职人"
     >
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="jobhunter.telephone"
      label="联系方式"
     >
    </el-table-column>
    <el-table-column
      prop="employment.job"
      label="求职岗位"
      
      >
    </el-table-column>
    <el-table-column
      prop="employment.job"
      label="求职岗位"
      
      >
    </el-table-column>
    <el-table-column
      
      label="求职岗位"
      
      >无
    </el-table-column>
    <el-table-column
      prop="employment.publishTime"
      label="申请时间"
      
      >
    </el-table-column>

  </el-table>
</el-dialog>

  </div>
  
</template>

<script>
import { findAllCustomerService } from "@/api/service.js";
import {deleteCustomerServiceById,
        findCustomerServiceByUsername,
        findCustomerServiceByEducation,
        findBusinesByGender,
        saveOrUpdateCustomerService,
        findCustomerServiceById}  from "@/api/service.js"
import {findAllEmpJobWithJobhAndEmpl} from '@/api/jab.js'        
import config from '@/utils/config.js'
export default {
  data() {
    return {
      
       gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],






      // 默认页数
      currentPage:1,
      //状态
      status:"",
      // 性别
      gender:'',
      // 客服
      CustomerService:{},
        // 状态数组                
      statusData:[],
      // 性别数组
      genderData:[],
      // 客服数据数组
      CustomerServiceData:[],
      CustomerServiceID:[],
      // 模态框显示状态
     dialogFormVisible:false,

     scopeVisible:false,
    //  模态输入框宽度
      formLabelWidth:'120px',
     
      radio:"1",

      // 关键字搜索词
       options: [{
          value: 'username',
          label: '用户名'
        }, {
          value: 'id',
          label: 'ID'
        }, {
          value: 'gender',
          label: '性别'
        }, {
          value: 'status',
          label: '状态'
        }, 
        ],
        value: '',
        input:'',
        inputData:[],
        findAllEmpJob:'',
        findAllEmpJobData:[],

    };
  },



  computed: {
    // 客服分页列表
     CustomerServiceList(){
      let temp=[...this.CustomerServiceData];
      let pageSize = 4;
      let page =this.currentPage;
     
      return  temp.slice((page-1)*pageSize,pageSize*page);},
      // findAllEmpJobList(){
      //     let temp=[...this.findAllEmpJobData];
      //     let pageSize = 4;
      //     let page =this.currentPage;
     
      // return  temp.slice((page-1)*pageSize,pageSize*page);
      // }
      

  },
  methods: {
    warning1(){
           this.$confirm('该功能暂未开放', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
       
    },


  async  toEdit(row){
     let res = await findAllEmpJobWithJobhAndEmpl();
      this.findAllEmpJobData =res.data;
     this.scopeVisible=true;
   },

   async genderChang(val){

     this.status='';

      if(val){
        try{
         let res  = await findBusinesByGender({gender:val});
       this.CustomerServiceData=res.data;
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
         
        }); 
     
      }catch(err){
        config.errorMsg(this,"通过状态查找商家信息错误")

   }
      }else{
        this.findAllSer();
      }

      
     
    },




// 通过状态查找商家信息
  async  stuatsChang(val){
    this.gender='';
      if(val){
        try{
            let res = await findCustomerServiceByEducation({status:val});
            this.CustomerServiceData=res.data;
            console.log(res.data);
            this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
         
                }); 
        }catch(err){
             config.errorMsg(this,"通过状态查找商家信息错误")
        }
          
      }else{
        this.findAllSer();
      }

    
    },
    seleteChang(val){
          this.input='';  
          if(val===''){
              this.findAllSer();
          }

            },
inputChang(val){
  if(val===''){
    this.findAllSer();
  }
},
async seach(){
  let inp = this.input;
  if(this.value==='username'){
      
    
      let res =await findCustomerServiceByUsername({username:inp})
      console.log(res,'---------------')
    
      this.CustomerServiceData = res.data;

     
    
  }else if (this.value==='gender'){ 
    let res =await findBusinesByGender({gender:inp})
    this.CustomerServiceData = res.data;
    
  }else if (this.value==='id'){ 
                   
    let res =await findCustomerServiceById({id:inp})
    this.CustomerServiceData = [res.data];
    
  
  }else if (this.value==='status'){ 
    let res =await findCustomerServiceByEducation({status:inp})
    this.CustomerServiceData = res.data;
    
  
  }else{

        this.$confirm('请输入搜索内容！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })


  }
  },
    

// },


    // 添加客服操作
    toAdd(){
      this.dialogFormVisible = true;
      this.CustomerService={};
      this.findAllSer();
    },







    // 保存客服信息操作
  async  toSave(){
        try{
             let res =await saveOrUpdateCustomerService(this.CustomerService);
        this.dialogFormVisible = false;
        this.findAllSer();
        console.log(res);
         config.successMsg(this,"保存数据成功")
        }catch(err){
          console.log(err);
          config.errorMsg(this,'查找错误');
        }

       

    },





// 删除数据操作
   async  toDelete(row){
        let id =row.id;
        try{
           await deleteCustomerServiceById({id});
            this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
         
        }); 
        this.findAllSer();
        }catch(err){
           config.errorMsg(this,'查找错误');
        }
     },






    //  分页功能
 SelectionChange(val){
      
      //val就是选中的对象组成的数组
      console.log(val);
    },
   //  分页功能
     CurrentChange1(val){
      this.currentPage=val;

    },


// 查找所有求职信息
  




    // 查找所有客服信息
       async  findAllSer(){
        try {
          let res = await findAllCustomerService();
          this.CustomerServiceData = res.data;
         

           let idArr= res.data.map((item)=>{   //提取状态信息
            // console.log( item.status,"+++++++++");
            return item.id;})
            this.CustomerServiceID = idArr;


          // console.log(res.data,'-----------------');
          let statusArr = res.data.map((item)=>{   //提取状态信息
            // console.log( item.status,"+++++++++");
            return item.status;
          });
          this.statusData = [...new Set(statusArr)];  //Set集合去重，set中没有重复数据
          

          let genderArr = res.data.map((item)=>{
            // console.log( item.gender,"+++++++++");  //提取性别信息
            return item.gender;
          });
          this.genderData = [...new Set(genderArr)];  //Set集合去重，set中没有重复数据


        } catch (error) {
            config.errorMsg(this,'查找错误');
        }
    },




  },
  created() {
    this.findAllSer();
    
  },
  mounted() {}
};
</script>
<style scoped lang='scss'>
 .waiterList{
  
   position:absolute;
   width: 100%;
 }
  
    .button1{
      position:relative;
      top:-50px;
      right: 25px;
      float: right;
      
     }
  .seleteDiv1{
   position:relative;
   
   top:-30px;
  left:1050px;
  }

  
</style>