import ol from 'openlayers'
import {Logo, TileSuperMapRest} from '@supermap/iclient-openlayers'

var map
var vecLayers
var imgLayers

function createLayer () {
  vecLayers = [
    new ol.layer.Tile({
        source: new ol.source.Tianditu({
        layerType: 'vec'
        })
    }),
    new ol.layer.Tile({
        source: new ol.source.Tianditu({
        isLabel: true
        })
  })]
  imgLayers = [
    new ol.layer.Tile({
        source: new ol.source.Tianditu({
        layerType: 'img'
        })
    }),
    new ol.layer.Tile({
        source: new ol.source.Tianditu({
        isLabel: true
        })
  })]
}

function initMap () {
  createLayer()
  map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({attributionOptions: {collapsed: false}})
    .extend([new Logo()]),
    view: new ol.View({
      center: ol.proj.fromLonLat([117, 36]),
      zoom: 8,
      maxZoom: 18,
      minZoom: 4,
      // projection: 'EPSG:4326'
      })        
    })   

  map.addLayer(imgLayers[0])
  map.addLayer(imgLayers[1])
}


function changeLayer (type) {
  if(type == 'img'){
    map.removeLayer(vecLayers[0])
    map.removeLayer(vecLayers[1])
    map.addLayer(imgLayers[0])
    map.addLayer(imgLayers[1])
  }else{
    map.removeLayer(imgLayers[0])
    map.removeLayer(imgLayers[1])
    map.addLayer(vecLayers[0])
    map.addLayer(vecLayers[1])
  }

}
// $("#type").prop("disabled", true);

// //设置当鼠标移动到按钮上时显示提示
// $('.ol-zoom-in, .ol-zoom-out').tooltip({
//     placement: 'right'
//   });
// $('.ol-rotate-reset, .ol-attribution button[title]').tooltip({
//     placement: 'left'
// });

export default {
    initMap,
    changeLayer
}