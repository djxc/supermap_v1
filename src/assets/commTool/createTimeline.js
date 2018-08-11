import echarts from 'echarts'
import RainLine from './createRainline'
import singleTheme from './singleTheme'
import $ from 'jquery'

function createTime1 () {
  var option = {
    title: {
      text: '时间坐标散点图',
      subtext: 'dataZoom支持'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    dataZoom: {
      show: true,
      start: 30,
      end: 70
    },
    legend: {
      data: ['series1']
    },
    dataRange: {
      min: 0,
      max: 100,
      orient: 'horizontal',
      y: 30,
      x: 'center',
      // text:['高','低'],           // 文本，默认为数值文本
      color: ['lightgreen', 'orange'],
      splitNumber: 5
    },
    grid: {
      y2: 80
    },
    xAxis: [
      {
        type: 'time',
        splitNumber: 10
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    animation: false,
    series: [
      {
        name: 'series1',
        type: 'scatter',
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var date = new Date(params.value[0])
            return params.seriesName +
              ' （' + date.getFullYear() +
              '-' + (date.getMonth() + 1) +
              '-' + date.getDate() + ' ' +
              date.getHours() + ':' + date.getMinutes() + '）<br/>' +
              params.value[1] + ', ' + params.value[2]
          },
          axisPointer: {
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        symbolSize: function (value) {
          return Math.round(value[2] / 10)
        },
        data: (function () {
          var d = []
          var len = 0
          while (len++ < 1500) {
            d.push([
              new Date(2014, 9, 1, 0, Math.round(Math.random() * 10000)),
              (Math.random() * 30).toFixed(2) - 0,
              (Math.random() * 100).toFixed(2) - 0
            ])
          }
          return d
        })()
      }
    ]
  }
  var myChart = echarts.init(document.getElementById('timelineecharts'))
  myChart.setOption(option)
}

function createTime (map) {
  var rainTimeSeries = RainLine.createRainLine()
  var datas = []
  var datass = []
  for (var i = 0; i < rainTimeSeries.length; i++) {
    datas.push(i)
    if (i % 2 === 0) {
      datass.push(i)
    }
  }
  var djs = []

  for (var j = 10; j < rainTimeSeries.length; j++) {
    var djdata = []
    var djrain = []
    for (var x = j - 10; x < j + 10; x++) {
      if (rainTimeSeries[x] != null) {
        if (j % 2 === 0) {
        }
        djdata.push(datas[x])
        djrain.push(rainTimeSeries[x])
      }
    }
    var dj = {
      xAxis: [{
        data: djdata
      }],
      series: [{
        data: djrain
      }]
    }
    djs.push(dj)
  }
  var myChart = echarts.init(document.getElementById('timelineecharts'))
  var option = {
    // timeline基本配置都写在baseoption 中
    baseOption: {
      timeline: {
        loop: false,
        axisType: 'category',
        show: true,
        autoPlay: true,
        playInterval: 2000,
        data: datass
      },
      grid: { containLabel: true },
      xAxis: [ {
        type: 'category',
        name: '时间'
      } ],
      yAxis: { type: 'value', name: '降雨量(mm)' },
      series: [ { type: 'line' } ],
      tooltip: {}
    },
    // 变量则写在options中
    options: djs
  }
  myChart.setOption(option)

  myChart.on('timelinechanged', function (param) {
    var time = param.currentIndex
    if (time > 1) {
      singleTheme.removeTheme(map)
    }
    postajax(time)
    singleTheme.createTheme(map)
    console.log(time)
  })
}

function postajax (time) {
  $.ajax({
    url: 'http://localhost:8088/changerainflow',
    type: 'POST',
    // contentType: 'application/json;charset=utf-8',
    data: {'time': time},
    dataType: 'json',
    success: function (result) {
      console.log('ok')
    },
    error: function (msg) {
      console.log('failed')
      console.log(msg)
    }
  })
}

export default {
  createTime,
  createTime1
}
