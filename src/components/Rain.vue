<template>
  <div id='rain' >
    <div class='dialog_top'>
        <li>
            <a class='close' id='rainClose' v-on:click="rainClose"><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
    </div>
    <div id='echarts'>
    </div>
  </div>
</template>
<script>
import controlLayer from '../assets/commTool/controlDom'
import $ from 'jquery'
import echarts from 'echarts'
import RainLine from '../assets/commTool/createRainline'

export default {
  name: 'rain',
  data () {
    return {
      dname: '芝加哥雨型'
    }
  },
  mounted () {
    console.log('echarts')
  },
  methods: {
    showRain: function () {
      var rainTimeSeries = RainLine.createRainLine()
      var myChart = echarts.init(document.getElementById('echarts'))
      var array = []
      for (var i = 0; i <= rainTimeSeries.length - 1; i++) {
        array.push(i)
      }
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '降雨过程线'
        },
        tooltip: {},
        legend: {
          data: ['降雨']
        },
        xAxis: {
          data: array
        },
        yAxis: {
        },
        series: [{
          name: '降雨',
          type: 'line',
          data: rainTimeSeries
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    rainClose: function () {
      var rainDialog = $('#rain')
      controlLayer.ShowCloseDom(rainDialog, 'close')
    }   
  }
}
</script>
<style>
#rain {
  margin-top: 30%;
  right: 2%;
  width: 40%;
  height: 30%;
}
#echarts {
    background-color: thistle;
    height: 95%;
    border-radius:0px 0px 25px 25px;
    -moz-border-radius:25px;
}

</style>
