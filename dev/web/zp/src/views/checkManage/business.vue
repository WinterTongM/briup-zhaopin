/*
 * @Author: liuyr 
 * 商家审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: LeiHaha
 * @Last Modified time: 2019-12-27 22:06:47
 */
<template>
  <div id="businessCheck">
    <div class="searchDiv">
      <el-select @change="statusChange" v-model="status" clearable placeholder="全部">
        <el-option
          v-for="item in staData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="tebleDiv">
      <el-table ref="multipleTable" :data="businessData" tooltip-effect="dark" style="width: 100%" >
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
        <el-table-column align="center" prop="status" label="操作"></el-table-column>
        <!-- <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="toEdit(scope.row)">通过</el-button>
            <el-button type="danger" size="mini" @click="toDelete(scope.row.id)">拒绝</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination :page-size="pageSize" :current-page.sync="currentPage"
          @current-change="pageChange"
            background
            layout= "prev, pager, next"
            :total="businessData.length">
        </el-pagination>
      </div>
    </div>
    {{businessData}}
    {{statusData}}
    {{staData}}
  </div>
</template>

<script>
import {findAllBusiness} from '@/api/business.js'
import config from '@/utils/config.js';
export default {
  data() {
    return {
      //商家数组
      businessData:[],
      //操作数组
      statusData:[],
      //状态数组
      staData:[],
      //商家列表
      statusList:[],
    };
  },
  computed: {},
  methods: {
    //选项发生改变
    statusChange(val){
      this.statusData.forEach(item =>{
        if(item.statusData ===val ){
          return item.statusData;
        }

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
<style scoped>
</style>