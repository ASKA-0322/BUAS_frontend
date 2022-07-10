<template>
  <div class="app-container">
     <!-- 表单查询输入框 -->
    <el-form :inline="true">   <!-- inline表示一行显示  -->
      <el-form-item><!-- 可添加label标签 -->
        <!-- <el-input v-model="searchObj.xxx" placeholder="查询条件值" v-model用来调用页面对象的相关值/ 实现双向绑定> -->
        <el-input v-model="searchObj.userId" placeholder="银行卡号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="姓名" />
      </el-form-item>
      <!-- <el-form-item>
          <el-select v-model="valueprovince" clearable filterable placeholder="办卡地区">
            <el-option
              v-for="item in provincesoptions"
              :key="item.valueprovince"
              :label="item.label"
              :value="item.valueprovince">
            </el-option>
          </el-select>
      </el-form-item> -->
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button><!-- @click绑定调用方法 -->
      <el-button type="primary" icon="el-icon-plus" @click="addUser()">添加用户</el-button><!-- @click绑定调用方法 -->
    </el-form>
    <!--用户管理表格 -->
    <el-table :data="list" stripe style="width: 100%">      <!-- list放入data中进行遍历 -->
      <el-table-column fixed prop="id" label="序号" width="100">    <!-- prop中的参数名要和后端传入的数据名一致 -->
      </el-table-column>
      <el-table-column fixed prop="userId" label="银行卡号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100">
      </el-table-column>
      <el-table-column prop="creditCards" label="持卡数量" width="200">
      </el-table-column>
      <el-table-column prop="area" label="办卡地区(中国范围)" width="120">
      </el-table-column>
      <el-table-column prop="consumptionArea" label="消费省份" width="100">
      </el-table-column>
      <el-table-column prop="consumptionAmount" label="消费金额" width="120">
      </el-table-column>
      <el-table-column prop="payMethod" label="支付方式" width="200">
      </el-table-column>
      <el-table-column prop="payTime" label="支付时间" width="200">
      </el-table-column>
      <el-table-column prop="commodityCategory" label="商品类别" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">     <!-- slot-scope为作用域插槽 -->
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="removeUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!--分页 page-size:每页记录数 total：总记录数 @current-change为页数跳转事件触发器（""内填写请求方法名）-->
  <el-pagination
  :current-page="page"
  :page-size="pageSize"
  :total="total"
  style="padding: 30px 0; text-align: center;"
  layout="total, prev, pager, next, jumper"
  @current-change="getList" /><!-- layout为分页属性：总数、上一页、页码、下一页、跳转 -->
  </div>
</template>
<script>
//引入接口定义的js文件
import backstageManage from '@/api/backstageManage'

export default {
  //定义变量和初始值
  data(){
    return{
      page:1,   //当前页
      pageSize:7,//每页显示记录数
      searchObj:{},   //条件封装对象
      list:[],     //每页数据集合
      total:0,     //总记录数
    }
  },
  created () {    //在页面渲染之前执行
      //一般调用methods定义的方法，得到数据
      this.getList()  //查询

  },
  mounted () {

  },
  methods: {    //定义方法，进行请求接口的调用
    //查询用户列表函数
    getList(page=1){    //框架中已经封装好了，页码不需要手动设置
      this.page = page
      backstageManage.getUserList(this.page,this.pageSize,this.searchObj)
      .then(response => {   //接口返回的数据
        //返回集合复制list
        this.list = response.data.records
        //总记录数
        this.total = response.data.total
        console.log(response)
      })//请求成功调用
      .catch(error => { //请求失败调用
        console.log(error)
      })
    },
    //添加用户消费记录
    addUser(){
      //路由跳转方式跳转添加表单
      // this.$router.push({ path: '@/views/backstageManage/addUser'})
      window.location.href = 'http://localhost:9528/#/backstageManage/addUser'
    },

    //删除用户消费记录
    removeUser(id){
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用接口
          backstageManage.deleteUser(id)
            .then(response => {
              //提示信息
              this.$message({
              type: 'success',
              message: '删除成功!'

            })
            //刷新页面
            this.getList(1)

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },



  },
}
</script>
<style scoped>

</style>



