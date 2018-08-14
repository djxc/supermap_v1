import ol from 'openlayers'
import $ from 'jquery'
import {SuperMap} from '@supermap/iclient-openlayers'

var draw, SMmap, source, vector, style

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

function createDraws (type) {
  switch (type) {
    case 1:
      draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon',
        snapTolerance: 20,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(248, 203, 249, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      })
      break
    case 2:
      draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon',
        snapTolerance: 20,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      })
      break
    case 3:
      draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon',
        snapTolerance: 20,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 239, 168, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      })
      break
    case 4:
      draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon',
        snapTolerance: 20,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(173, 209, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      })
      break
    case 5:
      draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon',
        snapTolerance: 20,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#ffcc33' // 'rgba(132, 164, 232, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      })
      break
  }
}

/**
 * 不同的海绵体，创建不同的样式
 * @param {*} type
 */
function createStyle (type) {
  switch (type) {
    case 1:
    style = new ol.style.Style({
      fill:new ol.style.Fill({
        color: 'rgba(248, 203, 249, 1)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgb(255, 255, 255)',
        width: 0.1
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
    break
  case 2:
    style = new ol.style.Style({
      fill:new ol.style.Fill({
        color: 'rgba(196, 255, 189, 1)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgb(255, 255, 255)',
        width: 0.1
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
    break
  case 3:
    style = new ol.style.Style({
      fill:new ol.style.Fill({
        color: 'rgba(255, 173, 173, 1)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgb(255, 255, 255)',
        width: 0.1
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
    break
  case 4:
    style = new ol.style.Style({
      fill:new ol.style.Fill({
        color: 'rgba(255, 239, 168, 1)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgb(255, 255, 255)',
        width: 0.1
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
    break
  case 5:
    style = new ol.style.Style({
      fill:new ol.style.Fill({
        color: 'rgba(173, 209, 255, 1)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgb(255, 255, 255)',
        width: 0.1
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })    
    break
  }
}

/**
 * 初始化数据源以及用于存储编辑要素的图层
 */
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
      console.log(buttons[key].innerText)
      var type = buttons[key].innerText
      switch (type) {
        case '绿色屋顶':
          createDraws(1)
          DrawEnd(type, 1)
          break
        case '下沉式绿地':
          createDraws(2)
          DrawEnd(type, 2)
          break
        case '雨水湿地':
          createDraws(3)
          DrawEnd(type, 3)
          break
        case '透水铺装':
          createDraws(4)
          DrawEnd(type, 4)
          break
        case '蓄水池':
          createDraws(5)
          DrawEnd(type, 5)
          break
        default:
          draw = new ol.interaction.Draw({
            source: source,
            type: buttons[key].value,
            snapTolerance: 20
          })
          map.addInteraction(draw)
          break
      }
    })
  })
}

function DrawEnd (type, id) {
  draw.on('drawend',function(evt){
    var fea = evt.feature;
    fea.set('name',type);
    createStyle(id)
    if(style!=null){// 如果传入不为空，则使用自定义样式
        fea.setStyle([style]);
    }
  },this)
  SMmap.addInteraction(draw)
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
  clearDraw,
  createDraws
}
