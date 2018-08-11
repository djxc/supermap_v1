<template>
  <div id='GreenManager' >
    <div class='dialog_top'>
        <li>
            <a class='close'><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
    </div>
    <div id="GreenInpcon">
      <div id="drawbtn">
        <div class="btn-group" role="group" aria-label="...">
          <button id="drawPoint" value='Point' type="button" class="btn btn-primary">绘点</button>
          <button id="drawLine" value='LineString' type="button" class="btn btn-primary">绘线</button>
          <button id="drawPolygon" value='Polygon' type="button" class="btn btn-primary">绘面</button>
          <button id="drawCircle" value='Circle' type="button" class="btn btn-primary">绘圆</button>                
        </div><br>
        <button class="btn btn-primary" v-on:click="startDraw">开始编辑</button>
        <button class="btn btn-primary" v-on:click="stopDraw">停止编辑</button><br>
        <button class="btn btn-primary" v-on:click="clearDraw">清除</button>
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
          var Dialog = $('#rainInput')
      control.ShowCloseDom(Dialog, 'close')
    },
    startDraw: function () {        
      mydraw.drawGreen(initMap.getMap())
    },
    stopDraw: function () {
        mydraw.stopDraw()
    },
    clearEdit: function () {
        mydraw.clearDraw()
    }
  }
}
</script>
<style>
#GreenManager {
  position: absolute;
  background-color: rgb(223, 240, 223);
  margin-top: 2%;
  right: 2%;
  width: 12%;
  height: 40%;
}
</style>
