import ol from 'openlayers'
import {Logo} from '@supermap/iclient-openlayers'
import TDLayer from './addTDLayer'

var map
var imgLayers
var vecLayers

/**
 * 初始化地图，并加载天地图的影像作为底图
 */
function initMap1 () {
  map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({attributionOptions: {collapsed: false}})
      .extend([new ol.supermap.control.Logo()]),
    view: new ol.View({
      center: [117, 36],
      zoom: 8,
      maxZoom: 18,
      minZoom: 4,
      projection: 'EPSG:4326'
    })
  })
  TDLayer.addImgLayer(map)
}

function initMap () {
  createLayer()
  map = new ol.Map({
    target: 'map',
    controls: ol.control.defaults({attributionOptions: {collapsed: false}})
      .extend([new Logo()]),
    view: new ol.View({
      center: ol.proj.fromLonLat([117, 36]),
      zoom: 7,
      maxZoom: 18,
      minZoom: 4,
      projection: 'EPSG:3857' // 4326
    })
  })
  map.addLayer(imgLayers[0])
  map.addLayer(imgLayers[1])
}

/**
 * 创建图层组，包括矢量图层和栅格图层
 */
function createLayer () {
  vecLayers = [
    new ol.layer.Tile({
      source: new ol.source.Tianditu({
        layerType: 'vec'
      }),
      projection: '4326'
    }),
    new ol.layer.Tile({
      source: new ol.source.Tianditu({
        isLabel: true,
        projection: '4326'
      })
    })]
  imgLayers = [
    new ol.layer.Tile({
      source: new ol.source.Tianditu({
        layerType: 'img',
        projection: '4326'
      })
    }),
    new ol.layer.Tile({
      source: new ol.source.Tianditu({
        isLabel: true,
        projection: '4326'
      })
    })]
}

/**
 * 影像地图以及道路地图进行切换
 * @param {图层的类型是影像图还是道路图} type
 */
function changeLayer (type) {
  if (type === 'img') {
    TDLayer.removeVecLayer(map)
    TDLayer.addImgLayer(map)
  } else {
    TDLayer.removeImgLayer(map)
    TDLayer.addVecLayer(map)
  }
}

/**
 * 返回map对象
 */
function getMap () {
  return map
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
  changeLayer,
  getMap,
  initMap1
}
