/*
 * @Author: wenxt 
 * @Date: 2019-12-25 11:27:15 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-27 11:36:46
 */

<template>
  <!-- 城市管理页面 -->
  <div id="moduleCity">
    <!-- <el-button @click="check" type="warning">测试</el-button> -->
    {{test}}
    <hr>
    {{provinceData}}
    
    <hr>
    <!-- ------------------------------------------------- -->
    <div v-for="(item,index) in provinceData" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          {{item.name}}
        </div>
        <div class="cityDataList" v-for="(cityitem,cityindex) in item.city" :key="cityindex">
          <span>{{cityitem.name}}</span>
        </div>
        <div class="cityDataList addButDiv" v-if="item.butStatu">
          <el-button type="text" @click="addCity">添加</el-button>
        </div>
        <div class="cityDataList inputDiv" v-else>
          <input type="text" value="请输入城市名称">
          <button>添加</button>
        </div>
      </el-card>
    </div>
    <!-- ------------------------------------------------- -->
  </div>
</template>

<script>
import {findAllCity,findCityByProvinceId} from '@/api/city.js';//导入
import {findAllProvince} from '@/api/province.js';
import config from '@/utils/config.js';

export default {
  data() {
    return {
      cityData:[],
      provinceData:[],
      //将省份信息和城市信息做成一个二维数组，通过省份id找到所有该省份的城市名和城市id
    };
  },
  computed: {},
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
        // console.log(res.data);
        // this.provinceData = res.data;
        let temp = [...res.data];
        // console.log(temp,'******');
        //获取省份对应的城市数组
        temp.forEach(async item=>{
          //item是对象
          let pId = item.id;
          // console.log(item,'-----*-*-*-*-');
          try {
            let res = await findCityByProvinceId({provinceId:pId});
            // console.log(res.data,'--------');
            item.butStatu = 'true';
            //butStatu为true则显示添加按钮，否则显示输入框
            item.city = res.data;
            // console.log(item);
          } catch (error) {
            config.errorMsg(this,'查找错误');
          }
        });
        // 超时调用
        setTimeout(() => {
          this.provinceData = temp;
          // this.test = 'Load the success';
          // console.log(this.provinceData);
          // console.log(this.provinceData,'-------');
        },2000);
      } catch (error) {
        config.errorMsg(this,'查找错误');
      }
    },
    addCity(){
      
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
.cityDataList{
  display: inline;
  margin-right: 10px;
}
</style>