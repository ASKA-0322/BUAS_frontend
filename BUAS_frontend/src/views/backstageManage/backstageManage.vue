<template>
<div class="app-container">
  <!-- 表单查询输入框 -->
  <el-form :inline="true" class="demo-form-inline">   <!-- inline表示一行显示  -->
    <el-form-item><!-- 可添加label标签 -->
      <!-- <el-input v-model="searchObj.hosnam" placeholder="姓名" v-model用来调用页面对象的相关值/> -->
      <el-input placeholder="银行卡号" />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="用户姓名" />
    </el-form-item>
    <el-form-item>
         <el-input placeholder="办卡地区" />
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button><!-- @click绑定调用方法 -->
     <el-button type="primary" icon="el-icon-plus" @click="getList()">添加用户</el-button><!-- @click绑定调用方法 -->
  </el-form>
  用户总数: {{ 1820 }}
  <!--用户管理表格 -->
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column fixed prop="id" label="消费记录id" width="100">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="100">
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="100">
    </el-table-column>
    <el-table-column prop="credit_cards" label="持卡数量" width="200">
    </el-table-column>
    <el-table-column prop="area" label="办卡地区(中国范围)" width="120">
    </el-table-column>
    <el-table-column prop="consumption_area" label="消费省份" width="100">
    </el-table-column>
    <el-table-column prop="consumption_amount" label="消费金额" width="120">
    </el-table-column>
    <el-table-column prop="pay_method" label="支付方式" width="200">
    </el-table-column>
    <el-table-column prop="pay_time" label="支付时间" width="200">
    </el-table-column>
    <el-table-column prop="commodity_category" label="商品类别" width="100">
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
  :current-page="page"
  :page-size="limit"
  :total="100"
  style="padding: 30px 0; text-align: center;"
  layout="total, prev, pager, next, jumper"
  @current-change="fetchData" /><!-- layout为分页属性：总数、上一页、页码、下一页、跳转 -->

</div>
</template>

<script>
import { number } from 'echarts/core';
import Axios from 'axios';
  export default {
    props:{
      total:{
        type:Number,
        default:100
      },
      pageSize:{
        type:Number
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      getList(){


      }
    },
    data() {
      return {
        listLoading: false,
        list: null, //查询之后接口返回集合
        page: 1, //当前页
        limit: 10, //每页显示的记录数
        total: 100, //总记录数
        sizer: {},//
        userList:{},
        year: [],



       /*  tableData: [{
          id: '165465',
          name: '周杰伦',
          sex: '男',
          age: '43',
          credit_cards: '4531313541321333',
          area: '19790118',
          consumption_area:'总经理',
          consumption_amount:'15545621548',
          pay_method:'905843@163.com',
          pay_time:'S',
          commodity_category:'文体用品'
        }, {
          id: '465131',
          name: '林俊杰',
          sex: '男',
          age: '42',
          credit_cards: '4123134631321313',
          area: '200333',
          consumption_area:'业务经理',
          consumption_amount:'18615165215',
          pay_method:'121513@163.com',
          pay_time:'A',
          commodity_category:'文体用品'
        }, {
          id: '264641',
          name: '陶喆',
          sex: '男',
          age: '48',
          credit_cards: '4324335133513135',
          area: '200333',
          consumption_area:'销售经理',
          consumption_amount:'16545654565',
          pay_method:'461561@qq.com',
          pay_time:'S',
          commodity_category:'文体用品'
        }, {
          id: '165484',
          name: '蔡依林',
          sex: '女',
          age: '38',
          credit_cards: '4231321313513213',
          area: '200333',
          consumption_area:'柜员',
          consumption_amount:'15545621548',
          pay_method:'121513@qq.com',
          pay_time:'B',
          commodity_category:'文体用品'
        }, {
          id: '165791',
          name: '罗大佑',
          sex: '男',
          age: '67',
          credit_cards: '4531354313313213',
          area: '19790118',
          consumption_area:'柜员',
          consumption_amount:'15545621548',
          pay_method:'964321@163.com',
          pay_time:'B',
          commodity_category:'文体用品'
        }, {
          id: '165760',
          name: '张学友',
          sex: '男',
          age: '60',
          credit_cards: '4535231311334138',
          area: '19790118',
          consumption_area:'项目经理',
          consumption_amount:'15545621548',
          pay_method:'6547913@qq.com',
          pay_time:'S',
          commodity_category:'文体用品'
        }, {
          id: '249637',
          name: '梁静茹',
          sex: '女',
          age: '44',
          credit_cards: '4313553141321337',
          area: '200333',
          consumption_area:'资深员工',
          consumption_amount:'15545621548',
          pay_method:'149876@qq.com',
          pay_time:'A',
          commodity_category:'文体用品'
        }, {
          id: '497135',
          name: '邓紫棋',
          sex: '女',
          age: '30',
          credit_cards: '4553131354531049',
          area: '19790118',
          consumption_area:'资深员工',
          consumption_amount:'15545621548',
          pay_method:'921053@163.com',
          pay_time:'A',
          commodity_category:'文体用品'
        }, ] */
      }
    }
  }
</script>
