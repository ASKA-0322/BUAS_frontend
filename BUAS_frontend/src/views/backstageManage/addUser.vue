<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="银行卡号">
        <el-input placeholder="请输入8位银行卡号" v-model="bankUser.userId" maxlength="8" minlength="8" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')">></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="请输入用户姓名" v-model="bankUser.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <!-- <el-radio v-model="bankUser.sex" label="男">男</el-radio>
        <el-radio v-model="bankUser.sex" label="女">女</el-radio> -->
        <el-radio-group v-model="bankUser.sex" fill="#4EBD8D">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input placeholder="请输入用户年龄" v-model="bankUser.age"></el-input>
      </el-form-item>
      <el-form-item label="持卡数量">
        <el-input placeholder="请输入用户持卡数量" v-model="bankUser.creditCards"></el-input>
      </el-form-item>
      <el-form-item label="办卡地区（中国范围）">
        <el-input v-model="bankUser.area"></el-input>
      </el-form-item>
      <el-form-item label="消费省份">
        <el-input v-model="bankUser.consumptionArea"></el-input>
      </el-form-item>
      <el-form-item label="消费金额">
        <el-input v-model="bankUser.consumptionAmount"></el-input>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-input v-model="bankUser.payMethod"></el-input>
      </el-form-item>
      <el-form-item label="支付时间">
        <el-input v-model="bankUser.payTime"></el-input>
      </el-form-item>
      <el-form-item label="商品类别">
        <el-input v-model="bankUser.commodityCategory"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addOrUpdate">保存</el-button>
        <el-button type="primary" @click="cancelAdd">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入接口定义的js文件
import backstageManage from '@/api/backstageManage'
  export default {
    data() {
        return {
          bankUser:{}
        }
      },
    created(){
      //获取路由id值
      //调用接口得到用户消费记录
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getuserById(id)
        // alert(id)
      }
    },
    mounted(){
      onSubmitAdd()
      update()
    },
    methods: {
      //根据id查询
      getuserById(id){
        backstageManage.getUserById(id)
        .then(response =>{
          this.bankUser = response.data
        })
      },
      //提交添加方法
      onSubmitAdd() {
        backstageManage.addUserConsume(this.bankUser)
        .then(response =>{
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
            })
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({ path: '../backstageManage/backstageManage'})
        })
      },
      //修改
      update() {
        backstageManage.updateUser(this.bankUser)
        .then(response =>{
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
            })
          //跳转列表页面，使用路由跳转方式实现
          this.$router.push({ path: '../backstageManage'})
        })
      },
      addOrUpdate(){
        // 判断添加还是修改(利用页面对象有无id值)
        if(!this.bankUser.id){    //没有id 添加
          this.onSubmitAdd();
        }else{    //有id值 修改
          this.update();
        }
      },
      cancelAdd(){
        this.$router.push({ path: '../backstageManage'})
      }
    },

  }
</script>
<style scoped>

</style>


