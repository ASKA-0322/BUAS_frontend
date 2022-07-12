<template>
<div>
  <div style="position:absolute;left:15px;top:10px">
    <el-select clearable v-model="area" @change="selectChanged" placeholder="请选择省份">
      <el-option
        v-for="item in option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>

  <div class="app-container" id="main">
  </div>
</div>
</template>

<script>

//引入接口定义的js文件
  import consumeAreaForecast from '@/api/consumeAreaForecast'
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
  import {
    LabelLayout,
    UniversalTransition
  } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import {
    CanvasRenderer
  } from 'echarts/renderers';

  export default {
    data(){
      return{
        area:'',   //条件变量
        list:[],
        option: [
            {
              value: "北京",
              label: "北京",
            },
            {
              value: "天津",
              label: "天津",
            },
            {
              value: "上海",
              label: "上海",
            },
            {
              value: "重庆",
              label: "重庆",
            },
            {
              value: "河北",
              label: "河北",
            },
            {
              value: "河南",
              label: "河南",
            },
            {
              value: "云南",
              label: "云南",
            },
            {
              value: "辽宁",
              label: "辽宁",
            },
            {
              value: "黑龙江",
              label: "黑龙江",
            },
            {
              value: "湖南",
              label: "湖南",
            },
            {
              value: "安徽",
              label: "安徽",
            },
            {
              value: "山东",
              label: "山东",
            },
            {
              value: "新疆",
              label: "新疆",
            },
            {
              value: "江苏",
              label: "江苏",
            },
            {
              value: "浙江",
              label: "浙江",
            },
            {
              value: "江西",
              label: "江西",
            },
            {
              value: "湖北",
              label: "湖北",
            },
            {
              value: "广西",
              label: "广西",
            },
            {
              value: "甘肃",
              label: "甘肃",
            },
            {
              value: "山西",
              label: "山西",
            },
            {
              value: "内蒙古",
              label: "内蒙古",
            },
            {
              value: "陕西",
              label: "陕西",
            },
            {
              value: "吉林",
              label: "吉林",
            },
            {
              value: "福建",
              label: "福建",
            },
            {
              value: "广东",
              label: "广东",
            },
            {
              value: "青海",
              label: "青海",
            },
            {
              value: "西藏",
              label: "西藏",
            },
            {
              value: "四川",
              label: "四川",
            },
            {
              value: "宁夏",
              label: "宁夏",
            },
            {
              value: "海南",
              label: "海南",
            },
            {
              value: "台湾",
              label: "台湾",
            },
            {
              value: "香港",
              label: "香港",
            },
            {
              value: "澳门",
              label: "澳门",
            },
            {
              value: "贵州",
              label: "贵州",
            }
          ]
      }
    },
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
      // 初始化图表，设置配置项


    },
    methods: {
    // 选框省份选择时发送新的请求
    selectChanged(){
      consumeAreaForecast.getProvince(this.area)
      .then(response => {   //接口返回的数据
        console.log(response)
        //返回集合复制list
        this.list = response.data
        console.log(this.list[0].amount)    //表示消费金额
        var myChart = echarts.init(document.getElementById('main'));
      console.log("jaychou")
      console.log(this.list.length)
      //设置数据
      var amountData=[];
      for (let i = 0; i < this.list.length; i++) {
          let obj = this.list[i].amount
          amountData.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
      }
      let option = {
        title: {
          text: "地域消费预测",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: [ '消费金额柱状图', '消费金额折线图'],
          left: "left"
        },
        xAxis: [{
          type: 'category',
          data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年', '2024年'],
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
            type: 'value',
            name: '消费金额柱状图',
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          {
            type: 'value',
            name: '消费金额折线图',
            axisLabel: {
              formatter: '{value} 元'
            }
          }
        ],
        series: [
          {
            name: '消费金额柱状图',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 元';
              }
            },
            data: amountData
          },
          {
            name: '消费金额折线图',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 元';
              }
            },
            data:amountData
          }
        ]
      }
      myChart.setOption(option); //调用工具
      })//请求成功调用
      .catch(error => { //请求失败调用
        console.log(error)
      })
    }
    },
    name: '',
  }
</script>
<style scoped>
  #main {
    height: 650px;
    margin-top: 50px;
  }
</style>


