<template>
  <div class="app-container" id="main">
  </div>
</template>
<script>
  import * as echarts from "echarts"
  import {mapData} from "../../assets/404_images/mapData.js"

  // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  } from 'echarts/components';
  // 标签自动布局，全局过渡动画等特性
  import {
    LabelLayout,
    UniversalTransition
  } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import {
    CanvasRenderer
  } from 'echarts/renderers';

  export default {
    created() {
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
      let myChart = echarts.init(document.getElementById('main'));
      //注册当前使用的地图名
      echarts.registerMap("chinaMap", mapData)
      let option = {
        title: {
          text: "支付地点分析",
          textStyle:{fontSize:30},
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} "
        },
        visualMap: {
          min: 0,
          max: 100,
          text: ['High', 'Low'],
          calculable: true,
          seriesIndex: [0], //这个对应的是series的数组下标
          inRange: {
            color: ["#00467F", "#A5CC82"]
          }
        },
        geo: { //地理坐标组件
          show: true,
          type: "map",
          map: "chinaMap"
        }
      };
      myChart.setOption(option);
    },
  };
</script>
<style scoped>
  #main {
    height: 500px;
    margin-top: 50px;
  }
</style>
