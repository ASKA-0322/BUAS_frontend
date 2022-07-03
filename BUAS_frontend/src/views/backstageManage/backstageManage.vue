<template>
<div class="app-container">
  <!-- 表单查询输入框 -->
  <el-form :inline="true" class="demo-form-inline">   <!-- inline表示一行显示  -->
    <el-form-item><!-- 可添加label标签 -->
      <!-- <el-input v-model="searchObj.hosnam" placeholder="姓名" v-model用来调用页面对象的相关值/> -->
      <el-input placeholder="姓名" />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="工号" />
    </el-form-item>
    <el-form-item>
         <el-input placeholder="身份证号" />
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button><!-- @click绑定调用方法 -->
     <el-button type="primary" icon="el-icon-plus" @click="getList()">添加用户</el-button><!-- @click绑定调用方法 -->
  </el-form>

  <!--用户管理表格 -->
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column fixed prop="id" label="用户ID" width="100">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="gender" label="性别" width="100">
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="100">
    </el-table-column>
    <el-table-column prop="idNumber" label="身份证号" width="200">
    </el-table-column>
    <el-table-column prop="jobNumber" label="工号" width="120">
    </el-table-column>
    <el-table-column prop="position" label="职务" width="100">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="120">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="200">
    </el-table-column>
    <el-table-column prop="authority" label="权限" width="200">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页 page-size:每页记录数 total：总记录数 @current-change为页数跳转事件触发器（""内填写请求方法名）-->
  <el-pagination
  :current-page="1"
  :page-size="limit"
  :total="100"
  style="padding: 30px 0; text-align: center;"
  layout="total, prev, pager, next, jumper"
  @current-change="fetchData" />

</div>
</template>

<script>
/* 先写死数据 请求参考基本属性分析的性别聚合分析vue文件编写 */
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        tableData: [{
          id: '165465',
          name: '周杰伦',
          gender: '男',
          age: '43',
          idNumber: '4531313541321333',
          jobNumber: '19790118',
          position:'总经理',
          phone:'15545621548',
          email:'905843@163.com',
          authority:'S'
        }, {
          id: '465131',
          name: '林俊杰',
          gender: '男',
          age: '42',
          idNumber: '4123134631321313',
          jobNumber: '200333',
          position:'业务经理',
          phone:'18615165215',
          email:'121513@163.com',
          authority:'A',
        }, {
          id: '264641',
          name: '陶喆',
          gender: '男',
          age: '48',
          idNumber: '4324335133513135',
          jobNumber: '200333',
          position:'销售经理',
          phone:'16545654565',
          email:'461561@qq.com',
          authority:'S'
        }, {
          id: '165484',
          name: '蔡依林',
          gender: '女',
          age: '38',
          idNumber: '4231321313513213',
          jobNumber: '200333',
          position:'柜员',
          phone:'15545621548',
          email:'121513@163.com',
          authority:'B'
        }]
      }
    }
  }
</script>
