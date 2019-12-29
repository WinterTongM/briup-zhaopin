/*
 * @Author: liuyr 
 * 招聘审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: LeiHaha
 * @Last Modified time: 2019-12-29 15:46:32
 */
<template>
  <div id="doingData">
    <div class="searchDiv">
      <el-select @change="jobChange" size="mini" v-model="job" clearable placeholder="职位类型">
        <el-option
          v-for="item in jobData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <div class="seleteDiv">
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
        @change="inputChang">
      </el-input>
      <el-button icon="el-icon-search" size='mini'  @click="seach" ></el-button>
      </div>
    </div>

    <div class="tebleDiv">
      <el-table ref="multipleTable" :data="doingList" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="title" label="招聘标题"></el-table-column>
        <el-table-column align="center" prop="contactName" label="发布人"></el-table-column>
        <el-table-column align="center" prop="contactPhone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="job" label="职位"></el-table-column>
        <el-table-column align="center" prop="city" label="城市"></el-table-column>
        <el-table-column align="center" prop="publishTime" label="发布时间"></el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status === '审核通过'">
              <div>{{scope.row.status}}</div>
            </div>
            <div v-if="scope.row.status === '拒绝'">
              <div>{{scope.row.status}}</div>
            </div>
            <div v-if="scope.row.status === '招聘中'">
              <div>{{scope.row.status}}</div>
            </div>
            <div v-if="scope.row.status === '招聘完成'">
              <div>{{scope.row.status}}</div>
            </div>
            <div v-if = "scope.row.status === '待审核'">
              <el-button type="success" size="mini" @click="toEdit(scope.row)" >通过</el-button>
              <el-button type="danger " size="mini" @click="toDelete(scope.row)">拒绝</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchStatus" size="mini" type="success" round>一键通过</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination :page-size = "pageSize" :current-page.sync = "currentPage"
          @current-change = "pageChange"
          background
          layout= "prev, pager, next"
          :total="doingData.length">
        </el-pagination>
      </div>
    </div>
    <!-- 查看 -->
    <el-dialog
      :title="currentBus.title"
      :visible.sync="seeVisible">
      <div class="seeDiv">
        {{currentBus.job}}
      </div>
      <div class="seeDiv">
        {{currentBus.scale}}
      </div>
      <div class="seeDiv">
        <span>发布时间:</span>
        {{currentBus.publishTime}}
      </div>
      <div class="seeDiv">
        <span>薪资:</span>
        {{currentBus.salary}}
      </div>
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.welfare}}</div>
      <div class="imgDiv">
        <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt width="200" height="150" />
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllEmployment,findEmploymentByJob,saveEmploymentOrUpdate,findEmploymentById,findEmploymentByTitle,findEmploymentByCity} from "@/api/employment.js";
import config from '@/utils/config.js';
export default {
  data() {
    return {
      //职位
      job:'',
      //标题数组
      titleData:[],
      //城市数组
      cityData:[],
      //职位数组
      jobData:[],
      //招聘中信息数组
      doingData:[],
      //招聘中信息列表
      // doingList:[],
      //一键通过ids
      ids:[],
      //每页条数
      pageSize:config.pageSize,
      //当前页
      currentPage:1,
      //查看模态框显示与否
      seeVisible:false,
      //当前查看的对象
      currentBus:{},
      input:'',
      input:[],
      // value: 'status',
   options: [{
          value: 'title',
          label: '标题'
        }, {
          value: 'city',
          label: '城市'
        },
        ],



    };
  },
  computed: {
    
    //分页数据
    doingList(){
      let temp =[...this.doingData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize);
    },
  },
  methods: {
    //搜索
    async seach(){
      let inp = this.input;
      if(this.value==='title'){  
          let res =await findEmploymentByTitle({title:inp})
          this.doingData = res.data;
      }else if (this.value==='city'){ 
        let res =await findEmploymentByCity({city:inp})
        this.doingData = res.data;
        this.timeDataClear();
      }else{

            this.$confirm('请输入搜索内容！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
      }
      },
    //输入
    inputChang(val){
      if(val===''){
        this.findAllEmp();
      }
    },
    //选择
    seleteChang(val){
      this.input='';  
      if(val===''){
       this.findAllEmp();
      }
    },
    //页数发生改变
    pagechange(page){
      this.currentPage = page;
    },
  //复选框选中切换
  selectionChange(val){
    //val 就是选中的对象组成数组
    // console.log(val);
    let ids = val.map((item)=>{
      return item.id;
    });
    this.ids = ids;
  },
    //职位类型发生改变
    async jobChange(val){
      if(val){
        try {
          let res = await findEmploymentByJob({job:val});
          this.doingData = res.data;
        } catch (error) {
          config.errorMsg(this,'通过职位类型查找招聘信息错误');
        }
      }else{
        this.findAllEmp();
      }
    },
    //查看
    toSee(row){
      this.currentBus = {...row};
      this.seeVisible = true;
    },
    //通过
    async toEdit(val){
      console.log(val,"=================")
      val.status="审核通过";
      console.log(val,'----------');
      try {
        let res = await saveEmploymentOrUpdate(val);
      } catch (error) {
        console.log(error);
      }
    },
    //一键通过
    toBatchStatus(){
      //获取要一键通过的id
      let ids = this.ids;
      this.ids.forEach(async(item)=>{
        let res = await findEmploymentById({id:item});
        res.data.status="审核通过";
        console.log(res,'---------------------------');
        let rs = await saveEmploymentOrUpdate(res.data);
        // this.findAllBus();
      })
    },
    //拒绝
    async toDelete(val){
      val.status="拒绝";
      // console.log(val,'----------');
      let res = await saveEmploymentOrUpdate(val);
    },
    //时间数据清洗
    timeDataClear(){
      this.doingData.forEach(item=>{
        item.publishTime=item.publishTime.slice(0,10);
      })
    },
    //查找所有的招聘信息
    async findAllEmp(){
      try {
        let res = await findAllEmployment();
        this.doingData = res.data;
        // console.log(this.doingData);
        // this.doingData.publishTime = '';
        // //时间数组
        // let timeArr = res.data.map((item)=>{
        //   return item.publishTime.slice(0,10);
        // })
        // this.publishTime = timeArr;
        this.timeDataClear();
        // console.log(this.doingData);
        // item.publishTime = timeArr;
         //标题数组 
        let titleArr = res.data.map((item)=>{
          return item.title;
        });
        this.titleData = [...new Set(titleArr)];
         //城市数组 
        let cityArr = res.data.map((item)=>{
          return item.city;
        });
        this.cityData = [...new Set(cityArr)];
        //职位数组 
        let jobArr = res.data.map((item)=>{
          return item.job;
        });
        this.jobData = [...new Set(jobArr)];
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
  },
  created() {
    this.findAllEmp();
    
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.searchDiv{
  margin-top: 10px;
}
.tebleDiv{
  margin-top: 10px;
}
.footerDiv{
  margin-top: 10px;
  overflow: hidden;
  .btnDiv{
    float: left;
  } 
  .pageDiv{
    float: right;
  }
}
.seeDiv{
  font-weight: bolder;
  border-bottom: 1px solid #ccc;
  line-height:30px;
  span{
    color: #777;
  }
}
.descDiv{
  font-weight: bold;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv{
  text-align: center;
}
.seleteDiv{
float: right;
}
</style>