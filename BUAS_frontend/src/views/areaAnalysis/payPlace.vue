
<template>
  <div>
    <div style="position:absolute;left:1300px;top:73px">
      <el-button id="change" icon="el-icon-refresh" circle type="text" color="#c8c8c8"></el-button>
    </div>

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
                id:"amount",
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
                // [
                //     {
                //         name: "广东",
                //         value: value.data[22].amount
                //     },
                //     {
                //         name: "北京",
                //         value: value.data[31].amount
                //     },
                //     {
                //         name: "江苏",
                //         value: value.data[19].amount
                //     },
                //     {
                //         name: "浙江",
                //         value: value.data[15].amount
                //     },
                //     {
                //         name: "上海",
                //         value: value.data[34].amount
                //     },
                //     {
                //         name: "四川",
                //         value: value.data[28].amount
                //     },
                //     {
                //         name: "陕西",
                //         value: value.data[3].amount
                //     },
                //     {
                //         name: "湖北",
                //         value: value.data[12].amount
                //     },
                //     {
                //         name: "山东",
                //         value: value.data[24].amount
                //     },
                //     {
                //         name: "天津",
                //         value: value.data[27].amount
                //     },
                //     {
                //         name: "重庆",
                //         value: value.data[4].amount
                //     },
                //     {
                //         name: "湖南",
                //         value: value.data[11].amount
                //     },
                //     {
                //         name: "辽宁",
                //         value: value.data[5].amount
                //     },
                //     {
                //         name: "福建",
                //         value: value.data[8].amount
                //     },
                //     {
                //         name: "黑龙江",
                //         value: value.data[0].amount
                //     },
                //     {
                //         name: "河南",
                //         value: value.data[16].amount
                //     },
                //     {
                //         name: "河北",
                //         value: value.data[17].amount
                //     },
                //     {
                //         name: "广西",
                //         value: value.data[21].amount
                //     },
                //     {
                //         name: "吉林",
                //         value: value.data[29].amount
                //     },
                //     {
                //         name: "云南",
                //         value: value.data[33].amount
                //     },
                //     {
                //         name: "江西",
                //         value: value.data[18].amount
                //     },
                //     {
                //         name: "山西",
                //         value: value.data[23].amount
                //     },
                //     {
                //         name: "贵州",
                //         value: value.data[6].amount
                //     },
                //     {
                //         name: "台湾",
                //         value: value.data[30].amount
                //     },
                //     {
                //         name: "甘肃",
                //         value: value.data[9].amount
                //     },
                //     {
                //         name: "内蒙古",
                //         value: value.data[32].amount
                //     },
                //     {
                //         name: "新疆",
                //         value: value.data[20].amount
                //     },
                //     {
                //         name: "香港",
                //         value: value.data[1].amount
                //     },
                //     {
                //         name: "海南",
                //         value: value.data[14].amount
                //     },
                //     {
                //         name: "宁夏",
                //         value: value.data[26].amount
                //     },
                //     {
                //         name: "安徽",
                //         value: value.data[25].amount
                //     },
                //     {
                //         name: "青海",
                //         value: value.data[2].amount
                //     },
                //     {
                //         name: "西藏",
                //         value: value.data[7].amount
                //     },
                //     {
                //         name: "澳门",
                //         value: value.data[10].amount
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
            max: 100,
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
                    min: 0,
                    max: 60,
                    label: "60以下",
                    color: "#FFBCAF"
                },
                {
                    min: 60,
                    max: 70,
                    label: "60-70",
                    color: "#FCA18F "
                },
                {
                    min: 70,
                    max: 80,
                    label: "70-80",
                    color: "#FB947D"
                },
                {
                    min: 80,
                    max: 90,
                    label: "80-90",
                    color: "#F67764"
                },
                {
                    min: 90,
                    max: 100,
                    label: "90-100",
                    color: "#F06154"
                },
                {
                    min: 100,
                    label: "100以上",
                    color: " #DC3A47"
                }
            ]
        }
}

const barOption = {
    title: {
      text: "各省份支付次数",
      left: "center"
    },
    yAxis: {
      type: 'value',
      name:'支付次数'
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
      id: 'amount',
      data: data.map(function (item) {
        return item.value;
      }),
      universalTransition: true
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

//图表定时自动切换
  // setInterval(function () {
  //   currentOption = currentOption === option ? barOption : option;
  //   myChart.setOption(currentOption, true);
  // }, 5000);

// myChart.setOption(option);
    }//function get_payPlace
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
