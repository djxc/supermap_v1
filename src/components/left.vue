<template>
      <div class="nav">
        <div class="nav-top">
            <div id="mini" style="border-bottom:1px solid rgba(255,255,255,.1)">
                <img src="../assets/img/mini.png">
            </div>
        </div>
        <ul id="mainul">
            <!-- 常规 -->
            <li class="nav-item">
                <a href="javascript:;">
                    <i class="my-icon nav-icon icon_1"></i>
                    <span>地图</span>
                    <i class="my-icon nav-more"></i>
                </a>
                <ul>
                    <li>
                        <a href="javascript:;" id="AddRoad">
                            <span>
                                <input type="checkbox" id="isAddRoad" /><span>路网</span></span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:;" id="AddRS">
                            <span>
                                <input type="checkbox" id="isAddRS" checked="checked"/><span>影像</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="addWFS">
                            <span>
                                <input type="checkbox" id="isAddWFS" /><span>研究区</span></span>
                        </a>
                    </li>
                </ul>
            </li>
            <!-- 数据管理 -->
            <li class="nav-item">
                <a href="javascript:;">
                    <i class="my-icon nav-icon icon_2"></i>
                    <span>数据管理</span>
                    <i class="my-icon nav-more"></i>
                </a>
                <ul>
                    <li>
                        <a href="javascript:;">
                            <span id="myDraw">编辑</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="getGeojson">
                            <span>geojson数据</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="layerTheme">
                            <span>分层设色</span>
                        </a>
                    </li>
                     <li>
                        <a href="javascript:;" id="query">
                            <span>查询</span>
                        </a>
                    </li>
                </ul>
            </li>
            <!-- 图层控制 -->
            <li class="nav-item">
                <a href="javascript:;">
                    <i class="my-icon nav-icon icon_3"></i>
                    <span>图层控制</span>
                    <i class="my-icon nav-more"></i>
                </a>
                <ul id="layerContr">
                    <li>
                        <a href="javascript:;" id="closeLayers">
                            <span>关闭所有图层</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span>
                                <input type="checkbox" id="addHeatMap" /><span>热力图</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span>
                                <input type="checkbox" id="addLID" /><span>海绵体</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span>
                                <input type="checkbox" id="addWatershed" /><span>子流域</span></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <span>
                                <input type="checkbox" id="addLegend" /><span>图例</span></span>
                        </a>
                    </li>
                </ul>
            </li>
             <!-- 地理处理 -->
            <li class="nav-item">
                <a href="javascript:;">
                    <i class="my-icon nav-icon icon_3"></i>
                    <span>地理处理</span>
                    <i class="my-icon nav-more"></i>
                </a>
                <ul>
                    <li>
                        <a href="javascript:;" id="ShowCoord">
                            <span>显示坐标</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="Render">
                            <span>渲染</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="overlayer">
                            <span>叠加分析</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="buffer">
                            <span>缓冲区分析</span>
                        </a>
                    </li>
                </ul>
            </li>
             <!-- 水文模拟 -->
            <li class="nav-item">
                <a href="javascript:;">
                    <i class="my-icon nav-icon icon_2"></i>
                    <span>水文模拟</span>
                    <i class="my-icon nav-more"></i>
                </a>
                <ul>
                    <li>
                        <a href="javascript:;" id="createRain">
                            <span>降雨模拟器</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="javascript:;" id="showRainflow">
                            <span>经流量查询</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="javascript:;" id="drawLID">
                            <span>海绵体布设</span>
                        </a>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</template>

<script>
import control from '../assets/commTool/controlDom'
import initMap from '../assets/commTool/intial'
import $ from 'jquery'
import addWFS from '../assets/commTool/addWFS'
import createTheme from '../assets/commTool/singleTheme'
import selectFeature from '../assets/commTool/selectFeature'
import Heatmap from '../assets/commTool/createHeatmap'

import '../assets/css/nav.css'
import queryFeature from '../assets/commTool/queryFeature'
import Legend from '../assets/commTool/createLegend'
import draw from './draw'

