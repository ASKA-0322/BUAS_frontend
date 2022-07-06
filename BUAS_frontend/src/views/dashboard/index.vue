<template>
  <div class="dashboard-container">
    <div>图片</div>
    <div class="dashboard-bottomText">
      <p style="line-height: 5px;">Copyright © 2022 Bank Inc. 保留所有权利。</p>
      <p style="line-height: 5px;">京ICP备10214630 营业执照 无线电发射设备销售备案编号11201910351200</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-bottomText {
    width: 100%;
    height: 100%;
    color:  #6E6E73;
    font-size: 10px;
    line-height: 46px;
    margin-top: 650px;
    text-align: center;
  }
}
</style>
