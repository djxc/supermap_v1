import {SuperMap} from '@supermap/iclient-openlayers'
import ol from 'openlayers'
import $ from 'jquery'

var resultLayer, SMmap, themeSource
var url = 'http://121.248.96.97:8091/iserver/services/data-swmm/rest/data'

function setMap (map) {
  SMmap = map
}

function queryFeat (map) {
  var idsParam = new SuperMap.GetFeaturesByIDsParameters({
    IDs: [6, 10],
    datasetNames: ['swmm1:watershed1']
  })
  new ol.supermap.FeatureService(url).getFeaturesByIDs(idsParam, function (serviceResult) {
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(serviceResult.result.features),
      wrapX: false
    })
    resultLayer = new ol.layer.Vector({
      source: vectorSource
    })
    map.addLayer(resultLayer)
  })
}

function sqlQuery (map) {
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: 'watershed1@swmm1',
      attributeFilter: 'dj = 10'
    },
    datasetNames: ['swmm1:watershed1']
  })
  new ol.supermap.FeatureService(url).getFeaturesBySQL(sqlParam, function (serviceResult) {
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(serviceResult.result.features),
      wrapX: false
    })
    resultLayer = new ol.layer.Vector({
      source: vectorSource
    })
    map.addLayer(resultLayer)
  })
}

/**
 * 查询
 */
function sqlQuery1 () {
  var url2 = 'http://121.248.96.97:8091/iserver/services/data-swmm/rest/data'
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams

  getFeatureParam = new SuperMap.FilterParameter({
    name: 'watershed1@swmm1',
    attributeFilter: 'SMID > -1'
  })
  getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ['swmm1:watershed1']
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
    // var features = result.features
    // for (var i = 0; i < features.length;i++){
    //   console.log(features[i])
    // }
    addThemeLayer()
    themeSource.addFeatures(result.features)
    // // 显示图例
    // document.getElementById('mapLegend').style.display = 'block'
  }
}

function addThemeLayer () {
  themeSource = new ol.source.Range('ThemeLayer',
    {
      map: SMmap,
      attributions: ' ',
      style: {
        shadowBlur: 16,
        shadowColor: '#000000',
        fillColor: '#FFFFFF'
      },
      isHoverAble: true,
      highlightStyle: {
        stroke: true,
        strokeWidth: 4,
        strokeColor: 'blue',
        fillColor: '#00EEEE',
        fillOpacity: 0.8
      },
      themeField: 'MEAN_SLOPE',
      styleGroups: [
        {
          start: 0,
          end: 5,
          style: {
            color: '#C1FFC1'
          }
        },
        {
          start: 5,
          end: 10,
          style: {
            color: '#FACE9C'
          }
        },
        {
          start: 10,
          end: 15,
          style: {
            color: '#F09C42'
          }
        },
        {
          start: 15,
          end: 18,
          style: {
            color: '#D0770B'
          }
        },
        {
          start: 18,
          end: 30,
          style: {
            color: '#945305'
          }
        }]
    })
  // 专题图层 mousemove 事件
  themeSource.on('mousemove', function (e) {
    if (e.target && e.target.refDataID) {
    //   document.getElementById('infoBox').style.display = 'block'
      var fid = e.target.refDataID
      var fea = themeSource.getFeatureById(fid)
      $('#slope').html(getnum(fea.attributes.MEAN_SLOPE))
      $('#area').html(getnum(fea.attributes.AREA))
    } else {
      // document.getElementById('infoContent').innerHTML = ''
      // document.getElementById('infoBox').style.display = 'none'
    }
  })

  var pointerInteraction = new ol.interaction.Pointer({
    // handleMoveEvent: function (event) {
    //     themeSource.fire('mouseup', event)
    // }
    handleDownEvent: function (event) {
      themeSource.fire('mousemove', event)
    }
  })
  SMmap.addInteraction(pointerInteraction)
  var themeLayer = new ol.layer.Image({
    source: themeSource
  })
  themeLayer.setOpacity(0.8)
  themeLayer.setZIndex(3)
  SMmap.addLayer(themeLayer)
}

function processFailed (e) {
  alert(e.error.errorMsg, false)
}

function getnum (num) {
  var aNew
  var re = /([0-9]+\.[0-9]{2})[0-9]*/
  aNew = num.replace(re, '$1')
  return aNew
}

export default {
  queryFeat,
  sqlQuery,
  sqlQuery1,
  setMap
}
