
<template>
  <div>
    <div style="position:absolute;left:1300px;top:34px">
      <el-button id="change" icon="el-icon-refresh" circle type="text" color="#c8c8c8"></el-button>
    </div>
    <div id="cmap" class="chart-container" style="width:1280px; height:700px;margin:auto;top:40px;"></div>
    <div style="height:80px"></div>
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
    axios.get('http://172.20.10.4:8081/area/hold-card').then(function(response){
            var value =response.data    //用value获取响应数据
            console.log(value)
            get_cardArea(value)         //调用后端数据配置图表的函数
        })
    function get_cardArea(value){   //传入value
    let myChart = echarts.init(document.getElementById('cmap'));
    //设置数据
    var data=[];
    for (let i = 0; i < value.data.length; i++) {
      let obj={name:value.data[i].area,value:value.data[i].amount}
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
                id:"amount",
                name: "办卡次数",
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
                // [
                //     {
                //         name: "广东",
                //         value: 288
                //     },
                //     {
                //         name: "北京",
                //         value: 3102
                //     },
                //     {
                //         name: "江苏",
                //         value: 1902
                //     },
                //     {
                //         name: "浙江",
                //         value: 1502
                //     },
                //     {
                //         name: "上海",
                //         value: 3402
                //     },
                //     {
                //         name: "四川",
                //         value: 2802
                //     },
                //     {
                //         name: "陕西",
                //         value: 302
                //     },
                //     {
                //         name: "湖北",
                //         value: 1202
                //     },
                //     {
                //         name: "山东",
                //         value: 2402
                //     },
                //     {
                //         name: "天津",
                //         value: 2702
                //     },
                //     {
                //         name: "重庆",
                //         value: 402
                //     },
                //     {
                //         name: "湖南",
                //         value: 1102
                //     },
                //     {
                //         name: "辽宁",
                //         value: 502
                //     },
                //     {
                //         name: "福建",
                //         value: 802
                //     },
                //     {
                //         name: "黑龙江",
                //         value: 1002
                //     },
                //     {
                //         name: "河南",
                //         value: 1602
                //     },
                //     {
                //         name: "河北",
                //         value: 1702
                //     },
                //     {
                //         name: "广西",
                //         value: 2102
                //     },
                //     {
                //         name: "吉林",
                //         value: 2902
                //     },
                //     {
                //         name: "云南",
                //         value: 3302
                //     },
                //     {
                //         name: "江西",
                //         value: 1802
                //     },
                //     {
                //         name: "山西",
                //         value: 2302
                //     },
                //     {
                //         name: "贵州",
                //         value: 602
                //     },
                //     {
                //         name: "台湾",
                //         value: 3002
                //     },
                //     {
                //         name: "甘肃",
                //         value: 902
                //     },
                //     {
                //         name: "内蒙古",
                //         value: 3202
                //     },
                //     {
                //         name: "新疆",
                //         value: 2002
                //     },
                //     {
                //         name: "香港",
                //         value: 102
                //     },
                //     {
                //         name: "海南",
                //         value: 1402
                //     },
                //     {
                //         name: "宁夏",
                //         value: 2602
                //     },
                //     {
                //         name: "安徽",
                //         value: 2502
                //     },
                //     {
                //         name: "青海",
                //         value: 202
                //     },
                //     {
                //         name: "西藏",
                //         value: 702
                //     },
                //     {
                //         name: "澳门",
                //         value: 1002
                //     }
                // ],
                roam: false,
                zoom: 1,
                showLegendSymbol: false,
                emphasis: {},
                animationDurationUpdate: 1000,
                universalTransition: true
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
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'right',
          top: 'top',
          feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
          }
        },
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
                text: "办卡地区分布图",
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
            max: 600,
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
            bottom:80,
            pieces: [
                {
                    min: 0,
                    max: 100,
                    label: "100以下",
                    color: "#ECF5FF"
                },
                {
                    min: 100,
                    max: 200,
                    label: "100-200",
                    color: "#D2E9FF"
                },
                {
                    min: 200,
                    max: 300,
                    label: "200-300",
                    color: "#ACD6FF"
                },
                {
                    min: 300,
                    max: 400,
                    label: "300-400",
                    color: "#84C1FF"
                },
                {
                    min: 400,
                    max: 500,
                    label: "400-500",
                    color: "#46A3FF"
                },
                {
                    min: 500,
                    max: 600,
                    label: "500-600",
                    color: "#198dff"
                },
                {
                    min: 600,
                    label: "600以上",
                    color: "#0073e6"
                }
            ]
        }
}

const barOption = {
    title: {
      text: "各省份办卡次数",
      textStyle:{ fontSize:30},//标题字体样式
      left: "center"
    },
    yAxis: {
      type: 'value',
      name:'办卡次数'
    },
    xAxis: {
      name:'省份',
      type: 'category',
      axisLabel: {
        rotate: 30
      },
      data: data.map(function (item) {
        return item.name;
      })
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'right',
      top: 'top',
      feature: {
        dataView: { readOnly: true },
        saveAsImage: {},
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    animationDurationUpdate: 1000,
    series: {
      type: 'bar',
      itemStyle:{
        opacity: 0.9,
        shadowBlur: 0.5,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.9)'
      },
      id: 'amount',
      data: data.map(function (item) {
        return item.value;
      }),
      universalTransition: true
    },
    grid:{
      bottom: "60",
      containLabel: true
    },
    visualMap: {
            show: true,
            type: "piecewise",
            min: 0,
            max: 600,
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
            bottom:80,
            pieces: [
                {
                    min: 0,
                    max: 100,
                    label: "100以下",
                    color: "#ECF5FF"
                },
                {
                    min: 100,
                    max: 200,
                    label: "100-200",
                    color: "#D2E9FF"
                },
                {
                    min: 200,
                    max: 300,
                    label: "200-300",
                    color: "#ACD6FF"
                },
                {
                    min: 300,
                    max: 400,
                    label: "300-400",
                    color: "#84C1FF"
                },
                {
                    min: 400,
                    max: 500,
                    label: "400-500",
                    color: "#46A3FF"
                },
                {
                    min: 500,
                    max: 600,
                    label: "500-600",
                    color: "#198dff"
                },
                {
                    min: 600,
                    label: "600以上",
                    color: "#0073e6"
                }
            ]
        }
  };

   data.sort(function (a, b) {
    return a.value - b.value;
  });

  let currentOption = option;
  myChart.setOption(option);

// 图表间的切换
  let btnChange = document.querySelector('#change')
  btnChange.onclick = function(){
    currentOption = currentOption === option ? barOption : option;
    myChart.setOption(currentOption, true);
  }


//myChart.setOption(option);
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

<style>
.el-icon-refresh{
  color: #c8c8c8;
  font-size: 20px;
}
</style>
