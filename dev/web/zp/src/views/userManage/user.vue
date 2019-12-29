/*
 * @Author: YangHt 
 * @Date: 2019-12-29 12:53:39 
 * @Last Modified by: YangHt
 * @Last Modified time: 2019-12-29 16:38:22
 */
<template>
  <div id="userList">
    
    <!-- 用户列表页面 -->
    <div class="buttonDiv" align="right">
    <el-button @click="toAdd" size="mini" type="danger">添加用户</el-button>
     <el-button plain @click="toUp"  size="mini" type='primary'>
    导入用户
    </el-button>






    
    </div>

    <el-dialog title="添加用户"  :rules="rules" :visible.sync="dialogFormVisible">
    <el-form :model="jobhunter">
    <el-form-item label="*用户名" prop='username' :label-width="formLabelWidth">
    <el-input v-model="jobhunter.username" ></el-input>
    </el-form-item>
    <el-form-item label="*手机号" prop='telephone' :label-width="formLabelWidth">
    <el-input v-model="jobhunter.telephone"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="toSave1('ruleForm')">确 定</el-button>
    </div>
    </el-dialog>

   
    <!-- 选择器 -->    
    <div class="searchDiv">
    <el-select @change="educationChange" v-model="education" clearable size='mini' placeholder="学历">
    <el-option
      v-for="item in educationData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    <el-select @change="genderChange" clearable v-model="gender"   size='mini' placeholder="性别">
    <el-option
      v-for="item in genderData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    <div class="keywords">
      <el-input class="search_part"  @change="reachkeyWord" size="mini" placeholder="请输入关键字" v-model="inputWord" 
      style="margin-top: 5px; width: 15%;  float: right">
      <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-select class="search_part" @change="keyWordTypeChange" size="mini" v-model="keyWordType" clearable placeholder="关键字" 
    style="margin-top: 5px; width: 10%;  float: right">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"></el-option>
      </el-select>
    </div>

    </div>

    <!-- 表格 -->
    <div class="tableDiv">
    <el-table
    ref="multipleTable"
    :data="jobhunterList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column align="center" type="selection" width="55"></el-table-column>
    <el-table-column align="center" prop="username" label="用户名">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column align="center" prop="realname" label="姓名"></el-table-column>
    <el-table-column align="center" prop="telephone" label="手机号" ></el-table-column>
    <el-table-column align="center" prop="gender" label="性别" ></el-table-column>
    <el-table-column align="center" prop="birth" label="出生年月" ></el-table-column>
    <el-table-column align="center" prop="education" label="最高学历" ></el-table-column>
    <el-table-column label="操作" width="100">
    <template slot-scope="scope">
    <el-button @click="toEdit(scope.row)" type="text" size="small">修改</el-button>
    <el-button @click="toDelete(scope.row.id)" type="text" size="small">删除</el-button>
    </template>
    </el-table-column>
    </el-table>
  </div>

<!-- 修改模态框 -->
    <el-dialog title="修改用户信息" :visible.sync="editVisible" width="60%">
      <el-form :model="currentJo" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="currentJo.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="realname" label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="currentJo.realname"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="telephone" label="手机号" :label-width="formLabelWidth">
              <el-input v-model="currentJo.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="birth" label="出生年月" :label-width="formLabelWidth">
              <el-input v-model="currentJo.birth"></el-input>
            </el-form-item>
          </el-col>    
        </el-row> 

        <el-row>

         
          
          <el-col :span="12">
                <el-form-item required label="学历" :label-width="formLabelWidth">
                  <el-form-item prop="education">
                    <el-select clearable v-model="currentJo.education" placeholder="请选择学历">
                      <el-option
                        v-for="item in educationData"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
             </el-form-item>
          </el-col>

        <el-col :span="12">
                  <el-form-item required label="性别" :label-width="formLabelWidth">
                  <el-form-item prop="gender">
                    <el-select clearable v-model="currentJo.gender" placeholder="性别">
                      <el-option
                        v-for="item in genderData"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
              </el-form-item>
           
           </el-col>
        </el-row>
    </el-form>
    
      <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
        </div>
     </el-dialog>

     <div class="footerDiv">
    <!-- 批量删除按钮 -->
    <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <!-- 分页 -->
       <div class="pageDiv">
       <el-pagination 
       @current-change="pageChange"
       :current-page.sync="currentPage" 
       :page-size="pageSize"
       size="mini" background layout="prev, pager, next" 
       :total="jobhunterData.length"></el-pagination>
       </div>
  </div>
  
  </div>
</template>

<script>
import {findAllJobhunter} from "@/api/jobhunter.js";
import {findJobhunterByEducation} from "@/api/jobhunter.js";
import {findJobhunterByGender} from "@/api/jobhunter.js";
import {deleteJobhunterById} from "@/api/jobhunter.js";
import {saveOrUpdateJobhunter} from "@/api/jobhunter.js";
import config from "@/utils/config.js";
import qs from "qs";

