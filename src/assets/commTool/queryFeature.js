import '@supermap/iclient-openlayers'
import ol from 'openlayers'

var resultLayer,
  url = 'http://121.248.96.97:8091/iserver/services/data-swmm/rest/data'

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
        map.addLayer(resultLayer);
    })
}
function sqlQuery(map) {
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: {
            name: "watershed1@swmm1",
            attributeFilter: "dj = 10"
        },
        datasetNames: ['swmm1:watershed1']
    });
    new ol.supermap.FeatureService(url).getFeaturesBySQL(sqlParam, function (serviceResult) {
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(serviceResult.result.features),
            wrapX: false
        });
        resultLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(resultLayer);
    });
}

export default {
  queryFeat,
  sqlQuery
}
