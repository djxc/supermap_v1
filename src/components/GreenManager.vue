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
          <button value='Polygon' type="button" class="btn btn-primary btn-sm">绿色屋顶</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm">下沉式绿地</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm">雨水湿地</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm">蓄水池</button>
          <button value='Polygon' type="button" class="btn btn-primary btn-sm">透水铺装</button>
        </div><br>
        <button class="btn btn-success btn-sm" v-on:click="startDraw">开始编辑</button>
        <button class="btn btn-primary btn-sm" v-on:click="stopDraw">停止编辑</button><br><br>
        <button class="btn btn-info btn-sm" v-on:click="clearDraw">清除</button>
      </div>
    </div>
  </div>
</template>
<script>
import control from '../assets/commTool/controlDom'
import $ from 'jquery'
import mydraw from '../assets/commTool/draw'
import initMap from '../assets/commTool/intial'

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
    },
    stopDraw: function () {
      mydraw.stopDraw()
    },
    clearDraw: function () {
      mydraw.clearDraw()
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
