<template>
  <div class="app-container" id="main">
    地域消费分析
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
          LabelLayout,
          UniversalTransition,
          CanvasRenderer,
        ]);

      },
      mounted () {
        axios.get('http://172.20.10.4:8081/consum/area').then(function(response){//获取后端 各省份消费金额
            var value =response.data
            get_consumarea(value)
        })


        function get_consumarea(value){

          axios.get('http://172.20.10.4:8081/consum/category/').then(function(response){//获取后端 指定省份的消费类别
              var value1 =response.data
              get_consumareapro(value1)
          })

          function get_consumareapro(value1){

        // 初始化图表，设置配置项
        var myChart = echarts.init(document.getElementById('main'));

        //下钻后各省份消费类别数据
        var drilldata=[];
        let val=[]
        for(let i=0;i<value1.data.length;i++){
            for(let j=0;j<value1.data[i].areaCateList.length;j++){
                let obj = value1.data[i].areaCateList[j]
                val= Object.values(obj)//规范格式 把后端传来的对象类型变为数组类型 与js格式对应
                value1.data[i].areaCateList[j]=val
            }
            let obj = {dataGroupId:value1.data[i].province,data:value1.data[i].areaCateList}
            drilldata.push(obj)
        }


        //各省份消费金额数据
            //设置数据
            var data=[];
            var prodata=[];//后端传入省份
           // { value: value.data[1].amount, name: value.data[1].period },
            for (let i = 0; i < value.data.length; i++) {
                let obj={value:value.data[i].amount,groupId:value.data[i].consumptionArea}
                let proobj=value.data[i].consumptionArea
                data.push(obj)    //每次循环获取一个下标的记录，存在obj里面，再追加到data里面
                if(i%2==0){prodata.push('\n'+proobj)}
                else{prodata.push(proobj)}
            }

        let option ={
          title: {
          text: "地域消费分析",
          left: "center"
        },
        yAxis: {
          type: 'value',
        },
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0 },
          data:prodata//后端传入省份
          // ['黑龙江', '\n香港', '青海', '\n陕西', '重庆', '\n辽宁', '贵州', '\n西藏', '福建', '\n甘肃', '澳门', '\n湖南', '湖北', '\n海外', '海南', '\n浙江', '河南', '\n河北', '江西', '\n江苏', '新疆', '\n广西', '广东', '\n山西', '山东', '\n安徽', '宁夏', '\n天津', '四川', '\n吉林', '台湾','\n北京','内蒙古','\n云南','上海']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        dataGroupId: '',
        animationDurationUpdate: 500,
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 30000,
          max: 180000,
          text: ['High', 'Low'],
          // Map the score column to color
          dimension: 1,
          inRange: {
            // color: ['#65B581', '#FFCE34', '#FD665F']
            //color:['#abecd6','#2580B3']
            // color:['#abecd6','#33539e']
            //color:['#bfb8da','#7facd6','#33539e']//紫色蓝色
             color:['#90d7ec','#76becc','#145b7d']
          }
        },
        series: {
          type: 'bar',
          id: 'sales',
          data:data,
          // [       数据格式样例
          //   {value: 19525,groupId: '台湾'},
          //   {value: 33205,groupId: '香港'},
          //   {value: 19525,groupId: '澳门'},
          // ],
          universalTransition: {
            enabled: true,
            divideShape: 'clone'
          },
          emphasis:{
              itemStyle: {
                color: '#d5e0b2',
              }
          }
        }
        }//option
        const drilldownData =drilldata;
        // [
        //   {
        //     dataGroupId: '黑龙江',
        //     data: [['服装鞋帽', 4],['日用百货', 2],['数码产品及其配件', 1],['手提包、箱包', 2],['妆品和美容产品', 11],['书籍音像制品', 11],['家用电器', 8],['食品、保健品', 5],['文体用品', 11]]
        //   },
        //   {
        //     dataGroupId: '香港',
        //     data: [['服装鞋帽', 4],['日用百货', 2],['数码产品及其配件', 1],['手提包、箱包', 2],['妆品和美容产品', 11],['书籍音像制品', 11],['家用电器', 8],['食品、保健品', 5],['文体用品', 11]]
        //   },
        // ];
        myChart.on('click', function (event) {
          if (event.data) {
            var subData = drilldownData.find(function (data) {
              return data.dataGroupId === event.data.groupId;
            });
            if (!subData) {
              return;
            }
            myChart.setOption({
              xAxis: {
                data: subData.data.map(function (item) {
                  return item[0];
                })
              },
              title: {
                text: event.data.groupId+'用户消费类别',
                left: "center"
              },
              visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 1000,
                max: 20000,
                text: ['High', 'Low'],
                // Map the score column to color
                dimension: 1,
                inRange: {
                  // color: ['#65B581', '#FFCE34', '#FD665F']
                  //color:['#abecd6','#2580B3']
                  // color:['#abecd6','#33539e']
                  //color:['#bfb8da','#7facd6','#33539e']//紫色蓝色
                  color:['#90d7ec','#76becc','#145b7d']
                }
              },
              series: {
                type: 'bar',
                id: 'sales',
                dataGroupId: subData.dataGroupId,
                data: subData.data.map(function (item) {
                  return item[1];
                }),
                universalTransition: {
                  enabled: true,
                  divideShape: 'clone'
                }
              },
              graphic: [
                {
                  type: 'text',
                  left: 50,
                  top: 20,
                  style: {
                    text: 'Back',
                    fontSize: 18
                  },
                  onclick: function () {
                    myChart.setOption(option);
                  }
                }
              ]
            });
          }
        });
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
}
</style>


