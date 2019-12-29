/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: wangzai
 * @Last Modified time: 2019-12-29 16:20:27
 */
<template>
<!-- 选择框 -->
  <div>   
    <div class='searchDiv'>
         <el-select size="mini" v-model="province" clearable placeholder="省份" @change="provinceChange" style="width:131px;"> <!--//不改变不触发事件  //不需要再传参，已经有‘当前选中的option‘值 -->
            <el-option
              v-for="item in provinceData"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select size="mini" v-model="city" clearable placeholder="城市" @change="cityChange" style="width:131px;">
            <el-option
              v-for="item in find"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
           <el-select size="mini" v-model="industry" clearable placeholder="行业" @change="industryChange" style="width:131px;">  <!--data 是字符串 -->
            <el-option
              v-for="item in industryData"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
           <el-select size="mini" v-model="scale" clearable placeholder="规模" @change="scaleChange" style="width:131px;">
            <el-option
              v-for="item in scaleData"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
      
    </div>
<!-- 表格表头 -->
   <el-table
    ref="multipleTable"
    :data="businessList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column align="center" type="selection" ></el-table-column>                         <!-- 选中全部复选框 -->
    <el-table-column align="center" prop="name" label="企业名称" ></el-table-column>
    <el-table-column align="center" prop="contactName" label="联系人" ></el-table-column>
    <el-table-column align="center" prop="contactPhone" label="联系方式" ></el-table-column>
    <el-table-column align="center" prop="industry" label="行业" ></el-table-column>
    <el-table-column align="center" label="所在地" >
       <template slot-scope="scope">{{ scope.row.province }}-{{scope.row.city}}</template>  <!--template 拿两个属性 -->
    </el-table-column>
    <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
   
<!-- **********************************************操作按钮**************** -->   
    <el-table-column align="center" label="详情" ><template slot-scope="scope">    
        <el-button @click="toView(scope.row)" type="text" size="mini">查看</el-button>  <!--//通过scope.row可拿到所在行的对象 -->
    </template></el-table-column>

  <el-table-column align="center" label="操作"> 
      <!-- slot写在组件template的哪块，父组件传过来的模板将来就显示在哪块。 -->
      <template slot-scope="scope">    
        <el-button @click="toEdit(scope.row)" type="text" size="mini">修改</el-button>
        <el-button @click="toDelect(scope.row.id)" type="text" size="mini">删除</el-button>  <!--//通过scope.row可拿到所在行的对象 -->
      </template>
    </el-table-column>
  </el-table>
  
  <!-- 批量删除按钮 -->
 <div class="footDiv">
      <div class='btnDiv'><el-button type="danger" size="mini" @click="toBatchDelect" >批量删除</el-button></div>
       <div class="pageDiv">    <!--没有加sync 表示只读一次，单向数据绑定 -->
        <el-pagination 
        :page-size="pageSize"
        :current-page.sync="currentPage"  
         @current-change="pageChange"  
          background
          layout="prev, pager, next"
           :total="businessData.length"> <!--//分页总条数 --> <!-- @current-change当前页面改变时触发的事件处理程序 -->
        </el-pagination>                      <!--  current-page属性支持sync 只要改了current-page的值，就会发生变化    -->
</div>
 </div>

<!-- **********************************************修改模态框**************** -->   
  <el-dialog title="修改商家信息" :visible.sync="dialogFormVisible" :before-close="beforeClose">

  <el-form :model="business" label-width="100px" :rules="rules" ref="business">
  <!-- 名称和行业 -->
    <el-row>
      <el-col :span="11">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="business.name" ></el-input>
      </el-form-item></el-col>
      <el-col :span="11">
      <el-form-item label="所属行业" prop="industry">
          <el-input v-model="business.industry"></el-input>
        </el-form-item></el-col>
    </el-row>

  <!-- 规模和城市 -->
    <el-row>
      <el-col :span="11">
      <el-form-item label="公司规模" prop="scale">
      <el-input v-model="business.scale" > </el-input>
      </el-form-item>
      </el-col>

      <el-col :span="11">
      <el-form-item label="所在城市" prop="province" >
      <el-col :span="11">
      <el-select v-model="business.province" @change="proChange" placeholder="省份">
          <el-option v-for="item in provinceData" :key='item.id' :label="item.name" :value='item.id'></el-option>
          
      </el-select></el-col>
      <el-col class="line" :span="2">--</el-col>
      <el-col :span="11">
      <el-select v-model="business.city" placeholder="城市">
          <el-option v-for="item in findCityData" :key='item.id' :label="item.name" :value='item.name'></el-option>
      </el-select></el-col>
      </el-form-item>
      </el-col>
    </el-row>

  <!-- 联系人和电话 -->
    <el-row>
      <el-col :span="11">
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="business.contactName" ></el-input>
      </el-form-item></el-col>
      <el-col :span="11">
      <el-form-item label="联系方式" prop="contactPhone">
        <el-input v-model="business.contactPhone"></el-input>
      </el-form-item></el-col>
    </el-row>

  <!-- 资金和地址 -->
    <el-row>
      <el-col :span="11">
      <el-form-item label="注册资金" prop="registeredCapital" >
        <el-input v-model="business.registeredCapital" placeholder="请输入注册资金"></el-input>
      </el-form-item></el-col>
      <el-col :span="11">
      <el-form-item label="详细地址" prop="location" >
        <el-input v-model="business.location" placeholder="请输入详细地址"></el-input>
      </el-form-item></el-col>
    </el-row>

  
  <!--------------------- 按钮 -->
    <el-form-item>
      <el-button type="primary" @click="toSave('business')">完成修改</el-button>
      <el-button @click="toCancel('business')">取消</el-button>
    </el-form-item>
