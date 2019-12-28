/*
 * @Author: wenxt 
 * @Date: 2019-12-25 11:27:15 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-25 19:40:11
 */

<template>
  <!-- 城市管理页面 -->
  <div id="moduleCity">
    <!-- <el-button @click="toAddProvince" type="warning">添加省份</el-button> -->
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
      provinceAddCityData:[],
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
    //获取省份信息
    async findProvinceData(){
      try {
        let res = await findAllProvince();
        // console.log(res.data);
        this.provinceData = res.data;
        //temp是省份信息数组
        let provinceTemp = res.data;
        // console.log(temp,'******');
        //获取省份对应的城市数组
        //***************************************************************************** */
        //1.遍历数组获取对应的provinceId
        provinceTemp.map(async item=>{
          // console.log(item.id);这是provinceId
          // console.log(item);这是province对象
          
          let pId = item.id;
          //2.根据provinceId进行查找相关城市信息，调用接口findCityByProvinceId(param)
          try {
            let res = await findCityByProvinceId({provinceId:pId});
            // console.log(res);是省份对应的城市信息对象
            // console.log(res.data);是省份对应的城市信息数组
            let cityTemp = res.data;
            //获得省份对应的城市数组后，将省份信息和对应的城市信息合并放到新的数组中provinceAddCityData
            // console.log([item],'******-*-*--*-*-');
            
          } catch (error) {
            config.errorMsg(this,"错误");
          }
          return true;
        })
        console.log(this.provinceAddCityData);
      } catch (error) {
        // config.errorMsg(this,"'查找错误'");
        console.log(error);
      }
    },
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
/* .cityDataList{
  display: inline;
  margin-right: 10px;
} */
</style>