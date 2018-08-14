import ol from 'openlayers'
import {SuperMap} from '@supermap/iclient-openlayers'

var SMmap
var themeRangeItem1, themeRangeItem2,
  themeRangeItem3, themeRangeItem4, themeRangeItem5,
  themeRangeItem6, themeRangeItem7, themeRangeItem8,
  themeRangeItem9, themeRangeItem10,
  themeRange, themeLayer
var themeUniqueItemes, LIDthemelayer,
  style1
function createRangeItems () {
  themeRangeItem1 = new SuperMap.ThemeRangeItem({
    start: 0,
    end: 0.05,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(230, 255, 250),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem2 = new SuperMap.ThemeRangeItem({
    start: 0.05,
    end: 0.1,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(210, 220, 230),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem3 = new SuperMap.ThemeRangeItem({
    start: 0.1,
    end: 0.3,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(180, 200, 220),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem4 = new SuperMap.ThemeRangeItem({
    start: 0.3,
    end: 0.5,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(160, 180, 210),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem5 = new SuperMap.ThemeRangeItem({
    start: 0.5,
    end: 0.7,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(140, 160, 200),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem6 = new SuperMap.ThemeRangeItem({
    start: 0.7,
    end: 0.9,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(120, 140, 190),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem7 = new SuperMap.ThemeRangeItem({
    start: 0.9,
    end: 1.2,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(100, 120, 180),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem8 = new SuperMap.ThemeRangeItem({
    start: 1.2,
    end: 1.5,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(80, 100, 170),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem9 = new SuperMap.ThemeRangeItem({
    start: 1.5,
    end: 1.8,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(60, 90, 160),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem10 = new SuperMap.ThemeRangeItem({
    start: 1.8,
    end: 3,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(30, 80, 150),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })
}

/**
 * 根据rainflow实时变化显示地图，表示经流量变化
 * @param {*} map
 */
function createTheme (map) {
  SMmap = map
  createRangeItems()
  themeRange = new SuperMap.ThemeRange({
    rangeExpression: 'rainflow',
    rangeMode: SuperMap.RangeMode.EQUALINTERVAL,
    items: [themeRangeItem1, themeRangeItem2, themeRangeItem3, themeRangeItem4, themeRangeItem5,
      themeRangeItem6, themeRangeItem7, themeRangeItem8, themeRangeItem9, themeRangeItem10]
  })
  var themeParameters = new SuperMap.ThemeParameters({
    datasetNames: ['watershed1'],
    dataSourceNames: ['swmm'],
    joinItems: null,
    themes: [themeRange]
  })
  var url = 'http://121.248.96.215:8091/iserver/services/map-swmm/rest/maps/watershed1@swmm'
  new ol.supermap.ThemeService(url).getThemeInfo(themeParameters, function (serviceResult) {
    var result = serviceResult.result
    if (result && result.newResourceID) {
      themeLayer = new ol.layer.Tile({
        source: new ol.source.TileSuperMapRest({
          url: url,
          noWrap: true,
          cacheEnabled: false,
          layersID: result.newResourceID,
          transparent: true
        })
      })
      themeLayer.setZIndex(3)
      SMmap.addLayer(themeLayer)
    }
  })
}

/**
 * 创建唯一值样式
 */
function createthemeUniqueIteme () {
  var style2, style3, style4, style5, style6
  style1 = new SuperMap.ServerStyle({
    fillForeColor: new SuperMap.ServerColor(248, 203, 249),
    lineColor: new SuperMap.ServerColor(255, 255, 255),
    lineWidth: 0.1
  })
  style2 = new SuperMap.ServerStyle({
    fillForeColor: new SuperMap.ServerColor(196, 255, 189),
    lineColor: new SuperMap.ServerColor(255, 255, 255),
    lineWidth: 0.1
  })
  style3 = new SuperMap.ServerStyle({
    fillForeColor: new SuperMap.ServerColor(255, 173, 173),
    lineColor: new SuperMap.ServerColor(255, 255, 255),
    lineWidth: 0.1
  })
  style4 = new SuperMap.ServerStyle({
    fillForeColor: new SuperMap.ServerColor(255, 239, 168),
    lineColor: new SuperMap.ServerColor(255, 255, 255),
    lineWidth: 0.1
  })
  style5 = new SuperMap.ServerStyle({
    fillForeColor: new SuperMap.ServerColor(173, 209, 255),
    lineColor: new SuperMap.ServerColor(255, 255, 255),
    lineWidth: 0.1
  })
  style6 = new SuperMap.ServerStyle({
    fillForeColor: new SuperMap.ServerColor(132, 164, 232),
    lineColor: new SuperMap.ServerColor(255, 255, 255),
    lineWidth: 0.1
  })

  var themeUniqueIteme1 = new SuperMap.ThemeUniqueItem({
      unique: '1',
      style: style1
    }),
    themeUniqueIteme2 = new SuperMap.ThemeUniqueItem({
      unique: '2',
      style: style2
    }),
    themeUniqueIteme3 = new SuperMap.ThemeUniqueItem({
      unique: '3',
      style: style3
    }),
    themeUniqueIteme4 = new SuperMap.ThemeUniqueItem({
      unique: '4',
      style: style4
    }),
    themeUniqueIteme5 = new SuperMap.ThemeUniqueItem({
      unique: '5',
      style: style5
    })

  themeUniqueItemes = [
    themeUniqueIteme1, themeUniqueIteme2, themeUniqueIteme3, themeUniqueIteme4, themeUniqueIteme5
  ]
}

/**
 * 加载LID图层
 * @param {*} map
 */
function createLIDTheme (map) {
  SMmap = map
  createthemeUniqueIteme()

  var themeUnique = new SuperMap.ThemeUnique({
    uniqueExpression: 'type',
    items: themeUniqueItemes,
    defaultStyle: style1
  })
  var themeParameters = new SuperMap.ThemeParameters({
    datasetNames: ['LID'],
    dataSourceNames: ['swmm'],
    themes: [themeUnique]
  })
  var url = 'http://121.248.96.215:8091/iserver/services/map-swmm/rest/maps/LID@swmm'
  new ol.supermap.ThemeService(url).getThemeInfo(themeParameters, function (serviceResult) {
    var result = serviceResult.result
    if (result && result.newResourceID) {
      LIDthemelayer = new ol.layer.Tile({
        source: new ol.source.TileSuperMapRest({
          url: url,
          noWrap: true,
          cacheEnabled: false,
          layersID: result.newResourceID,
          transparent: true
        })
      })
      LIDthemelayer.setZIndex(4)
      map.addLayer(LIDthemelayer)
    }
  })
}

function removeTheme () {
  SMmap.removeLayer(themeLayer)
}

function removeLIDlayer () {
  SMmap.removeLayer(LIDthemelayer)
}

export default {
  createTheme,
  removeTheme,
  createLIDTheme,
  removeLIDlayer
}