</el-form>
</el-dialog>

<!-- **********************************************  详情框**************** -->
 <el-dialog :title="busMsg.name" :visible.sync="FormVisible" class="dialogShow">
  <el-card >
    <div class="seeDiv" >      
     <span>行业：</span> {{busMsg.industry}}
      <br>     
      <span>规模：</span> {{busMsg.scale}}     
    </div>
    <div class="seeDiv">
      <span>注册时间</span>：{{busMsg.establishedTime}}
      <br>
      <span>注册资本：</span>{{busMsg.registeredCapital}}
    </div>
   
    <div class="descDiv">
      &nbsp;&nbsp;&nbsp;&nbsp;{{busMsg.description}}
    </div>
    <div class="seeDiv">
      <br>
      <a :href="busMsg.businessLicense" target="_blank">
      <img :src="busMsg.businessLicense" alt="" width="200" height="100"></a>
      
    </div>
  </el-card>
  </el-dialog>

</div>
</template>

<script>
      import {findAllProvince} from '@/api/province.js';
      import {findAllCity,findCityByProvinceId} from '@/api/city.js';
      import {findAllBusiness} from '@/api/business.js';
      import {deleteBusinessById} from '@/api/business.js';
      import{findBusinessByProvince} from '@/api/business.js';
      import {saveOrUpdateBusiness} from '@/api/business.js';
      import {findBusinessByCity} from '@/api/business.js';
      import {findBusinessByIndustry} from '@/api/business.js';
      import {findBusinessByScale} from '@/api/business.js';
      import config from '@/utils/config.js';

export default {
  data() {
    return {
      businessData:[],  //商家数据
      dialogFormVisible:false,
      currentPage:1,  //当前页
      pageSize:config.pageSize,   //单项绑定config的每页条数
      FormVisible:false,
      busMsg:[],
      ids:[], //批量删除的ID
      
  //选择按钮数据
      province:'',
      city:'',
      industry:'',
      scale:'',
      provinceData:[],
      find:[],
      industryData:[],
      scaleData:[],
      findCityData:[],  //省份对应城市

  //表单验证数据
    business: {
          name: '',
          industry: '',
          contactName:'',
          contactPhone: '',
          location:'',
          scale:'',
          registered_capital:'',
          province:'',
          city:'',
        },

    rules:{
          name: [{ required: true, message: '请输入新的公司名称', trigger: 'blur' },],
          industry: [{ required: true, message: '请输入行业', trigger: 'blur' }],
          scale: [ { required: true, message: '请选择规模', trigger: 'change' }],
          Province: [ { required: true, message: '请选择规模', trigger: 'change' }],
          
          contactName: [{ required: true, message: '请输入联系人名称', trigger: 'blur' }],
          contactPhone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
          registeredCapital: [{ required: true, message: '请输入注册资金', trigger: 'blur' }],
          location: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
          
          
        },

     };

  },
  computed: {
   //分页
    businessList(){
      let temp=[...this.businessData];
      let page=this.currentPage;
      let pageSize=config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize);
    },


  },
  methods: {

//查找所有省份信息
  async findAllPro(){
    try{
      let res= await findAllProvince();
      this.provinceData=res.data;
    }catch (err){
      config.errorMsg(this,'查找错误');
    }
  },

//查找所有城市信息
    async findAllCi(){
      try{
        let res= await findAllCity();
        this.find=res.data;
      }catch (err){
        config.errorMsg(this,'查找错误');
      }
    },
//查找商家信息
  async findAllBus(){
      try{
        let res= await findAllBusiness();
        this.businessData=res.data;
        this.currentPage=1;
        //行业
        let industryArr=res.data.map(item=>{return item.industry;})  //map映射
        this.industryData=[...new Set (industryArr)];  //set 去重
        //规模
        let scaleArr=res.data.map(item=>{return item.scale;})  //map映射
        this.scaleData=[...new Set(scaleArr)];
      }catch (err){
        config.errorMsg(this,'查找错误');
      }
    },
//右上角，模态框关闭之前
    beforeClose() {
      this.$refs["business"].resetFields();
      this.dialogFormVisible = false;
    },
//关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
//完成修改按钮
  async toSave(formName) {
    this.$refs[formName].validate(async valid => {
        if (valid) {
          //通过验证
         //将省份id处理为省份名字再保存
      let province = this.business.province;
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
        this.business.province = result.name;        
      }
      //保存
      try {
        let res = await saveOrUpdateBusiness(this.business);
        if(res.status === 200){
          config.successMsg(this,'修改成功');
          this.findAllBus();
          this.dialogFormVisible = false;
        }else{
          config.errorMsg(this,'修改失败');
        }
      } catch (error) {
        console.log(error);
        config.errorMsg(this,'修改失败');
      }
       } else {
          console.log("error submit!!");
          return false;
        }
      });
    
        },


 
