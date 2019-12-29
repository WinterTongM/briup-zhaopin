/*
 * @Author: wenxt 
 * @Date: 2019-12-25 11:27:15 
 * @Last Modified by: wangzai
 * @Last Modified time: 2019-12-29 16:37:22
 */

<template>
  <!-- 城市管理页面 -->
  <div id="moduleCity">
    <div class="addBut">
      <el-button type="warning" icon="el-icon-circle-plus-outline" @click="addProvinceBtn">添加省份</el-button>
    </div>
    <div class="cardDiv" v-for="(item,index) in provinceList" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          {{item.name}}
        </div>
        <div class="cityDataList" v-for="(cityitem,cityindex) in item.city" :key="cityindex">
          <span>{{cityitem.name}}</span>
        </div>
        <div class="cityDataList addButDiv" v-if="item.butStatu">
          <el-button type="text" @click="addCity(item)">添加</el-button>
        </div>
        <div class="cityDataList inputDiv" v-else>
          <input placeholder="请输入城市名称" v-model="cityName" type="text" >
          <button @click="cityDataAdd(item)">添加</button>
        </div>
      </el-card>
    </div>
    <div class="footerDiv">
      <div class="pageDiv">
        <el-pagination :current-page.sync = "currentPage" :page-sizes = "pageSize"
          background @current-change= "pageChange"
          layout="prev, pager, next"
          :total="provinceData.length">
        </el-pagination>
      </div>
    </div>
    <div class="waitDiv" v-if="waiting">
      <h1>{{reminder}}</h1>
    </div>
    <el-dialog title="省份添加" :visible.sync="addProVisible" width="30%">
      <el-form>
        <el-form-item label="省份名称:" :label-width="formLabelWidth">
          <el-input placeholder="请输入省份名" v-model="provinceName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addProVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProvince">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findAllCity,findCityByProvinceId,findCityById,saveOrUpdateCity} from '@/api/city.js';//导入
import {findAllProvince,findProvinceById,saveOrUpdateProvince} from '@/api/province.js';
import config from '@/utils/config.js';

export default {
  data() {
    return {
      cityData:[],
      //将省份信息和城市信息做成一个二维数组，通过省份id找到所有该省份的城市名和城市id
      provinceData:[],
      cityName:'',
      //添加省份模态框显示与否
      addProVisible:false,
      provinceName:'',
      formLabelWidth:'80px',
      //当前页码
      currentPage:1,
      //每页条数
      pageSize:6,
      reminder:'Please wait a moment',
      waiting:true,
    };
  },
  computed: {
    provinceList(){
      let temp = [...this.provinceData];
      let page = this.currentPage;
      let pageSize = this.pageSize;
      return temp.slice(pageSize*(page-1),pageSize*page);
    }
  },
  methods: {
    //获取城市信息
    async findCityData(){
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
    //获取省份信息   ,在省份信息中再添加一个属性，用于后面的按钮添加
    async findProvinceData(){
      try {
        let res = await findAllProvince();
        let temp = [...res.data];
        //获取省份对应的城市数组
        temp.forEach(async item=>{
          //item是对象
          let pId = item.id;
          try {
            let res = await findCityByProvinceId({provinceId:pId});
            item.butStatu = 'true';
            //butStatu为true则显示添加按钮，false显示输入框
            item.city = res.data;
          } catch (error) {
            config.errorMsg(this,'查找错误');
          }
        });
        // 超时调用
        setTimeout(() => {
          this.provinceData = temp;
          this.waiting = false;
        },2000);
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
    //添加城市按钮
    async addCity(val){
      val.butStatu = false;
    },
    //添加城市
    async cityDataAdd(val){
      //需要省份pId和城市名称this.cityName
      let pId = val.id;
      let name = this.cityName;
      try {
        let res = await saveOrUpdateCity({provinceId:pId,name:name});
        this.findProvinceData();
        val.butStatu = true;
        config.successMsg(this,'城市添加成功');
        this.cityName = '';
      } catch (error) {
        config.errorMsg(this,'城市添加失败');
        console.log(error);
      }
    },
    //省份添加按钮
    addProvinceBtn(){
      this.addProVisible = true;
    },
    //添加省份
    async addProvince(){
      let name = this.provinceName;
      try {
        let res = await saveOrUpdateProvince({name:name});
        config.successMsg(this,'省份添加成功');
        this.addProVisible = false;
        this.findProvinceData();
      } catch (error) {
        config.errorMsg(this,'省份添加失败');
        console.log(error);
      }
    },
    pageChange(page){
      this.currentPage = page;
    }
  },
  //钩子函数
  created() {
    this.findCityData();
    this.findProvinceData();
  },
  mounted() {}
};
</script>
<style scoped>
.waitDiv{
  text-align: center;
}
.cityDataList{
  display: inline;
  margin-right: 20px;
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