export default {
  name: 'left',
  mounted () {
  }
}
$(function () {
  // nav收缩展开
  $('.nav-item>a').on('click', function () {
    if (!$('.nav').hasClass('nav-mini')) {
      if ($(this).next().css('display') === 'none') {
        // 展开未展开
        $('.nav-item').children('ul').slideUp(300)
        $(this).next('ul').slideDown(300)
        $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show')
      } else {
        // 收缩已展开
        $(this).next('ul').slideUp(300)
        $('.nav-item.nav-show').removeClass('nav-show')
      }
    }
  })
  // nav-mini切换
  $('#mini').on('click', function () {
    if (!$('.nav').hasClass('nav-mini')) {
      $('.nav-item.nav-show').removeClass('nav-show')
      $('.nav-item').children('ul').removeAttr('style')
      $('.nav').addClass('nav-mini')
    } else {
      $('.nav').removeClass('nav-mini')
    }
  })

  $('#overlayer').on('click', function () {
    alert('此功能还没实现')
  })
  $('#buffer').on('click', function () {
    alert('此功能还没实现')
  })
  $('#query').on('click', function () {
    var queryDialog = $('#queryFeat')
    control.ShowCloseDom(queryDialog, 'show')
  })
  $('#showRainflow').on('click', function () {
    var rainflowDialog = $('#rainflow')
    queryFeature.createInteraction(initMap.getMap())
    control.ShowCloseDom(rainflowDialog, 'show')
  })

  $('#createRain').on('click', function () {
    var rainDialog = $('#rainInput')
    control.ShowCloseDom(rainDialog, 'show')
  })

  $('#layerTheme').on('click', function () {
    createTheme.createTheme(initMap.getMap())
  })

  $('#Render').on('click', function () {
    var showlayers = $('#showsm')
    control.ShowCloseDom(showlayers, 'show')
  })

  $('#myDraw').on('click', function () {
    var drawDialog = $('#draw')
    control.ShowCloseDom(drawDialog, 'show')
    draw.methods.startDraw()
  })

  // 加载网络地图
  $('#isAddWFS').change(function () {
    if ($('#isAddWFS').is(':checked')) {
      addWFS.addSM(initMap.getMap())
    } else if (!$('#isAddWFS').is(':checked')) {
      addWFS.removeSMlayer(initMap.getMap())
    }
  })

  // 加载热力图
  $('#addHeatMap').change(function () {
    if ($('#addHeatMap').is(':checked')) {
      Heatmap.getFeatures(initMap.getMap())
    } else if (!$('#addHeatMap').is(':checked')) {
      Heatmap.removeHeatmap()
    }
  })

  // 加载LID图层
  $('#addLID').change(function () {
    if ($('#addLID').is(':checked')) {
      createTheme.createLIDTheme(initMap.getMap())
    } else if (!$('#addLID').is(':checked')) {
      createTheme.removeLIDlayer()
    }
  })

  // 加载子流域图层addWatershed
  $('#addWatershed').change(function () {
    if ($('#addWatershed').is(':checked')) {
      queryFeature.setMap(initMap.getMap())
      queryFeature.sqlQuery1('watershed')
    } else if (!$('#addWatershed').is(':checked')) {
      queryFeature.removeWatershedLayer()
    }
  })

  // 海绵体布设GreenManager
  $('#drawLID').on('click', function () {
    var GreenDialog = $('#GreenManager')
    control.ShowCloseDom(GreenDialog, 'show')
  })

  // 加载图例
  $('#addLegend').change(function () {
    if ($('#addLegend').is(':checked')) {
      Legend.getMapPoint(initMap.getMap())
    } else if (!$('#addLegend').is(':checked')) {
      Legend.removeLegend()
    }
  })

  $('#getGeojson').on('click', function () {
    selectFeature.changeInteraction(initMap.getMap(), 'click')
  })

  var showImg = $('#isAddRS')
  var showVec = $('#isAddRoad')

  showImg.change(function () {
    if (showImg.is(':checked')) {
      initMap.changeLayer('img')
      if (showVec.is(':checked')) {
        showVec.prop('checked', false)
      }
    } else if (!showImg.is(':checked')) {
      initMap.changeLayer('vec')
      if (!showVec.is(':checked')) {
        showVec.prop('checked', true)
      }
    }
  })

  showVec.change(function () {
    if (showVec.is(':checked')) {
      initMap.changeLayer('vec')
      if (showImg.is(':checked')) {
        showImg.prop('checked', false)
      }
    } else if (!showVec.is(':checked')) {
      initMap.changeLayer('img')
      if (!showImg.is(':checked')) {
        showImg.prop('checked', true)
      }
    }
  })
})
</script>
<style>
</style>