//修改   
    toEdit(row) {
      this.dialogFormVisible=true;
      this.business={...row};           //复制对象{...xxx} 复制数组 复制数组[...xxx]
    },
//根据省份查找城市
  async proChange(val){
    this.business.city='';
    try{
      let res= await findCityByProvinceId({provinceId:val});
      this.findCityData=res.data;
    }catch(err){
      config.errorMsg(this,'通过省份查找城市失败');
    }
  },
//删除
   toDelect(id){
     
       
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async() => {
          try{  
          let res=await deleteBusinessById({id});        
          if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllBus();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除不成功");
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
     
    },
//批量删除
  toBatchDelect(){
    let ids=this.ids;
    if(ids.length > 0){
      this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteBusinessById({id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;});
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllBus();
              }, 2000);
            }
          }
        });
    }else{this.$message({
          message: '请选择删除信息',
          type: 'warning'
        });}
  },

//复选框选中切换
  selectionChange(val){  //val为选中对象
    let ids=val.map(item=>{return item.id});
    this.ids = ids;
  },
//查看
  toView(srow){
    this.FormVisible=true;
    this.busMsg={...srow};
  },

//省份发生改变
  async provinceChange(val){
    this.city='';
    this.industry='';
    this.scale='';
      if(val){
          try{
            let res=await findBusinessByProvince({province:val});
            this.businessData=res.data;
            this.currentPage=1;  //对分页进行重置
          }catch(err){
            config.errorMsg(this,'查找错误');}
          }
      else{this.findAllBus()}
    },

//城市发生改变
  async cityChange(val){
    this.province='';
    this.industry='';
    this.scale='';
      if(val){
          try{
            let res=await findBusinessByCity({city:val});
            this.businessData=res.data;
            this.currentPage=1;
          }catch(err){
            config.errorMsg(this,'查找错误');}
          }
      else{this.findAllBus()}
    },
//行业发生改变
  async industryChange(val){
    this.city='';
    this.province='';
    this.scale='';
      if(val){
          try{
            let res=await findBusinessByIndustry({industry:val});
            this.businessData=res.data;
            this.currentPage=1;
          }catch(err){
            config.errorMsg(this,'查找错误');}
          }
      else{this.findAllBus()}
    },


//规模发生改变
  async scaleChange(val){
    this.city='';
    this.province='';
    this.industry='';
      if(val){
          try{
            let res=await findBusinessByScale({scale:val});
            this.businessData=res.data;
            this.currentPage=1;
          }catch(err){
            config.errorMsg(this,'查找错误');}
          }
      else{this.findAllBus()}
    },

//页数发生改变
  pageChange(page){   //page当前页数     //数据模型改 依赖条件改 计算属性改
    this.currentPage=page;
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
<style lang="scss" scoped>  //scss可写嵌套代码
.searchDiv{
  margin-bottom: 10px;
}
.footDiv{
  overflow: hidden;
  margin-top: 10px;
  .btnDiv{
    float:left;
  }
  .pageDiv{
    float: right;
  }
}
.seeDiv{
  border-bottom:1px solid #ccc;
  line-height: 30px;
  span{
    color: #999;
  }
}
.descDiv{
  color: #999;
  font-size:15px ;
  border-bottom:1px solid #ccc;
}
.dialogShow{

}

</style>