
<template>
  <div>
    <!-- 专利国内分布图 -->
    <div id="cmap" class="chart-container" style="width:1280px; height:768px;margin:auto;top:80px;"></div>
    <div style="height:78px"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import 'echarts/map/js/china.js';

export default {
  components: {
 },
  name: '',
  data() {
    return {
    option1 : {
    "animation": true,
    "animationThreshold": 2000,
    "animationDuration": 1000,
    "animationEasing": "cubicOut",
    "animationDelay": 0,
    "animationDurationUpdate": 300,
    "animationEasingUpdate": "cubicOut",
    "animationDelayUpdate": 0,
    "color": [
        "#008B8B"
    ],
    "series": [
        {
            "type": "map",
            "name": "\u4e13\u5229\u6570",
            "label": {
                "show": true,
                "position": "inside",
                "distance": "inside",
                "margin": 8,
                "fontSize": 16,
                "fontStyle": "normal"
            },
            "mapType": "china",
            "data": [
                {
                    "name": "\u5317\u4eac",
                    "value": "19902"
                },
                {
                    "name": "\u5e7f\u4e1c",
                    "value": "16610"
                },
                {
                    "name": "\u6c5f\u82cf",
                    "value": "10997"
                },
                {
                    "name": "\u6d59\u6c5f",
                    "value": "7673"
                },
                {
                    "name": "\u4e0a\u6d77",
                    "value": "7295"
                },
                {
                    "name": "\u56db\u5ddd",
                    "value": "4513"
                },
                {
                    "name": "\u9655\u897f",
                    "value": "4062"
                },
                {
                    "name": "\u6e56\u5317",
                    "value": "3826"
                },
                {
                    "name": "\u5c71\u4e1c",
                    "value": "3759"
                },
                {
                    "name": "\u5929\u6d25",
                    "value": "2514"
                },
                {
                    "name": "\u5b89\u5fbd",
                    "value": "2340"
                },
                {
                    "name": "\u91cd\u5e86",
                    "value": "2327"
                },
                {
                    "name": "\u6e56\u5357",
                    "value": "2265"
                },
                {
                    "name": "\u8fbd\u5b81",
                    "value": "2260"
                },
                {
                    "name": "\u798f\u5efa",
                    "value": "2180"
                },
                {
                    "name": "\u9ed1\u9f99\u6c5f",
                    "value": "1592"
                },
                {
                    "name": "\u6cb3\u5357",
                    "value": "1298"
                },
                {
                    "name": "\u6cb3\u5317",
                    "value": "833"
                },
                {
                    "name": "\u5e7f\u897f",
                    "value": "768"
                },
                {
                    "name": "\u5409\u6797",
                    "value": "734"
                },
                {
                    "name": "\u4e91\u5357",
                    "value": "679"
                },
                {
                    "name": "\u6c5f\u897f",
                    "value": "558"
                },
                {
                    "name": "\u5c71\u897f",
                    "value": "423"
                },
                {
                    "name": "\u8d35\u5dde",
                    "value": "326"
                },
                {
                    "name": "\u53f0\u6e7e",
                    "value": "292"
                },
                {
                    "name": "\u7518\u8083",
                    "value": "197"
                },
                {
                    "name": "\u5185\u8499\u53e4",
                    "value": "182"
                },
                {
                    "name": "\u65b0\u7586",
                    "value": "137"
                },
                {
                    "name": "\u9999\u6e2f",
                    "value": "106"
                },
                {
                    "name": "\u6d77\u5357",
                    "value": "94"
                },
                {
                    "name": "\u5b81\u590f",
                    "value": "77"
                },
                {
                    "name": "\u9752\u6d77",
                    "value": "45"
                },
                {
                    "name": "\u897f\u85cf",
                    "value": "13"
                },
                {
                    "name": "\u6fb3\u95e8",
                    "value": "10"
                }
            ],
            "roam": false,
            "zoom": 1,
            "showLegendSymbol": false,
            "emphasis": {}
        }
    ],
    "legend": [
        {
            "data": [
                "\u4e13\u5229\u6570"
            ],
            "selected": {
                "\u4e13\u5229\u6570": true
            },
            "show": false,
            "padding": 5,
            "itemGap": 10,
            "itemWidth": 25,
            "itemHeight": 14,
            "textStyle": {
                "fontFamily": "Arial",
                "fontSize": 20
            }
        }
    ],
    "tooltip": {
        "show": true,
        "trigger": "item",
        "triggerOn": "mousemove|click",
        "axisPointer": {
            "type": "line"
        },
        "showContent": true,
        "alwaysShowContent": false,
        "showDelay": 0,
        "hideDelay": 100,
        "textStyle": {
            "fontSize": 14
        },
        "borderWidth": 0,
        "padding": 5
    },
    "title": [
        {
            "text": "办卡地区分布图",
            "padding": 5,
            "itemGap": 10,
            "textStyle": {
                "fontFamily": "Arial",
                "fontSize": 30
            },
            "subtextStyle": {
                "fontFamily": "Arial",
                "fontSize": 20
            }
        }
    ],
    "visualMap": {
        "show": true,
        "type": "piecewise",
        "min": 0,
        "max": 2000,
        "inRange": {
            "color": [
                "#50a3ba",
                "#eac763",
                "#d94e5d"
            ]
        },
        "calculable": true,
        "inverse": false,
        "splitNumber": 5,
        "orient": "vertical",
        "showLabel": true,
        "itemWidth": 20,
        "itemHeight": 14,
        "borderWidth": 0,
        "pieces": [
            {
                "max": 10,
                "label": "10\u4ee5\u4e0b",
                "color": "#ECF5FF"
            },
            {
                "min": 10,
                "max": 50,
                "label": "10-100",
                "color": "#D2E9FF"
            },
            {
                "min": 50,
                "max": 100,
                "label": "100-200",
                "color": "#ACD6FF"
            },
            {
                "min": 100,
                "max": 500,
                "label": "200-500",
                "color": "#84C1FF"
            },
            {
                "min": 500,
                "max": 1000,
                "label": "500-100",
                "color": "#46A3FF"
            },
            {
                "min": 1000,
                "max": 5000,
                "label": "1000-5000",
                "color": "#0080FF"
            },
            {
                "min": 5000,
                "label": "5000\u4ee5\u4e0a",
                "color": "#0066CC"
            }
        ]
    }
},
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    draw1(){
            let myChart = echarts.init(document.getElementById('cmap'), 'white', {renderer: 'canvas'});
            myChart.setOption(this.option1);
    },
},
mounted() {
    //页面加载的时候，调用画图方法，画图
    this.draw1();
    }
};
</script>
