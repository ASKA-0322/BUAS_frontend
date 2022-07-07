<template>

  <div class="app-container" id="main">
    用户年龄聚合分析
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
      mounted () {
        axios.get('http://172.20.10.4:8081/base/age/').then(function(response){
            var value =response.data
            console.log(value)
            get_age(value)
        })
        function get_age(value){
              // 初始化图表，设置配置项
            var myChart = echarts.init(document.getElementById('main'));


            //循环遍历方法
            /* //设置数据
            var data=[];
           // { value: value.data[1].amount, name: value.data[1].period },
            for (let i = 0; i < value.data.length; i++) {
                let obj={value:value.data[i].amount,name:value.data[i].period}
                data.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
            } */


            let option ={
                title: {
                  text: "用户年龄聚合分析",
                  left: "center"
                },
                tooltip: {      //图例提示组件
                  trigger: "axis",
                  formatter: "{a} <br/>{b} : {c} "
                },
                xAxis: {
                  type: 'category',
                  data: ['20以下', '20-30岁', '30-40岁', '40-50岁', '50岁以上']
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    name: "用户年龄",
                    type: 'bar',
                    data: [
                      {value:value.data[1].amount,name:value.data[1].period},
                      {value:value.data[0].amount,name:value.data[0].period},
                      {value:value.data[2].amount,name:value.data[2].period},
                      {value:value.data[3].amount,name:value.data[3].period},
                      {value:value.data[4].amount,name:value.data[4].period},
                    ],
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                      ])
                    },
                    emphasis: {
                      itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: '#2378f7' },
                          { offset: 0.7, color: '#2378f7' },
                          { offset: 1, color: '#83bff6' }
                        ])
                      }
                    },
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

