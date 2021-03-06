import {SuperMap} from '@supermap/iclient-openlayers'
import ol from 'openlayers'
import createEcharts from './createEchart'
import $ from 'jquery'

var resultLayer, SMmap, themeSource, layername, themeLayer
// var url = 'http://116.196.88.174:8090/iserver/services/data-swmm/rest/data'
var url = 'http://121.248.96.215:8091/iserver/services/data-swmm/rest/data'
function setMap (map) {
  SMmap = map
}

function queryFeat (map) {
  var idsParam = new SuperMap.GetFeaturesByIDsParameters({
    IDs: [6, 10],
    datasetNames: ['swmm:watershed1']
  })
  new ol.supermap.FeatureService(url).getFeaturesByIDs(idsParam, function (serviceResult) {
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(serviceResult.result.features),
      wrapX: false
    })
    resultLayer = new ol.layer.Vector({
      source: vectorSource
    })
    resultLayer.setZIndex(3)
    map.addLayer(resultLayer)
  })
}

function sqlQuery (map) {
  var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: {
      name: 'watershed1@swmm',
      attributeFilter: 'smid = 10'
    },
    datasetNames: ['swmm:watershed1']
  })
  new ol.supermap.FeatureService(url).getFeaturesBySQL(sqlParam, function (serviceResult) {
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(serviceResult.result.features),
      wrapX: false
    })
    resultLayer = new ol.layer.Vector({
      source: vectorSource
    })
    resultLayer.setZIndex(3)
    map.addLayer(resultLayer)
  })
}

/**
 * 查询
 */
function sqlQuery1 (name) {
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams
  layername = name
  getFeatureParam = new SuperMap.FilterParameter({
    name: layername + '@swmm',
    attributeFilter: 'SMID > -1'
  })
  getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ['swmm:' + layername]
  })

  getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(url, {
    format: SuperMap.DataFormat.ISERVER,
    eventListeners: {'processCompleted': processCompleted, 'processFailed': processFailed}
  })
  getFeatureBySQLService.processAsync(getFeatureBySQLParams)
}

/**
 * 查询图层中所有的要素
 * @param {*} name
 */
function queryLID (name) {
  layername = name
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams

  getFeatureParam = new SuperMap.FilterParameter({
    name: layername + '@swmm',
    attributeFilter: 'SMID > -1'
  })
  getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ['swmm:' + layername]
  })

  getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(url, {
    format: SuperMap.DataFormat.ISERVER,
    eventListeners: {'processCompleted': processCompleted, 'processFailed': processFailed}
  })
  getFeatureBySQLService.processAsync(getFeatureBySQLParams)
}

/**
 * 查询成功后，需要进行的处理
 * @param {*} getFeaturesEventArgs
 */
function processCompleted (getFeaturesEventArgs) {
  var result = getFeaturesEventArgs.result
  if (result && result.features) {
    if (layername === 'LID') {
      console.log(result.features.length)
    } else if (layername === 'watershed') {
      addThemeLayer()
      themeSource.addFeatures(result.features)
    }
  }
}

function addThemeLayer () {
  // 分层设色
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
  themeLayer = new ol.layer.Image({
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

/**
 * 使用ajax向后台传递数据：id，根据id查询数据库，返回经流量数据
 * @param {*} id
 */
function postajax (id, time) {
  $.ajax({
    url: 'http://121.248.96.215:8088/dj',
    type: 'POST',
    // contentType: 'application/json;charset=utf-8',
    data: {'id': id, 'time': time},
    dataType: 'json',
    success: function (result) {
      var rainflow = result.rainflow
      var lidrainflow = result.lidrainflow
      console.log(lidrainflow)
      createEcharts.showRainflow(rainflow, lidrainflow)
    },
    error: function (msg) {
      console.log('failed')
      console.log(msg)
    }
  })
}

/**
 * 添加点击事件，获取点击对象的属性
 * @param {*} SMmap
 */
function createInteraction (SMmap) {
  // 专题图层 mousemove 事件
  if (themeSource != null) {
    themeSource.on('mousemove', function (e) {
      if (e.target && e.target.refDataID) {
        var fid = e.target.refDataID
        var fea = themeSource.getFeatureById(fid)
        var id = fea.attributes.SMID
        var time = $('#rainTime').val()
        postajax(id, time)
        $('#slope').html(getnum(fea.attributes.MEAN_SLOPE))
        $('#area').html(getnum(fea.attributes.AREA))
      }
    })
  } else {
    alert('请先加载子流域图层！')
  }

  var pointerInteraction = new ol.interaction.Pointer({
    handleDownEvent: function (event) {
      themeSource.fire('mousemove', event)
    }
  })
  SMmap.addInteraction(pointerInteraction)
}

function removeWatershedLayer () {
  SMmap.removeLayer(themeLayer)
}

export default {
  queryFeat,
  sqlQuery,
  sqlQuery1,
  setMap,
  createInteraction,
  queryLID,
  removeWatershedLayer
}
