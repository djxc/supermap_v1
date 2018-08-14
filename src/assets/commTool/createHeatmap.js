import ol from 'openlayers'
import {SuperMap} from '@supermap/iclient-openlayers'

var SMmap
// 创建热力图
var heatPoints = []
var heatMap

function createHeatmap () {
  var radius = 25
  var blur = 40
  heatMap = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      features: heatPoints,
      wrapX: false
    }),
    blur: blur,
    radius: radius,
    weight: 'wd'
  })
  heatMap.setZIndex(3)
  SMmap.addLayer(heatMap)
}

function getFeatures (map) {
  SMmap = map
  var url2 = 'http://121.248.96.215:8091/iserver/services/data-swmm/rest/data'
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams

  getFeatureParam = new SuperMap.FilterParameter({
    name: 'xianqu@swmm',
    attributeFilter: 'SMID > -1'
  })
  getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ['swmm:xianqu']
  })

  getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(url2, {
    format: SuperMap.DataFormat.ISERVER,
    eventListeners: {'processCompleted': processCompleted, 'processFailed': processFailed}
  })
  getFeatureBySQLService.processAsync(getFeatureBySQLParams)
}

function processCompleted (getFeaturesEventArgs) {
  var result = getFeaturesEventArgs.result
  if (result && result.features) {
    var features = result.features

    for (var i = 0; i < features.length; i++) {
      var p = features[i].geometry.points[0]
      var point = new ol.geom.Point([p.x, p.y])
      var wendu = features[i].fieldValues[15]
      heatPoints[i] = new ol.Feature({
        geometry: point
      })
      heatPoints[i].set('weight', (wendu - 30) * 10)
    }
    createHeatmap()
  }
}

function processFailed (e) {
  alert(e.error.errorMsg, false)
}

function myHeatmap () {
  var vector = new ol.layer.Heatmap({
    source: new ol.source.Vector({
      features: heatPoints
    }),
    blur: 25,
    radius: 40
  })

  vector.getSource().on('addfeature', function (event) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it from
    // the Placemark's name instead.
    var name = event.feature.get('wd')
    event.feature.set('weight', name)
  })

  // blur.addEventListener('input', function() {
  //   vector.setBlur(parseInt(blur.value, 10));
  // });

  // radius.addEventListener('input', function() {
  //   vector.setRadius(parseInt(radius.value, 10));
  // })
}

function removeHeatmap () {
  SMmap.removeLayer(heatMap)
}

export default {
  getFeatures,
  myHeatmap,
  removeHeatmap
}
