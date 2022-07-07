
<template>
  <div>
    <!-- 专利国内分布图 -->
    <div id="cmap" class="chart-container" style="width:1280px; height:768px;margin:auto;top:80px;"></div>
    <div style="height:78px"></div>
  </div>
</template>
<script>
//引入axios
import axios from 'axios';
import * as echarts from "echarts";
import 'echarts/map/js/china.js';
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
    axios.get('http://172.20.10.4:8081/area/pay-place').then(function(response){
            var value =response.data    //用value获取响应数据
            console.log(value)
            get_payPlace(value)         //调用后端数据配置图表的函数
        })
    function get_payPlace(value){   //传入value
    let myChart = echarts.init(document.getElementById('cmap'));
    //设置数据
    var data=[];
    for (let i = 0; i < value.data.length; i++) {
        let obj={name:value.data[i].consumptionArea,value:value.data[i].amount}
        data.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
    }
    let option={
        animation: true,
        animationThreshold: 2000,
        animationDuration: 1000,
        animationEasing: "cubicOut",
        animationDelay: 0,
        animationDurationUpdate: 300,
        animationEasingUpdate: "cubicOut",
        animationDelayUpdate: 0,
        color: [
            "#008B8B"
        ],
        series:[   //数据系列
            {
                type: "map",
                name: "支付次数",
                label: {
                    show: true,
                    position: "inside",
                    distance: "inside",
                    margin: 8,
                    fontSize: 16,
                    fontStyle: "normal"
                },
                mapType: "china",
                data:data,
                roam: false,
                zoom: 1,
                showLegendSymbol: false,
                emphasis: {}
            }
        ],
        legend:[   //图例
            {
                data: [
                    "专利数"
                ],
                selected: {
                    "专利数": true
                },
                show: false,
                padding: 5,
                itemGap: 10,
                itemWidth: 25,
                itemHeight: 14,
                textStyle: {
                    fontFamily: "Arial",
                    fontSize: 20
                }
            }
        ],
        tooltip:{
            show: true,
            trigger: "item",
            triggerOn: "mousemove|click",
            axisPointer: {
                type: "line"
            },
            showContent: true,
            alwaysShowContent: false,
            showDelay: 0,
            hideDelay: 100,
            textStyle: {
                fontSize: 14
            },
            borderWidth: 0,
            padding: 5
        },
        title: [
            {
                text: "支付地点分布图",
                padding: 5,
                itemGap: 10,
                textStyle: {
                    fontFamily: "Arial",
                    fontSize: 30
                },
                subtextStyle: {
                    fontFamily: "Arial",
                    fontSize: 20
                }
            }
        ],
        visualMap: {
            show: true,
            type: "piecewise",
            min: 0,
            max: 2000,
            inRange: {
                color: [
                    "#50a3ba",
                    "#eac763",
                    "#d94e5d"
                ]
            },
            calculable: true,
            inverse: false,
            splitNumber: 5,
            orient: "vertical",
            showLabel: true,
            itemWidth: 20,
            itemHeight: 14,
            borderWidth: 0,
            pieces: [
                {
                    max: 10,
                    label: "10\u4ee5\u4e0b",
                    color: "#FECAC0"
                },
                {
                    min: 10,
                    max: 50,
                    label: "10-100",
                    color: "#FFBCAF"
                },
                {
                    min: 50,
                    max: 100,
                    label: "100-200",
                    color: "#FCA18F "
                },
                {
                    min: 100,
                    max: 500,
                    label: "200-500",
                    color: "#FB947D"
                },
                {
                    min: 500,
                    max: 1000,
                    label: "500-100",
                    color: "#F67764"
                },
                {
                    min: 1000,
                    max: 5000,
                    label: "1000-5000",
                    color: "#F06154"
                },
                {
                    min: 5000,
                    label: "5000\u4ee5\u4e0a",
                    color: " #DC3A47"
                }
            ]
        }
}
myChart.setOption(option);
    }
    },
    /* 预留可视化功能拓展组件 */
  components: {
 },
  name: '',
  data() {
    return {
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    },
}

</script>
