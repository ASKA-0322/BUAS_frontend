<template>

  <div class="app-container" id="main">
    <!-- 用户消费预测 -->
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

        axios.get('http://172.20.10.4:8081/area/predict/consum').then(function(response){
            var value =response.data
            console.log(value)
            get_predictconsum(value)
        })
        function get_predictconsum(value){

        // 初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main'));

        var data=[];
        var yeardata=[];
       // { value: value.data[1].amount, name: value.data[1].period },
        for (let i = 0; i < value.data.length; i++) {
            let obj={value:value.data[i].amount,name:value.data[i].payTime}
            let yearobj=value.data[i].payTime
            data.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
            yeardata.push(yearobj)
        }

        let option = {
  title: {
    text: '用户消费预测',
    textStyle:{ fontSize:25},//标题字体样式,
    left:'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    show:true,
    orient: "",
    padding: [0, 10, 0, 20],
    data:yeardata
    // ["2016",
    //  "2017",
    //  "2018",
    //  "2019",
    //  "2020",
    //  "2021",
    //  "2022",
    //  "2023",
    //  "2024"]
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    name:'年份',
    data:yeardata
    // ["2016",
    //  "2017",
    //  "2018",
    //  "2019",
    //  "2020",
    //  "2021",
    //  "2022",
    //  "2023",
    //  "2024"]
  },
  yAxis: {
    type: 'value',
    name:'消费金额',
    scale:true,
    boundaryGap: [0, 0.01]
  },
  series: [
    {
      name:'消费金额',
      type: 'line',
      data:data,
              // [{ value: 17761, name: "2023年3月" },
              // { value: 18203, name: "2023年6月" },
              // { value: 26971, name: "2023年9月" },
              // { value: 25484, name: "2023年12月" },
              // { value: 37546, name: "2024年3月" },
              // { value: 35677, name: "2024年6月" },
              // { value: 51973, name: "2024年9月" },
              // { value: 49949, name: "2024年12月" },
              // { value: 72943, name: "2025年3月" },
              // { value: 69928, name: "2025年6月" },
              // { value: 94479, name: "2025年9月" },
              // { value: 97900, name: "2025年12月" },]
      markArea: {
        itemStyle: {
          color: '#90d7ec'
        },
        data: [
          [
            {
              name: '预测金额',
              xAxis: '2022'
            },
            {
              xAxis: '2024'
            }
          ]
        ]
      }
    }
  ]
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

