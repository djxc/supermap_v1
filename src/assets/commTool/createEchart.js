import echarts from 'echarts'

function showRainflow (raindata) {
    var myChart = echarts.init(document.getElementById('rainflowEcharts'))
    var array = []
    for (var i = 0; i <= raindata.length - 1; i++) {
        array.push(i)
    }
    // 指定图表的配置项和数据
    var option = {
        title: {
        text: '单位面积经流量'
        },
        tooltip: {},
        legend: {
        data: ['经流量(mm)']
        },
        xAxis: {
        data: array
        },
        yAxis: {
        },
        series: [{
        name: '降雨',
        type: 'line',
        data: raindata
        }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
}
export default {
    showRainflow
}