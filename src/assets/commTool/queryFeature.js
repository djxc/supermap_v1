import '@supermap/iclient-openlayers'
import ol from 'openlayers'

function queryFeat (map) {
    var idsParam = new SuperMap.GetFeaturesByIDsParameters({
        IDs: [246, 247],
        datasetNames: ["World:Countries"]
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

export default {
  queryFeat
}
