import ol from 'openlayers'

var TDRoad = new ol.layer.Tile({
  title: '天地图路网',
  source: new ol.source.XYZ({
    url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}'
  })
})

var TDImg = new ol.layer.Tile({
  title: '天地图卫星影像',
  source: new ol.source.XYZ({
    url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
    // url: 'http://t2.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}'
  })
})

var TDAnno = new ol.layer.Tile({
  title: '天地图文字标注',
  source: new ol.source.XYZ({
    url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
  })
})

var TDAnnoimg = new ol.layer.Tile({
  title: '天地图影像文字标注',
  source: new ol.source.XYZ({
    url: 'http://t3.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}'
  })
})

// var changelayersControl = function (map) {
//   var array = map.getLayers().getArray()

//   var value = array[array.length - 1].getProperties('values_')
//   if (value.title != null) {
//     console.log(value.title)
//     createElement.createParam(value.title)
//   } else {
//     var param = value.source.params_
//     if (param != null) {
//       var obj = eval(param)
//       console.log(obj.LAYERS)
//       createElement.createParam(obj.LAYERS)
//     }
//   }
// }

// function addTDLayer (map, num) {
//   switch (num) {
//     case 1:
//       if ($('#isAddAnno').is(':checked')) {
//         map.addLayer(TDAnno)
//         changelayersControl(map)
//       } else {
//         map.removeLayer(TDAnno)
//       }
//       break

//     case 2:
//       if ($('#isAddRoad').is(':checked')) {
//         map.addLayer(TDRoad)
//         changelayersControl(map)
//       } else {
//         map.removeLayer(TDRoad)
//       }
//       break

//     case 3:
//       if ($('#isAddRS').is(':checked')) {
//         map.addLayer(TDImg)
//         changelayersControl(map)
//       } else {
//         map.removeLayer(TDImg)
//       }
//       break
//   }
// }

function removeImgLayer (map) {
  map.removeLayer(TDImg)
  map.removeLayer(TDAnnoimg)
}

function addImgLayer (map) {
  TDImg.setZIndex(1)
  TDAnnoimg.setZIndex(2)
  map.addLayer(TDImg)
  map.addLayer(TDAnnoimg)
}

function removeVecLayer (map) {
  map.removeLayer(TDRoad)
  map.removeLayer(TDAnno)
}

function addVecLayer (map) {
  TDRoad.setZIndex(1)
  TDAnno.setZIndex(2)
  map.addLayer(TDRoad)
  map.addLayer(TDAnno)
}

export default {
  // addTDLayer,
  removeImgLayer,
  addImgLayer,
  removeVecLayer,
  addVecLayer
}
