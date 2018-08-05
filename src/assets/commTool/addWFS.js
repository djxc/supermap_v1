import ol from 'openlayers'
import '@supermap/iclient-openlayers'
import $ from 'jquery'

function addWFS (map) {
  // ======================================方法二
  // 参数字段
  var wfsParams = {
    service: 'WFS',
    version: '1.1.0',
    request: 'GetFeature',
    typeName: 'topp:states', // 图层名称
    outputFormat: 'text/javascript', // 重点，不要改变
    format_options: 'callback:loadFeatures' // 回调函数声明
  }

  // 使用jsonp，可以解决跨域的问题，GeoServer中的web.xml文件关于jsonp的注释要去掉，就可以支持跨域了
  var vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    loader: function (extent, resolution, projection) { // 加载函数
      var url = 'http://localhost:8081/geoserver/wfs'
      $.ajax({
        url: url,
        data: $.param(wfsParams), // 传参
        type: 'GET',
        dataType: 'jsonp', // 解决跨域的关键
        jsonpCallback: 'loadFeatures' // 回调
      })
    },
    strategy: ol.loadingstrategy.tile(new ol.tilegrid.createXYZ({
      maxZoom: 18
    })),
    projection: 'EPSG:4326'
  })
  // 回调函数使用
  window.loadFeatures = function (response) {
    // 坐标转换，将返回的数据的坐标转换到当前使用地图的坐标系，否则，无法正常显示
    vectorSource.addFeatures((new ol.format.GeoJSON()).readFeatures(response, {
      dataProjection: 'EPSG:4326', // 设定JSON数据使用的坐标系
      featureProjection: 'EPSG:4326' // 设定当前地图使用的feature的坐标系
    })) // 载入要素
  }
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  })
  map.addLayer(vectorLayer)
}

function addSM (map) {
  var url = 'http://121.248.96.97:8091/iserver/services/map-testSWMM/rest/maps/watershed@djtest'
  var layer = new ol.layer.Tile({
    source: new ol.source.TileSuperMapRest({
      url: url,
      wrapX: true
    }),
    projection: 'EPSG:4326'
  })
  map.addLayer(layer)
}

export default {
  addWFS,
  addSM
}
