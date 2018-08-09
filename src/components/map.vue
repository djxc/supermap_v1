<template>
  <div class='dj'>
    <div id='map'>
    </div>
        <!-- 点击弹出窗口 -->
    <div id="popup" class="ol-popup" display="none">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>

    <dialog-window></dialog-window>
    <draw-win></draw-win>
    <rain-input></rain-input>
    <rain-win></rain-win>
    <testmenu></testmenu>
    <timeslider></timeslider>
    <attrtable></attrtable>
    <rainflow></rainflow>
  </div>
</template>

<script>
import initMap from '../assets/commTool/intial'
import dialog from './Dialog'
import draw from './draw'
import rainInput from './rainInput'
import rain from './Rain'
import menu from './testmenu'
import timeslider from './timeSlipe'
import attrtable from './SelectAttr'
import rainflow from './showRainflow'
import $ from 'jquery'

export default {
  name: 'dj',
  data () {
    return {
      msg: '爱是恒久忍耐又有恩赐,爱是不嫉妒'
    }
  },
  mounted () {
    initMap.initMap1()
  },
  components: {
    'dialog-window': dialog,
    'draw-win': draw,
    'rain-win': rain,
    'rain-input': rainInput,
    'testmenu': menu,
    'timeslider': timeslider,
    'attrtable': attrtable,
    'rainflow': rainflow
  }
}
$(function () {
  var map = initMap.getMap()
  $('#map').click(function (e) {
    var coord = map.getEventCoordinate(e)
    if (coord[0] >= 180) {
      coord[0] = coord[0] - 360
    }
    console.log(coord)
  })
})
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#map {
  position: absolute;
  background-color: #42b983;
  top: 6.7%;
  width: 100%;
  height: 93.3%;
  left: 0px;
  margin-top: 0px;
}

</style>
