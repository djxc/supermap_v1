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
import rainInput from './rainInput.vue';

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
    showRain: function() {
      var rainTimeSeries = this.createRainLine()
      var myChart = echarts.init(document.getElementById('echarts'));	
      var array=new Array();
      for (var i=0;i<=rainTimeSeries.length-1;i++){
        array.push(i);
      }
      // 指定图表的配置项和数据
      var option = {
        title: {
            text: '降雨过程线'
        },
        tooltip: {},
        legend: {
            data:['降雨']
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
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createRainLine: function () {      
      var time = $('#rainTime').val()
      var period = $('#period').val() // rainInput.data().period
      var coeffici = $('#coeffici').val() // rainInput.data().coeffici
      console.log(rainInput.methods.getTime())
      var rainTimeSeries = this.caculateRain(coeffici, period, time)
      return rainTimeSeries
    },     
    caculateRain: function (r, p, t) {        
      var c = 0.56
      var q = 167 * 2094 * (1 + c * Math.log10(p))
      var z = parseInt(r * t)
      var rainTimeSeries = new Array()
      for (var y = z; y > -1; y--) {
        var w = (((1 - 0.633) * y / r) + 8.875) / Math.pow((y / r) + 8.875, 0.633 + 1)
        var i = q * w
        var RainfallIntensity = (i / 27889.678).toFixed(4)
        rainTimeSeries.push(RainfallIntensity)
      }
      for (var y = 1; y < t - z + 1; y++) {
        var w = (((1 - 0.633) * y / (1 - r)) + 8.875) / Math.pow((y / (1 - r)) + 8.875, 0.633 + 1)
        var i = q * w
        var RainfallIntensity = (i / 27889.678).toFixed(4)
        rainTimeSeries.push(RainfallIntensity)
      }
      return rainTimeSeries
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
  position: absolute;
  background-color: brown;
  display: none;
  margin-top: 30%;
  right: 2%;
  width: 40%;
  height: 30%;
}
#echarts {
    background-color: thistle;
    height: 95%;
}

/*
div[id='rain_close'] li:hover{
  transform:scale(1.2,1.2);
} */
</style>
