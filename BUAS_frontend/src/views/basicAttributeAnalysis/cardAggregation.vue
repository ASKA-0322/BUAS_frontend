<template>

  <div class="app-container" id="main">
    用户持卡聚合分析
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
          BarChart,
          LabelLayout,
          UniversalTransition,
          CanvasRenderer,
        ]);

      },
      mounted () {   //钩子函数 用于页面渲染之后处理数据
        axios.get('http://172.20.10.4:8081/base/cards/').then(function(response){
            var value =response.data    //用value获取响应数据
            console.log(value)
            get_cards(value)         //调用后端数据配置图表的函数
        })
        function get_cards(value){   //传入value
        // 初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main'));
        let option ={
          title: {
          text: "用户持卡聚合分析",
          left: "center"
        },
        tooltip: {      //图例提示组件
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {     //图例筛选组件 跟series配合使用 data要与series的name一致
          orient: "vertical",
          left: "left",
          data: [
            "1张",
            "2张",
            "3张",
            "4张",
            "5张",
            "6张",
            "7张",
            "8张",
            "9张",
            "10张",
            "10张以上"
          ]
        },
        series: [
          {
            name: "用户持卡数",
            type: "pie",
            radius: [80, 200],
            center: ["50%", "60%"],
            itemStyle: {
              borderRadius: 5
            },
            data: [
              { value: value.data[10].amount, name: value.data[10].cards },
              { value: value.data[2].amount, name: value.data[2].cards },
              { value: value.data[3].amount, name: value.data[3].cards },
              { value: value.data[4].amount, name: value.data[4].cards },
              { value: value.data[5].amount, name: value.data[5].cards },
              { value: value.data[6].amount, name: value.data[6].cards },
              { value: value.data[7].amount, name: value.data[7].cards },
              { value: value.data[8].amount, name: value.data[8].cards },
              { value: value.data[9].amount, name: value.data[9].cards },
              { value: value.data[0].amount, name: value.data[0].cards },
              { value: value.data[1].amount, name: value.data[1].cards },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
        }
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

