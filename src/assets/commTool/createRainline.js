import $ from 'jquery'

function createRainLine () {
  var time = $('#rainTime').val()
  var period = $('#period').val() // rainInput.data().period
  var coeffici = $('#coeffici').val() // rainInput.data().coeffici
  var rainTimeSeries = caculateRain(coeffici, period, time)
  return rainTimeSeries
}

function caculateRain (r, p, t) {
  var c = 0.56
  var q = 167 * 2094 * (1 + c * Math.log10(p))
  var z = parseInt(r * t)
  var rainTimeSeries = []
  for (var yb = z; yb > -1; yb--) {
    var wb = (((1 - 0.633) * yb / r) + 8.875) / Math.pow((yb / r) + 8.875, 0.633 + 1)
    var ib = q * wb
    var RainfallIntensityb = (ib / 27889.678).toFixed(4)
    rainTimeSeries.push(RainfallIntensityb)
  }
  for (var ya = 1; ya < t - z + 1; ya++) {
    var wa = (((1 - 0.633) * ya / (1 - r)) + 8.875) / Math.pow((ya / (1 - r)) + 8.875, 0.633 + 1)
    var ia = q * wa
    var RainfallIntensitya = (ia / 27889.678).toFixed(4)
    rainTimeSeries.push(RainfallIntensitya)
  }
  return rainTimeSeries
}

export default {
  createRainLine
}
