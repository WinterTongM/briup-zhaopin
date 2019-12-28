/*
 * @Author: wenxt 
 * @Date: 2019-12-25 10:46:29 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-27 16:47:08
 */

<template>
<!-- 商家列表页面 -->
  <div id="businessList">
    <div class="searchDiv">
      <!-- change,不用再传参，它内部已经穿过去了 -->
      <el-select @change="provinceChange" size="mini" v-model="province" clearable placeholder="省份">
        <el-option
          v-for="item in provinceData"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select @change="cityChange" size="mini" v-model="city" clearable placeholder="城市">
        <el-option
          v-for="item in cityData"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select @change="industryChange" size="mini" v-model="industry" clearable placeholder="行业">
        <el-option
          v-for="item in industryData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select @change="scaleChange" size="mini" v-model="scale" clearable placeholder="规模">
        <el-option
          v-for="item in scaleData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="businessList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center"
          prop="name"
          label="企业名称">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column align="center"
          prop="contactName"
          label="联系人">
        </el-table-column>
        <el-table-column align="center"
          prop="industry"
          label="行业">
        </el-table-column>
        <el-table-column align="center"
          label="所在地">
          <!-- 要把省份和城市拿出来 -->
          <!-- 这个template负责将数据渲染上去 scope:当前模板可访问的作用域，通过scope.row可以拿到这一行的对象 -->
          <template slot-scope="scope">{{ scope.row.province }}-{{ scope.row.city }}</template>
        </el-table-column>
        <el-table-column align="center"
          prop="scale"
          label="公司规模">
        </el-table-column>
        <el-table-column align="center"
          label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
            <!-- scope.row当前行的对象，scope.row.id传当前行的id -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination :current-page.sync = "currentPage" :page-sizes = "pageSize"
          background @current-change= "pageChange"
          layout="prev, pager, next"
          :total="businessData.length">
        </el-pagination>
      </div>
    </div>
<!-- ---------------------------------------------------------------------------- -->
    <!-- 查看模态框 -->
    <el-dialog
      :title="currentBus.name"
      :visible.sync="seeVisible">
      <!-- :visible.sync="seeVisible"控制模态框的显示与隐藏 -->
      {{currentBus}}
      <div class="seeDiv">
        <span>行业类型：</span>{{currentBus.industry}}
      </div>
      <div class="seeDiv">
        <span>成立时间：</span>{{currentBus.establishedTime}}
      </div>
      <div class="seeDiv">
        <span>注册资本：</span>{{currentBus.registeredCapital}}
      </div>
      <div class="seeDiv">
        <span>公司规模：</span>{{currentBus.scale}}
      </div>
      <div class="descDiv">
        &nbsp;&nbsp;&nbsp;&nbsp;
        {{currentBus.description}}
      </div>
      <div>
        <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt="" width="200" height="100">
        </a>
      </div>
    </el-dialog>
    <!-- 编辑模态框 -->
    <!-- visible.sync修改模态框显示与否的变量  控制模态框的宽度width  -->
    <el-dialog :before-close="beforeClose" title="修改商家信息" :visible.sync="editVisible" width="60%">
      <el-form :model="currentBus" :rules="rules" ref="ruleForm">
        <!-- model和后面的v-model对应 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name" label="公司名称" :label-width="formLabelWidth">
              <el-input v-model="currentBus.name" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="industry" label="所属行业" :label-width="formLabelWidth">
              <el-input v-model="currentBus.industry" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="scale" label="公司规模" :label-width="formLabelWidth">
              <el-input v-model="currentBus.scale" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- required表示为必填项 -->
            <el-form-item required label="所在城市" :label-width="formLabelWidth">
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="province">
                    <el-select clearable @change="dialogProChange" v-model="currentBus.province" placeholder="请选择省份">
                      <el-option v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="city">
                    <el-select clearable v-model="currentBus.city" placeholder="请选择城市">
                      <el-option
                        v-for="item in provinceCityData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
                
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
              <el-input v-model="currentBus.contactName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="currentBus.contactPhone" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentBus.location" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description" label="公司简介" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="currentBus.description" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel('ruleForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="toSave('ruleForm')" size="mini" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findAllProvince,findProvinceById} from '@/api/province.js';
