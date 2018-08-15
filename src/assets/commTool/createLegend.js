import ol from 'openlayers'
// import Legend from './Legend'

/**
 * 图例数据
 */
var SMmap, layers
var drawL = false
var dataObj = [{
    tname: '经流系数大',
    color: 'rgb(30, 80, 150)',
}, {
    tname: '经流系数较大',
    color: 'rgb(100, 120, 180)',
}, {
    tname: '经流系数一般',
    color: 'rgb(140, 160, 200)',
},
{
    tname: '经流系数较小',
    color: 'rgb(180, 200, 220)',
}, {
    tname: '经流系数小',
    color: 'rgb(210, 255, 250)',
}]

/**
 * 图例经纬度坐标,地图绑定了单击事件
 * 单击返回经纬度并重新绘制canvas
 */
var removeData = {
    tx: 118.82368355230953,
    ty: 32.2359887979324
}
var canvas = document.createElement('canvas')

/**
 * 绘制图例
 */
function drawLegendMethod() {
  layers = new ol.layer.Vector({
    type: 'tuli',
    source: new ol.source.Vector(),
    zIndex: 9
  })
  var shape = new ol.Feature({
    geometry: new ol.geom.Point([removeData.tx, removeData.ty])
  })

  var ctx = canvas.getContext("2d")
  var yheight = 30
  yheight += dataObj.length * 27 // 计算canvas高度
  canvas.width = 180
  canvas.height = yheight

  /*设置图例样式*/
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, 200, yheight) // 绘制底图
  ctx.font = "16px Arial"
  ctx.fillStyle = "#000"
  ctx.fillText('图例', canvas.width / 2.5, 25)
  for(var i = 0; i < dataObj.length; i++) {
    // 实现文字前面带色块
    ctx.fillStyle = dataObj[i].color // 块颜色
    ctx.fillRect(10, 60 + (i - 1) * 25, 15, 15) // 颜色块：x,y,w,h
    
    ctx.font = '12px Arial'
    ctx.fillStyle = '#555'
    ctx.fillText(dataObj[i].tname, 45, 72 + (i - 1) * 25) // 文字    
    // 添加图片方法一，实现文字前面带图片，移动图例不会出现闪烁
    // drawImg_first('xiushan.png', i)    
    // 添加图片方法二，移动图例会出现闪烁
    // drawImg_Second(ctx, 'xiushan.png', i)
  }
  // 将canvas添加到样式中
  var style = new ol.style.Style({
    image: new ol.style.Icon({
      img: canvas,
      imgSize: [canvas.width, canvas.height]
    })
  })
  shape.setStyle(style)
  layers.getSource().addFeature(shape)
  layers.setZIndex(3)
  SMmap.addLayer(layers)
}

/**
 * 将绘制完成的图片添加到canvas上
 * @param {图片对象} imgObj
 * @param {循环序号，确定图片坐标} p
 */
function drawTuliImage (imgObj, p) {
  var ctxImge = canvas.getContext('2d')
  ctxImge.drawImage(imgObj, 5, 30 + (p * 25), 24, 26)
}

/*
* 绘制图例上的图片，方法一
* 此方法能解决重绘canvas时图片闪烁留白的问题
* @imgs：图片名称
* @p:序号
* @complete：HTMLImageElement对象的一个属性，可以判断图片加载完成
*/
function drawImg_first (imgs, p) {
  var imgObj = new Image()
  imgObj.src = 'img/' + imgs
  // 如果图片加载完成
  if (imgObj.complete) {
    drawTuliImage(imgObj, p)
  } else {
    // onload：重绘，重新加载
    imgObj.onload = function () {
      drawTuliImage(imgObj, p)
    }
    // 加载失败
    imgObj.onerror = function () {
      console.log('canvas图片加载失败,请重试！')
    }
  }
}

/*
    * 添加数据前面的图片，方法二
    * 此方法绘制图片会出现闪烁留白情况，
    * @ctx：绘图环境
    * @imgs:图片名称
    * @p:循环序号
    */
function drawImg_Second (ctx, imgs, p) {
  var imgObj = new Image()
  imgObj.src = 'img/' + imgs
  imgObj.onload = function () {
    ctx.drawImage(imgObj, 5, 30 + (p * 25), 25, 27)
  }
}

/*
    * 添加图例之前删除原来
    * 引用类型。length会变化,for循环倒着删除
    * @deType:要删除的覆盖物名称
    */
function addNewsChartsDelectOring (deType) {
  var layersArr = SMmap.getLayers().getArray() // 获取所有覆盖物
  // 移除全部
  if (deType === 'all') {
    for (var i = layersArr.length - 1; i >= 0; i--) {
      var ltype = layersArr[i].get('type')
      if (ltype === 'tuli') SMmap.removeLayer(layersArr[i])
    }
    return null
  } else { // 移除具体
    for (var i1 = layersArr.length - 1; i1 >= 0; i1--) {
      var ltype1 = layersArr[i1].get('type')
      if (ltype1 === deType) SMmap.removeLayer(layersArr[i1])
    }
    return null
  }
}

// 地图单击事件
function getMapPoint (map) {
  drawL = true
  SMmap = map
  SMmap.on('click', function (evt) {
    if (drawL === true) {
      var point = evt.coordinate // 鼠标单击点坐标
      removeData.tx = point[0]
      removeData.ty = point[1]
      addNewsChartsDelectOring('all')
      drawLegendMethod()
    }
  })
}

function removeLegend () {
  SMmap.removeLayer(layers)
  drawL = false
}

export default {
  getMapPoint,
  removeLegend
}
