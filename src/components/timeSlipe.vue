<template>
    <div id="timeslider">
      <div class='dialog_top'>
        <li>
            <a class='close' id="timeClose" v-on:click='closeDialog'><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
      </div>
    <div id='timelineecharts'>
    </div>
    </div>
</template>
<script>
import $ from 'jquery'
import control from '../assets/commTool/controlDom'
import echarts from 'echarts'
import createTime from '../assets/commTool/createTimeline'
import singleTheme from '../assets/commTool/singleTheme'
import initMap from '../assets/commTool/intial'

var myChart, time, cxq, yfxs
export default {
  name: 'timeslider',
  data () {
    return {
      dname: '事件序列'
    }
  },
  methods: {
    closeDialog: function () {
      var Dialog = $('#timeslider')
      control.ShowCloseDom(Dialog, 'close')
      singleTheme.removeTheme(initMap.getMap())
    },
    getRainValue: function () {
      time = $('#rainTime').val()
      cxq = $('#period').val()
      yfxs = $('#coeffici').val()
      myChart = echarts.init(document.getElementById('timelineecharts'))
      myChart.showLoading({
        text: '等待一下～～',
        effect: 'whirling', // 'spin',
        textStyle: {
          fontSize: 20
        }
      })
    },
    showLoad: function () {
      this.getRainValue()
      this.postajax('calculateRainflow')
    },
    showLIDLoad: function () {
      this.getRainValue()
      this.postajax('calculateLIDRainflow')
    },
    postajax: function (ufun) {
      $.ajax({
        url: 'http://localhost:8088/' + ufun,
        type: 'POST',
        // contentType: 'application/json;charset=utf-8',
        data: {'time': time, 'cxq': cxq, 'yfxs': yfxs},
        dataType: 'text', // 'json',
        success: function (result) {
          console.log('ok')
          myChart.hideLoading()
          createTime.createTime(initMap.getMap())
        },
        error: function (msg) {
          console.log('failed')
          console.log(msg)
        }
      })
    }
  }
}
$(function () {
})
</script>
<style>
#timeslider {
  margin-top: 30%;
  right: 2%;
  width: 42%;
  height: 30%;
}
#timelineecharts {
    height: 93%;
}
</style>
