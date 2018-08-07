import ol from 'openlayers'
import {SuperMap} from '@supermap/iclient-openlayers'

function createTheme (map) {
  var themeRangeItem1, themeRangeItem2,
    themeRangeItem3, themeRangeItem4, themeRangeItem5,
    themeRange, themeLayer

  themeRangeItem1 = new SuperMap.ThemeRangeItem({
    start: 0,
    end: 5,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(211, 255, 250),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem2 = new SuperMap.ThemeRangeItem({
    start: 5,
    end: 10,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(178, 218, 199),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem3 = new SuperMap.ThemeRangeItem({
    start: 10,
    end: 15,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(58, 178, 166),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem4 = new SuperMap.ThemeRangeItem({
    start: 15,
    end: 20,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(30, 120, 130),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRangeItem5 = new SuperMap.ThemeRangeItem({
    start: 20,
    end: 30,
    style: new SuperMap.ServerStyle({
      fillForeColor: new SuperMap.ServerColor(0, 80, 90),
      lineColor: new SuperMap.ServerColor(179, 209, 193),
      lineWidth: 0.1
    })
  })

  themeRange = new SuperMap.ThemeRange({
    rangeExpression: 'mean_slope',
    rangeMode: SuperMap.RangeMode.EQUALINTERVAL,
    items: [themeRangeItem1, themeRangeItem2, themeRangeItem3, themeRangeItem4, themeRangeItem5]
  })
  var themeParameters = new SuperMap.ThemeParameters({
    datasetNames: ['watershed'],
    dataSourceNames: ['djtest'],
    joinItems: null,
    themes: [themeRange]
  })
  var url = 'http://121.248.96.97:8091/iserver/services/map-testSWMM/rest/maps/watershed@djtest'
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
      map.addLayer(themeLayer)
    }
  })
}

export default {
  createTheme
}
