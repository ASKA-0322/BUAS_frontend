<template>

  <div class="app-container" id="main" >
    <!-- 用户年龄聚合分析 -->
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
  mounted() {

    axios.get('http://172.20.10.4:8081/risk/age').then(function(response){//获取后端 用户--风险指数
            var value =response.data
            get_riskage(value)
        })

    function get_riskage(value){

      axios.get('http://172.20.10.4:8081/risk/generation').then(function(response){//获取后端 用户--风险指数
            var value1 =response.data
            get_riskgeneration(value1)
        })

        function get_riskgeneration(value1){

    // 初始化图表，设置配置项
    var myChart = echarts.init(document.getElementById('main'));

    //设置数据
     var datarisk=[];
     for (let i = 0; i < value.data.length; i++) {
         let obj=[value.data[i].age,value.data[i].indexMark]
         datarisk.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
     }

    const dataBJ =datarisk;
    // [
    //   [18, 0.0005],
    //   [30, 0.0103],
    //   [22, 0.0025],
    //   [24, 0.0037],
    //   [65, 0.0015],
    //   [44, 0.0077],
    // ];//年龄风险程度数据

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
        textStyle:{ fontSize:30},//标题字体样式,
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
            ['18~30', value1.data[0].low, value1.data[0].mid, value1.data[0].high],
            ['30~40', value1.data[1].low, value1.data[1].mid, value1.data[1].high],
            ['40~50', value1.data[2].low, value1.data[2].mid, value1.data[2].high],
            ['50~60', value1.data[3].low, value1.data[3].mid, value1.data[3].high],
            ['60~70', value1.data[4].low, value1.data[4].mid, value1.data[4].high],
            ['70~80', value1.data[5].low, value1.data[5].mid, value1.data[5].high],
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
         min:18,
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
         min:0,
         max:1,
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
           min: 0,
           max: 1,
           precision:4,
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
        }
     }
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