export default {
  data() {
    return {
      //输入
      input:'',
      //当前页
      currentPage:1,
      //批量删除
      ids:[],
      //每页条数
      pageSize:config.page,
      //当前查看或修改的对象
      currentJo:{},
      //学历
      education:"",
      //学历数组
      educationData:[],
      //性别
      gender:"",
      //性别数组
      genderData:[],
       //求职者数组
      jobhunterData:[],
      //求职者列表，表格数据
      //jobhunterList:[],
      //模态框显示与隐藏
      dialogFormVisible:false,
      //修改模态框显示与否
      editVisible: false,
      //表单左侧的文字宽度
      formLabelWidth:"120px",
      //表单中的数据对象
      jobhunter:{},
      //关键字类型
      keyWordType:'',
      // 输入的搜索关键字
      inputWord:"",
      // 输入的搜索分类
      options:
      [
        {value: '选项1', label: '学历'}, 
        {value: '选项2',label: '性别'},
        {value: '选项3',label: '手机号'},    
        {value: '选项4',label: '用户名'},
      ],
      //
      
      //选择
      select: '',
       //校验规则
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        realname: [{ required: true, message: "请输入真实姓名", trigger: "blur" } ],
        telephone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" } ],
        birth: [{ required: true, message: "请输入出生年月", trigger: "blur" }],
        education: [{ required: true, message: "请输入学历", trigger: "blur" }],
        
      }
    };
},
  computed: {
    //定义求职者列表，表格中的数据
    jobhunterList(){
      let temp = [...this.jobhunterData];
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize, page * pageSize);
    }
  },

  //事件处理函数
  methods: {
    toUp(){
       this.$notify({
          title: '消息',
          message: '该功能暂未开发!',
          type: 'warning'
        });
    },
    //搜索
    keyWordTypeChange(){
      //只改变属性值
    },    
    /**
    * 输入关键字并按回车时触发的事件
    * 作用：寻找含有关键字的记录，并显示
    */
    async reachkeyWord(keyWord){
      // 选择某一方面搜索
      // console.log("关键字类型："+this.keyWordType);
      if(this.keyWordType){
        try {
          // 根据关键字类型调用方法
          let res;
          // 学历
          if(this.keyWordType==this.options[0].value){
            res=await findJobhunterByEducation({education :this.inputWord });
            this.jobhunterData=res.data;
            this.currentPage=1;
          }
          // 性别
            else if(this.keyWordType==this.options[1].value){
            res=await findJobhunterByGender({gender :this.inputWord });
            this.jobhunterData=res.data;
            this.currentPage=1;
          }
          // 手机号
            else if(this.keyWordType==this.options[3].value){
            res=await findJobhunterByTelephone({ telephone :this.inputWord });
            this.jobhunterData=res.data;
            this.currentPage=1;
          }
          // 用户名
            else if(this.keyWordType==this.options[4].value){
            res=await findJobhunterByUsername({ username :this.inputWord });
            this.jobhunterData=res.data;
            this.currentPage=1;
          }                                    
        } catch (error) {
           
            config.errorMsg(this, "通过关键字查找用户信息错误！");
          }          
        }
        else{
          // 弹出警告
          config.errorMsg(this,"请选择关键字！");
          // 恢复原本数据
          this.findAllJo();
        }
    },


     //保存
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.currentJo);
            if (res.status === 200) {
              this.findAllJo();
              this.editVisible = false;
              config.successMsg(this, "修改成功");
            } else {
              config.errorMsg(this, "修改失败");
            }
          } catch (error) {
         
            config.errorMsg(this, "修改失败");
          }
        }
      })
    },

    //分页
    pageChange(page){
      //val当前点击的页数
      // console.log(page);
      this.currentPage = page;
    },
    
   //保存
      async toSave1(){
        try{
          let res = await saveOrUpdateJobhunter(this.jobhunter);
          this.dialogFormVisible = false;
          this.findAllJo();

         config.successMsg(this, "保存数据成功");
        }catch(error){
          config.errorMsg(this, "保存数据不全");
        }
    },

   
     
    //新增按钮
    toAdd(){
      this.dialogFormVisible = true;
      this.jobhunter={};
      this.findAllJo;
    },
    //修改
    toEdit(row){
      this.currentJo = { ...row };
      this.editVisible = true;
    },
    //删除
     toDelete(id) {
      // alert("删除");
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteJobhunterById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllJo();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除
    toBatchDelete() {
      //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async(id)=> {
                try {
                  let res = await deleteJobhunterById({id:id});
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllJo();
              }, 2000);
            }
          }
      });
    } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
    },
    //复选框选中切换
    selectionChange(val){
      //val就是选中的对象组成的数组
          // console.log(val);
          let ids = val.map((item)=>{
            return item.id;
          });
          this.ids = ids;
      },
      //查找所有性别信息
    async genderChange(val) {
      this.education='';
      if(val){
      try {
        let res = await findJobhunterByGender({gender:val});
        this.jobhunterData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    }else{
        this.findAllJo();
      }
    },
     //查找所有学历信息
    async educationChange(val) {
      this.gender='';
      if(val){
      try {
        let res = await findJobhunterByEducation({education:val});
        this.jobhunterData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    }else{
        this.findAllJo();
      }
    },
    //查找所有求职者信息
    async findAllJo(){
      try{
        let res = await findAllJobhunter();
        this.jobhunterData = res.data;
        //学历数组
        let educationArr = res.data.map(item => {
          return item.education;
        });
        //去重
        this.educationData = [...new Set(educationArr)];
        //性别数组
        let genderArr = res.data.map(item => {
          return item.gender;
        });
        //去重
        this.genderData = [...new Set(genderArr)];
      }catch(error){
      config.errorMsg(this, "查找错误");
      }
    }
  },
  //生命周期钩子函数，组件创建完毕
  created() {
   this.findAllJo();
   this.genderChange();
   this.educationChange();
   this.keyWordTypeChange();
  },
  mounted() {}
};
</script>
<style lanf='scss' scoped>
.buttonDiv{
  float: right;
  position: relative;
  top:-50px;
  right: 25px;
}
.pageDiv{
  float: right;
  
}
.dialog-footer{
text-align: center;
}

/* .searchDiv{
  margin-bottom:-20px;
  margin-bottom: 10px;
} */
.userList{
  position: absolute;
 


}
.keywords{

  position: relative;
  right:20px;
  top:-34px;
 
}

</style>