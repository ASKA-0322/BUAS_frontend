<template>
  <div class="app-container" id="main">
    风险性别特征
  </div>
</template>
<script>
    //引入axios
    import axios from 'axios';
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    import * as echarts from 'echarts/core';
    // 引入饼图图表，图表后缀都为 Chart
    import { PieChart } from 'echarts/charts';
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
          PieChart,
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

        axios.get('http://172.20.10.4:8081/risk/sex').then(function(response){//获取后端 用户--风险指数
            var value =response.data
            get_risksex(value)
        })

        function get_risksex(value){
        // 初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main'));
        const itemStylelow = {
          color:'#f5c7c7',
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.1)'
        };
        const itemStylemid = {
          color:'#eb8f8f',
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
        };
        const itemStylehigh = {
          color:'#dd4444',
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.9)'
        };
        let option =
        {
          grid:{
            left:"20%",
            right:"20%"
          },
          title: {
            text: "风险性别特征",
            left: "center"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: [
              "低风险",
              "中风险",
              "高风险",
            ]
          },
          tooltip: {},
          dataset: {
            source: [
              ['sex', '低风险', '中风险', '高风险'],
              ['男性', value.data[1].low, value.data[1].mid, value.data[1].high],
              ['女性', value.data[0].low, value.data[0].mid, value.data[0].high],
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [
            { type: 'bar' ,itemStyle: itemStylelow,},
            { type: 'bar' ,itemStyle: itemStylemid,},
            { type: 'bar' ,itemStyle: itemStylehigh,}]
        };
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


