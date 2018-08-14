<template>
  <div id='rainInput' >
    <div class='dialog_top'>
        <li>
            <a class='close' id="rainInputClose" v-on:click='closeDialog'><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
    </div>
    <div id="rainInpcon">
      <ul>
          <li><label>降雨历时(分钟)：</label><input id="rainTime" v-model="rainTime"/></li>
          <li><label>重现期(年)：</label><input id="period" v-model="period" /></li>
          <li><label>雨峰系数：</label><input id="coeffici" v-model="coeffici"/></li>
      </ul><br>
      <button v-on:click='showRainInput' class="btn btn-primary btn-sm">生成降雨折线</button><br><br>
      <button v-on:click='startRain' class="btn btn-success btn-sm">开始降雨</button>
    </div>
  </div>
</template>
<script>
import control from '../assets/commTool/controlDom'
import $ from 'jquery'
import showRain from './Rain.vue'
import createTime from '../assets/commTool/createTimeline'
import initMap from '../assets/commTool/intial'
import echarts from 'echarts'
import timeline from './timeSlipe'
var myChart
export default {
  name: 'rainInput',
  data () {
    return {
      dname: '输入雨型参数',
      rainTime: 60,
      period: 2,
      coeffici: 0.5
    }
  },
  methods: {
    closeDialog: function () {
      var Dialog = $('#rainInput')
      control.ShowCloseDom(Dialog, 'close')
    },
    showRainInput: function () {
      if (!$('#rain').is(':visible')) {
        var rainDialog = $('#rain')
        control.ShowCloseDom(rainDialog, 'show')
      }
      showRain.methods.showRain()
    },
    startRain: function () {
      this.closeDialog()
      var timeDialog = $('#timeslider')
      control.ShowCloseDom(timeDialog, 'show')
      timeline.methods.showLoad()
    },
    getTime: function () {
      return this.rainTime
    }    
  }
}
</script>
<style>
#rainInput {
  margin-top: 2%;
  right: 2%;
  width: 12%;
  height: 40%;
}
#rainInpcon {
  margin-top: 20px;
  height: 80%;
}
#rainTime, #period, #coeffici {
  width: 50px;
}
</style>
