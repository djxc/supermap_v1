<template>
  <div id="draw">
    <div class="dialog_top">
        <li>
            <a class="close" id="drawClose"><img src="../assets/img/close.png" title="关闭" /></a>
        </li>
        {{ dname }}
    </div>
    <div id="drawbtn">
       <div class="btn-group" role="group" aria-label="...">
        <button id="drawPoint" value='Point' type="button" class="btn btn-primary">绘点</button>
        <button id="drawLine" value='LineString' type="button" class="btn btn-primary">绘线</button>
        <button id="drawPolygon" value='Polygon' type="button" class="btn btn-primary">绘面</button>
        <button id="drawCircle" value='Circle' type="button" class="btn btn-primary">绘圆</button>
        <button id="none" value='None' type="button" class="btn btn-primary">无绘制</button>
        <button id="clear" value='Clear' type="button" class="btn btn-primary">清除</button>
    </div>

    </div>
   </div>
</template>

<script>

import controlLayer from '../assets/commTool/controlDom'
import initMap from '../assets/commTool/intial'
import ol from 'openlayers'
import $ from 'jquery'
export default {
  name: 'myDialog',
  data () {
    return {
      dname: '编辑'
    }
  }
}
$(function () {
  var draw
  var map = initMap.getMap()
  var source = new ol.source.Vector({wrapX: false})
  var vector = new ol.layer.Vector({
    source: source
  })
  map.addLayer(vector)

  $('#drawClose').on('click', function () {
    var drawDialog = $('#draw')
    controlLayer.ShowCloseDom(drawDialog, 'close')
  })

  var buttons = $('.btn-group').children()
  buttons.map(function (key) {
    var value = buttons[key].value
    if (value === 'None') {
      $(buttons[key]).on('click', function () {
        clearInteraction()
      })
      return
    }
    if (value === 'Clear') {
      $(buttons[key]).on('click', function () {
        clearInteraction()
        source.clear()
      })
      return
    }
    $(buttons[key]).on('click', function () {
      clearInteraction()
      draw = new ol.interaction.Draw({
        source: source,
        type: buttons[key].value,
        snapTolerance: 20
      })
      map.addInteraction(draw)
    })
  })

  function clearInteraction () {
    if (draw) {
      map.removeInteraction(draw)
    }
  }
})

</script>
<style>
#draw {
  margin-top: 2%;
  right: 2%;
  width: 22%;
  height: 15%;
}

div[id="rain_close"] li:hover{
  transform:scale(1.2,1.2);
}

#drawbtn {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}

</style>