import {findAllCity,findCityByProvinceId} from '@/api/city.js';
import {findAllBusiness,findBusinessByProvince,findBusinessByCity,findBusinessByIndustry,findBusinessByScale,deleteBusinessById,saveOrUpdateBusiness} from '@/api/business.js';
import config from '@/utils/config.js';
export default {
  data() {
    return {
      //省份
      province:'',
      //城市
      city:'',
      //行业
      industry:'',
      //规模
      scale:'',
      //省份数组
      provinceData:[],
      //城市数组
      cityData:[],
      //行业数组
      industryData:[],
      //规模数组
      scaleData:[],
      //商家数组
      businessData:[],
      //商家列表
      // businessList:[],
      currentPage:1,
      //每页条数
      pageSize:config.pageSize,
      //批量删除ids
      ids:[],
      //当前查看或修改的对象
      currentBus:{},
      // 模态框显示与隐藏
      seeVisible:false,
      // 修改模态框显示与否
      editVisible:false,
      // 修改模态框标题名称所占的宽度
      formLabelWidth:'70px',
      // 省份对应的城市信息,默认为空数组
      provinceCityData:[],
      // 校验规则
      rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          industry: [
            { required: true, message: '请输入行业类型', trigger: 'blur' },
          ],
          scale: [
            { required: true, message: '请输入公司规模', trigger: 'blur' },
          ],
          contactName: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          contactPhone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
          ],
          location: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
          ],
          province: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
      }
    };
  },
  computed: {
    // 分页数据
    businessList(){
      let temp = [...this.businessData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice(pageSize*(page-1),pageSize*page);
    },
  },
  methods: {
    //右上角，模态框关闭之前
    beforeClose(){
       this.$refs[formName].resetFields();
       this.editVisible = false;
    },
    //关闭模态框
    toCancel(formName){
       this.$refs[formName].resetFields();
       this.editVisible = false;
    },
    //查找所有省份信息
    async findAllPro(){
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
    //查找所有城市信息
    async findAllCi(){
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
    //查找所有商家信息
    async findAllBus(){
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
        this.currentPage = 1;
        //行业数组
        let industryArr = res.data.map((item)=>{
          return item.industry;
        })
        this.industryData = industryArr;
        //去重（用Set（数组名））
        this.industryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map((item)=>{
          return item.scale;
        })
        // this.scaleData = scaleArr;
        //去重
        this.scaleData = [...new Set(scaleArr)];
        

      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
    // 复选框选中切换
    selectionChange(val){
      //val===选中的对象组成的数组
      // console.log(val);
      let ids = val.map((item)=>{
        return item.id;
      });
      this.ids = ids;

    },
    //查看
    toSee(row){
      //row当前航对象
      this.currentBus = {...row};
      this.seeVisible = true;
    },
    toEdit(row){
      //row当前航对象
      // 如果是对象就用花括号，如果是数组就用中括号
      this.currentBus = {...row};
      this.editVisible=true;
      
      // alert('编辑');
    },
    toDelete(id){
      this.$confirm('是否删除该记录?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
          // 警告类型的提示框
        }).then(async () => {
          try {
            let res = await deleteBusinessById({id:id});
            if(res.status===200){
              config.successMsg(this,'删除成功');
              this.findAllBus();
            }else{
              config.errorMsg(this,'删除失败');
            }
          } catch (error) {
            config.errorMsg(this,'删除失败');
          }
        }).catch(() => {
          config.successMsg(this,'取消成功');
        });
      // alert('删除');
    },
    // 批量删除
    toBatchDelete(){
      // 获取要批量删除的id  this.ids
      let ids = this.ids;
      if(ids.length > 0){
         this.$alert('是否删除？', '提示', {
          confirmButtonText: '删除',
          callback: action => {
            if(action === 'confirm'){
              //存放每次删除的状态
              let result = [];
              ids.forEach(async (id)=>{
                try {
                  let res = await deleteBusinessById({id:id});
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                  // config.errorMsg(this,'删除失败');
                }
              })
              setTimeout(()=>{
                // console.log(result);
                // 判断是否都是200
                let resu = result.every((item)=>{
                  return item === 200;
                })
                if(resu){
                  config.successMsg(this,'批量删除成功');
                  
                }else{
                  config.errorMsg(this,'批量删除失败');
                }
              },2000);
            }
          }
        });
      }else{
        this.$message({
          message: '请选中要删除的数据',
          type: 'warning'
        });
      }
    },
    //省份发生改变
    async provinceChange(val){
      this.city = '';
      this.industry = '';
      this.scale = '';
      //val是option的value值
      // console.log(val);
      if(val){
        try {
        let res = await findBusinessByProvince({province:val});
        this.businessData =res.data;
        this.currentPage = 1;
        } catch (error) {
        config.errorMsg(this,'通过省份查找商家信息错误');
      }
      }else{
        this.findAllBus();
      }
      
    },
    //城市发生改变
    async cityChange(val){
      this.province = '';
      this.industry = '';
      this.scale = '';
      //val是option的value值
      // console.log(val);
      if(val){
        try {
        let res = await findBusinessByCity({city:val});
        this.businessData =res.data;
        this.currentPage = 1;
        } catch (error) {
        config.errorMsg(this,'通过城市查找商家信息错误');
      }
      }else{
        this.findAllBus();
      }
      
    },
    //行业发生改变
    async industryChange(val){
      this.province = '';
      this.city = '';
      this.scale = '';
      //val是option的value值
      // console.log(val);
      if(val){
        try {
        let res = await findBusinessByIndustry({industry:val});
        this.businessData =res.data;
        this.currentPage = 1;
        } catch (error) {
        config.errorMsg(this,'通过行业查找商家信息错误');
      }
      }else{
        this.findAllBus();
      }
      
    },
    //规模发生改变
    async scaleChange(val){
      this.province = '';
      this.city = '';
      this.industry = '';
      //val是option的value值
      // console.log(val);
      if(val){
        try {
        let res = await findBusinessByScale({scale:val});
        this.businessData =res.data;
        this.currentPage = 1;
        } catch (error) {
        config.errorMsg(this,'通过规模查找商家信息错误');
      }
      }else{
        this.findAllBus();
      }
      
    },
    pageChange(page){
      this.currentPage = page;
    },
    //模态框省份发生改变
    //val是当前选中的option的value值
    async dialogProChange(val){
      // 重置城市下拉列表
      this.currentBus.city = '';
      // console.log(val);
      //通过省份id获取城市
      try {
        let res = await findCityByProvinceId({provinceId:val});
        this.provinceCityData = res.data;
      } catch (error) {
        config.errorMsg(this,'通过省份查找城市失败');
      }
    },
    toSave(formName){
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
            //通过验证
            //将省份id处理为省份名字再保存
            let province = this.currentBus.province;
            // console.log(province);
            // console.log(typeof province);
            // console.log(+province);
            // 如果省份发生更改
            if(+province){
              // 将省份id处理为省份名字再保存,过滤省份数组，不调用后台接口了
              let result = this.provinceData.filter((item)=>{
                
                return item.id === +province;
              })[0];//这里返回的是一个数组，而且只有一个，所以这里要用中括号0获取这个省份对象
              // result是省份对象，result.name就是省份名
              this.currentBus.province = result.name;
              
            }
            //保存
            try {
              let res = await saveOrUpdateBusiness(this.currentBus);
              if(res.status === 200){
                config.successMsg(this,'修改成功');
                this.findAllBus();
                this.editVisible = false;
              }else{
                config.errorMsg(this,'修改失败');
              }
            } catch (error) {
              console.log(error);
              config.errorMsg(this,'修改失败');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    }
  },
  created() {
    this.findAllPro();
    this.findAllCi();
    this.findAllBus();
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
  .tableDiv{
    margin-top: 10px;
  }
  .footerDiv{
    overflow: hidden;
    margin-top: 10px;
  }
  .btnDiv {
      float: left;
    }
    .pageDiv {
      float: right;
    }
  .seeDiv{
    border-bottom: 1px solid black;
    line-height: 24px;
    span{
      color:#999;
    }
  }
  .descDiv{
    font-weight: bold;
    color: #777;
    font-size: 12px;
    line-height: 30px;
    padding: 10px 0;
  }
  .dialog-footer{
    text-align: center;
    margin-top: -20px;
  }
</style>