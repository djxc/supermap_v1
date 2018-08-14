<template>
  <div id='GreenManager' >
    <div class='dialog_top'>
        <li>
            <a class='close' v-on:click="closeDialog"><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
    </div>
    <div id="GreenInpcon">
      <div id="drawbtn">
        <div class="btn-groupgreen" role="group" aria-label="...">
          <button value='Polygon' type="button" class="btn btn-primary btn-sm" disabled="disabled">绿色屋顶</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm" disabled="disabled">下沉式绿地</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm" disabled="disabled">雨水湿地</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm" disabled="disabled">蓄水池</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm" disabled="disabled">透水铺装</button>
        </div><br>
        <button class="btn btn-success btn-sm" v-on:click="startDraw">开始编辑</button>
        <button class="btn btn-primary btn-sm" v-on:click="stopDraw" disabled="disabled" id="stopBtn">停止编辑</button><br><br>
        <button class="btn btn-info btn-sm" v-on:click="clearDraw">清除</button><br><br>
        <button class="btn btn-success btn-sm" v-on:click="startRainLID" disabled="disabled" id="startRainLid">模拟降雨</button>
      </div>
    </div>
  </div>
</template>
<script>
import control from '../assets/commTool/controlDom'
import $ from 'jquery'
import mydraw from '../assets/commTool/draw'
import initMap from '../assets/commTool/intial'
import rainInput from './rainInput'

export default {
  name: 'GreenManager',
  data () {
    return {
      dname: '海绵体布设'
    }
  },
  mounted () {
  },
  methods: {
    closeDialog: function () {
      var Dialog = $('#GreenManager')
      control.ShowCloseDom(Dialog, 'close')
    },
    startDraw: function () {
      mydraw.drawGreen(initMap.getMap())
      $('#stopBtn').attr('disabled', false)
      var buttons = $('.btn-groupgreen').children()
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false
      }
    },
    stopDraw: function () {
      mydraw.stopDraw()
      $('#stopBtn').attr('disabled', true)
      var buttons = $('.btn-groupgreen').children()
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
      }
      $('#startRainLid').attr('disabled', false)
    },
    clearDraw: function () {
      mydraw.clearDraw()
    },
    startRainLID: function () {
      this.closeDialog()
      var Dialog = $('#rainInput')
      control.ShowCloseDom(Dialog, 'show')
      rainInput.methods.showLID()
    }
  }
}
</script>
<style>
#GreenManager {
  margin-top: 2%;
  right: 2%;
  width: 12%;
  height: 40%;
}
</style>
