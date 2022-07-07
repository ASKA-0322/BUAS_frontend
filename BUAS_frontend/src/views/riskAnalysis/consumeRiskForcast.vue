<template>
  <div class="app-container" id="main">
    消费风险分析
  </div>
</template>
<script>

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
      mounted () {
        // 初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main'));
        let option ={
          title: {
          text: "消费风险分析",
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
            "低风险",
            "中风险",
            "高风险",
          ]
        },
        series: [
          {
            name: "风险等级",
            type: "pie",
            roseType: 'radius',
            radius: ["20%", "60%"],
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "低风险" },
              { value: 310, name: "中风险" },
              { value: 234, name: "高风险" },
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


