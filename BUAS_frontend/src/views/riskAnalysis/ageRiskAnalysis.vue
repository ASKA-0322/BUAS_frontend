<template>

  <div class="app-container" id="main" >
    用户年龄聚合分析
  </div>

</template>

 <script>

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
           PieChart,
           TooltipComponent,
           GridComponent,
           DatasetComponent,
           TransformComponent,
           BarChart,
           LabelLayout,
           UniversalTransition,
           CanvasRenderer,
         ]);

       },
  mounted() {
    // 初始化图表，设置配置项
    var myChart = echarts.init(document.getElementById('main'));
    const dataBJ = [
      [18, 98],
      [30, 34],
      [22, 49],
      [24, 46],
      [65, 73],
      [44, 30],
    ];//年龄风险程度数据

const schema = [
  { name: 'age', index: 0, text: '年龄' },
  { name: 'risk_grade', index: 1, text: '风险程度' }
];
const itemStyle = {
  opacity: 0.8,
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: 'rgba(0,0,0,0.3)'
};
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
     let option = {
      title: {
        text: "风险年龄分析",
        left: 'center',
        top: 0
      },
       color: ['#dd4444'],
       legend: {
            orient: "vertical",
            left: "right",
            top:"10%",
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
            ['18~30', 3215, 8518, 9317],
            ['30~40', 8351, 7314, 5511],
            ['40~50', 8624, 6512, 8215],
            ['50~60', 7214, 5319, 3911],
            ['60~70', 8614, 6512, 8215],
            ['70~80', 7214, 5319, 3911],
          ]//各年龄段三个风险等级数据
        },
       grid: [{
         left: '5%',
         top: '18%',
         width: '35%',
         bottom: '15%'
       },
       {
        right: '5%',
         top: '18%',
         width: '40%',
         bottom: '15%'
      },
      ],
       xAxis: [{
         type: 'value',
         name: '年龄',
         nameGap: 10,
         nameTextStyle: {
           fontSize: 13
         },
         gridIndex: 0,
         min:10,
         max: 80,
         splitLine: {
           show: false
         }
       },
        {
          name: '年龄段',
          nameGap: 10,
         nameTextStyle: {
           fontSize: 13
         },
          type: 'category',
          gridIndex: 1,
        },
       ],
       yAxis: [{
         type: 'value',
         name: '风险程度',
         nameLocation: 'end',
         nameGap: 10,
         nameTextStyle: {
           fontSize: 16
         },
         min:10,
         max:100,
         gridIndex:0,
         splitLine: {
           show: false
         }
       },
       {
        name: '人数',
        nameLocation: 'end',
         nameGap: 10,
         nameTextStyle: {
           fontSize: 16
         },
        gridIndex: 1,
       },
       ],
       visualMap: [
         {

          show:true,
           left: '42%',
           top:'12.5%',
           dimension: 1,
           min: 10,
           max: 100,
           itemHeight: 380,
           seriesIndex: 0,
           text: ['明暗：风险程度'],
           textGap: 10,
           inRange: {
             colorLightness: [0.9, 0.5]
           },
           outOfRange: {
             color: ['rgba(255,255,255,0.4)']
           },
           controller: {
             inRange: {
               color: ['#c23531']
             },
             outOfRange: {
               color: ['#999']
             }
           }
         }
       ],
       series: [
         {
           name: '风险指数',
           type: 'scatter',
           xAxisIndex: 0,
           yAxisIndex: 0,
           itemStyle: itemStyle,
           data: dataBJ
         },
         {
           name: '低风险',
           type: 'bar',
           itemStyle: itemStylelow,
           xAxisIndex: 1,
           yAxisIndex: 1,
         },
         {
           name: '中风险',
           type: 'bar',
           itemStyle: itemStylemid,
           xAxisIndex: 1,
           yAxisIndex: 1,
         },
         {
           name: '高风险',
           type: 'bar',
           itemStyle: itemStylehigh,
           xAxisIndex: 1,
           yAxisIndex: 1,
         },
       ]
     }
     myChart.setOption(option);    //调用工具
   },
   name: '',
 }

 </script>
<style scoped>
#main {
  height: 600px;
  margin-top: 50px;
  width: auto;
}
</style>

