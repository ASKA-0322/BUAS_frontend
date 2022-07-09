<template>

  <div class="app-container" id="main">
      消费类别
  </div>

</template>

 <script>
    //引入axios
    import axios from 'axios';
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    import * as echarts from 'echarts/core';
    // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
    import {
      TitleComponent,
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent
    } from 'echarts/components';
    // 标签自动布局，全局过渡动画等特性
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
    import { CanvasRenderer } from 'echarts/renderers';

    export default {
      created () {
        // 注册必须的组件
        echarts.use([
          TitleComponent,
          TooltipComponent,
          GridComponent,
          DatasetComponent,
          TransformComponent,
          LabelLayout,
          UniversalTransition,
          CanvasRenderer,
        ]);

      },
      mounted () {
        axios.get('http://172.20.10.4:8081/pay-prefer/pay-category').then(function(response){
            var value =response.data
            console.log(value)
            get_paycategory(value)
        })
        function get_paycategory(value){
        // 初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main'));

        //循环遍历方法
            //设置数据
            var data=[];
            var catedata=[];
           // { value: value.data[1].amount, name: value.data[1].period },
            for (let i = 0; i < value.data.length; i++) {
                let obj={value:value.data[i].amount,name:value.data[i].commodityCategory}
                let cateobj=value.data[i].commodityCategory
                data.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
                catedata.push(cateobj)
            }

        let option = {
          title: {
            text: '消费类别',
            left: "center"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show:true,
            orient: "",
            padding: [0, 10, 0, 20],
            data:catedata,
                  // [ "服装鞋帽",
                  //   "日用百货",
                  //   "数码产品及其配件",
                  //   "手提包、箱包",
                  //   "妆品和美容产品",
                  //   "书籍音像制品",
                  //   "家用电器",
                  //   "食品、保健品",
                  //   "文体用品"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 100,
            max: 300,
            text: ['High', 'Low'],
            // Map the score column to color
            dimension: 0,
            inRange: {
               //color: ['#65B581', '#FFCE34', '#FD665F']
              // color: ['#bfb8da', '#a5678e']//紫色和粉色
              // color: ['#e9ca73','#995a42']//棕色和黄色
              //  color: ['#bed742','#5c7a29']//绿色
              // color: ['#cde6c7','#a3cf62','#769149','#5c7a29']
              color:['#cde6c7','#abc88b','#78a355','#5c7a29']
            }
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data:catedata,
                    // ["服装鞋帽",
                    // "日用百货",
                    // "数码产品及其配件",
                    // "手提包、箱包",
                    // "妆品和美容产品",
                    // "书籍音像制品",
                    // "家用电器",
                    // "食品、保健品",
                    // "文体用品"]
          },
          series: [
            {
              type: 'bar',
              data:data,
                    //[
                      // { value: 18203, name: "服装鞋帽" },
                      // { value: 23489, name: "日用百货" },
                      // { value: 29034, name: "数码产品及其配件" },
                      // { value: 104970, name: "手提包、箱包" },
                      // { value: 131744, name: "妆品和美容产品" },
                      // { value: 630230, name: "书籍音像制品" },
                      // { value: 200405, name: "家用电器" },
                      // { value: 191214, name: "食品、保健品" },
                      // { value: 210715, name: "文体用品" }
                    //]
          },]}
        myChart.setOption(option);    //调用工具
        }
      },
      name: '',
    }

</script>
<style scoped>
#main {
  height: 600px;
  margin-top: 50px;
}
</style>

