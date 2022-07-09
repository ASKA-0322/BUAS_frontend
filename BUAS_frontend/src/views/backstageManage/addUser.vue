<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="序号">
        <el-input v-model="bankUser.id"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input v-model="bankUser.userId"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="bankUser.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="bankUser.sex"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="bankUser.age"></el-input>
      </el-form-item>
      <el-form-item label="持卡数量">
        <el-input v-model="bankUser.creditCards"></el-input>
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
        <el-button type="primary" @click="onSubmitAdd">添加</el-button>
        <el-button>取消</el-button>
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
        onSubmitAdd()
      },
    methods: {
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
          this.router.push({ path: '../backstageManage/backstageManage'})

        })
      }
    },
    created () {

    }

  }
</script>
<style scoped>

</style>


