import ol from 'openlayers'

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://openlayers.org/en/latest/examples/data/geojson/countries.geojson',
    format: new ol.format.GeoJSON()
  })
})
// import {click, pointerMove, altKeyOnly} from 'openlayers' // ol/events/condition.js';
var select = null // ref to currently selected interaction

// select interaction working on "singleclick"
var selectSingleClick = new ol.interaction.Select()

// select interaction working on "click"
var selectClick = new ol.interaction.Select({
  condition: ol.events.condition.click
})

// select interaction working on "pointermove"
var selectPointerMove = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove
})

//   var selectAltClick = new ol.interaction.Select({
//     condition: function(mapBrowserEvent) {
//       return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent)
//     }
//   })

function changeInteraction (map, value) {
  vector.setZIndex(3)
  map.addLayer(vector)
  if (select !== null) {
    map.removeInteraction(select)
  }
  if (value === 'singleclick') {
    select = selectSingleClick
  } else if (value === 'click') {
    select = selectClick
  } else if (value === 'pointermove') {
    select = selectPointerMove
  } else {
    select = null
  }
  if (select !== null) {
    map.addInteraction(select)
    select.on('select', function (e) {
      console.log(e.target.getFeatures())
    })
  }
}
export default {
  changeInteraction
}
