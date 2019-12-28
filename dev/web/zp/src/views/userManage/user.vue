/*
 * @Author: liuyr 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: Ryan
 * @Last Modified time: 2019-12-28 09:14:47
 */
<template>
  <div id="userList">
    {{ids}}
    <!-- 用户列表页面 -->
    <div class="buttonDiv" align="right">
    <el-button @click="toAdd" size="small" type="danger">添加用户</el-button>
    <el-button size="small" type="primary">导入用户</el-button>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
    <el-form :model="jobhunter">
    <el-form-item label="*用户名" :label-width="formLabelWidth">
    <el-input v-model="jobhunter.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="*手机号" :label-width="formLabelWidth">
    <el-input v-model="jobhunter.telephone" placeholder="请输入用户手机号"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="toSave">确 定</el-button>
    </div>
    </el-dialog>

    <!-- 点击导入用户按钮触发模态框
    <el-upload
    class="upload-demo"  drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->

    <!-- 选择器 -->    
    <div class="searchDiv">
    <el-select @change="educationChange" v-model="education"  placeholder="学历">
    <el-option
      v-for="item in educationData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>
    <el-select @change="genderChange" v-model="gender"  placeholder="性别">
    <el-option
      v-for="item in genderData"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
    </el-select>

    <!-- 搜索框-->
    <!-- <div size="mini" style="margin-top: 15px; width: 20%;  float: right">
    <el-input placeholder="请输入内容" v-model="currentJo.education" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
    <el-option label="用户名" value="1"></el-option>
    <el-option label="姓名" value="2"></el-option>
    <el-option label="学历" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </div>  -->
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
      jobhunter:{
        username:'',
        telephone:'',
      },
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

    //分页
    pageChange(page){
      //val当前点击的页数
      // console.log(page);
      this.currentPage = page;
    },
    
    //保存
      async toSave(){
        console.log(this,jobhunter)
        try{
          let res = await axios.post('/saveOrUpdate/Jobhunter',qs.stringify(this.jobhunter),
          console.log(res))
        }catch(error){
          config.errorMsg(this, "查找错误");
        }
    },
    //新增按钮
    toAdd(){
      this.dialogFormVisible = true;
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
  },
  mounted() {}
};
</script>
<style scoped>
.searchDiv{
 margin:20px;
 
}
.buttonDiv{
  margin-top: -70px;
}
.pageDiv{
  float: right;
  margin-top: 10px;
}
.dialog-footer{
text-align: center;
}
</style>