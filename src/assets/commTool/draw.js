import ol from 'openlayers'
import $ from 'jquery'

// var isFrist=0;
// var draw;
// var isStart=false;
// //创建空白的矢量图层，用来存储用户编辑的元素
// var source = new ol.source.Vector({ wrapX: false });
// var vector = new ol.layer.Vector({
//     source: source
// });

// var typeSelect = document.querySelector("#type");

//  //定义map的交互动作，这里为draw类型
//  var addInteraction=function() {
//     var value = typeSelect.value;
//     if (value !== 'None') {
//         draw = new ol.interaction.Draw({
//             source: source,
//             type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
//         });
//         map.addInteraction(draw);
//     }
// }
// /**
//  * Handle change event.
//  */
// typeSelect.onchange = function () {
//     map.removeInteraction(draw);
//     addInteraction();
// };

// var stopDraw=function(){
//     map.removeInteraction(draw);
// }

// var mydraw=function(){
//     if(isFrist==0){
//         map.addLayer(vector);
//         isFrist=1;
//     }

//     if(isStart){
//         isStart=false;
//         stopDraw();
//         $("#type").prop("disabled", true);
//         $("#myDraw").text('开始编辑');
//     }else{
//         isStart=true;
//         addInteraction();
//         $("#type").prop("disabled", false);
//         $("#myDraw").text("停止编辑");
//     }
// }
var draw, SMmap, source, vector

function initDraw () {
  source = new ol.source.Vector({wrapX: false})
  vector = new ol.layer.Vector({
    source: source
  })
  vector.setZIndex(4)
}
function drawGreen (map) {
  SMmap = map
  initDraw()
  SMmap.addLayer(vector)
  var buttons = $('.btn-groupgreen').children()
  buttons.map(function (key) {
    $(buttons[key]).on('click', function () {
      stopDraw()
      draw = new ol.interaction.Draw({
        source: source,
        type: buttons[key].value,
        snapTolerance: 20
      })
      map.addInteraction(draw)
    })
  })
}

function clearDraw () {
  source.clear()
}

function stopDraw () {
  if (draw) {
    SMmap.removeInteraction(draw)
  }
}

export default {
  // mydraw,
  drawGreen,
  stopDraw,
  clearDraw
}
