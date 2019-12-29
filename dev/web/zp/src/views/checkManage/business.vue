/*
 * @Author: liuyr 
 * 商家审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: YangHt
 * @Last Modified time: 2019-12-29 11:37:07
 */
<template>
  <div id="businessCheck">
   
    <div class="searchDiv">
      <el-select @change="statusChange" v-model="status" size="mini" clearable placeholder="全部">
        <el-option
          v-for="item in staData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="tebleDiv">
      <el-table ref="multipleTable" :data="businessList" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
      <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="contactName" label="联系人"></el-table-column>
        <el-table-column align="center" prop="contactPhone" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="industry" label="行业"></el-table-column>
        <el-table-column align="center" label="所在地">
          <template slot-scope="scope">
            {{ scope.row.province}}-{{scope.row.city}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
          <el-table-column align="center" prop="status" label="操作" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status === '审核通过'">
              <div>{{scope.row.status}}</div>
            </div>
            <div v-if="scope.row.status === '拒绝'">
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
        <el-pagination :page-size="pageSize" :current-page.sync="currentPage"
            background
          @current-change="pageChange"
            layout= "prev, pager, next"
            :total="businessData.length">
        </el-pagination>
      </div>
    </div>
    <!-- 查看 -->
    <el-dialog
      :title="currentBus.name"
      :visible.sync="seeVisible">
      <div class="seeDiv">
        {{currentBus.industry}}
      </div>
      <div class="seeDiv">
        {{currentBus.scale}}
      </div>
      <div class="seeDiv">
        <span>成立时间:</span>
        {{currentBus.establishedTime}}
      </div>
      <div class="seeDiv">
        <span>注册资本:</span>
        {{currentBus.registeredCapital}}
      </div>
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div>
      <div class="imgDiv">
        <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt width="200" height="150" />
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findAllBusiness,saveOrUpdateBusiness,findBusinessById} from '@/api/business.js'
import config from '@/utils/config.js';
export default {
  data() {
    return {
      status:'',
      //商家数组
      businessData:[],
      //操作数组
      statusData:[],
      //状态数组
      staData:[],
      //商家列表 
      statusList:[],
      //一键通过
      ids:[],
      //每页条数
      pageSize:config.pageSize,
      //当前页
      currentPage:1,
      //id查找出的商家数组
      idStaus:[],
      //查看模态框显示与否
      seeVisible:false,
      //当前查看或修改的对象
      currentBus:{},
    };
  },
  computed: {
    //分页数据
    businessList(){
      let temp =[...this.businessData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize);
    },
  },
  methods: {
    //查看
    toSee(row){
      this.currentBus = {...row};
      this.seeVisible = true;
    },
    //拒绝
    async toDelete(val){
      val.status="拒绝";
      // console.log(val,'----------');
      let res = await saveOrUpdateBusiness(val);
    },
    //通过
    async toEdit(val){
      val.status="审核通过";
      // console.log(val,'----------');
      let res = await saveOrUpdateBusiness(val);
    },
    //页数发生改变
    pagechange(page){
      this.currentPage = page;
    },
    //一键通过
    toBatchStatus(){
      //获取要一键通过的id
      let ids = this.ids;
      this.ids.forEach(async(item)=>{
        let res = await findBusinessById({id:item});
        res.data.status="审核通过";
        // console.log(res,'---------------------------');
        let rs = await saveOrUpdateBusiness(res.data);
        this.findAllBus();
      })

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

    //选项发生改变d
    statusChange(val){
      // console.log( this.businessData)
      // console.log( val)
      let rs = [];
      this.businessData.forEach(item=>{
        if(item.status === val){
          // alert(1)
          rs.push(item);
        }else{
          if(val===''){
            this.findAllBus();
          }
          }
          this.businessData=rs;      
         console.log(rs)
      })
    },
    //查找所有商家信息
    async findAllBus(){
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
        //操作数组
        let statusArr = res.data.map(itme=>{
          return itme.status;
        });
        this.statusData = statusArr;
        //状态数组
        let staArr = res.data.map(item=>{
          return item.status;
        });
        this.staData = [...new Set(staArr)];
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
  },
  created() {
    this.findAllBus();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
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

.searchDiv{
    margin-bottom: 10px;
}


</style>