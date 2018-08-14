import echarts from 'echarts'

function showRainflow (raindata, lidrainflow) {
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
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['现状', '海绵体布设后'],
      x: 'right'
    },
    xAxis: {
      data: array
    },
    yAxis: {},
    series: [{
      name: '现状',
      type: 'line',
      data: raindata
    }, {
      name: '海绵体布设后',
      type: 'line',
      data: lidrainflow
    }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
export default {
  showRainflow
}
