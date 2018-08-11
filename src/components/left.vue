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
                                <input type="checkbox" id="isAddWFS" /><span>WFS</span></span>
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
                            <span id="myDraw">开始编辑</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="getFeature">
                            <span>获取地图要素</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="getGeojson">
                            <span>geojson数据</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="sqlQuery">
                            <span>sqlQuery</span>
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
                            <span>雨型模拟器</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="javascript:;" id="timeline">
                            <span>事件序列</span>
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
                        <a href="javascript:;" id="">
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
import query from '../assets/commTool/queryFeature'
import createTime from '../assets/commTool/createTimeline'
import selectFeature from '../assets/commTool/selectFeature'
import '../assets/css/nav.css'

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

  $('#query').on('click', function () {
    // query.queryFeat(initMap.getMap())
    query.sqlQuery(initMap.getMap())
  })
  $('#showRainflow').on('click', function () {
    var rainflowDialog = $('#rainflow')
    query.createInteraction(initMap.getMap())
    control.ShowCloseDom(rainflowDialog, 'show')
  })
  $('#timeline').on('click', function () {
    var timesliderDialog = $('#timeslider')
    control.ShowCloseDom(timesliderDialog, 'show')
    createTime.createTime(initMap.getMap())
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
  })

  $('#isAddWFS').change(function () {
    if ($('#isAddWFS').is(':checked')) {
      addWFS.addSM(initMap.getMap())
    } else if (!$('#isAddWFS').is(':checked')) {
      addWFS.removeSMlayer(initMap.getMap())
    }
  })
  $('#getGeojson').on('click', function () {
    selectFeature.changeInteraction(initMap.getMap(), 'click')
  })
  $('#sqlQuery').on('click', function () {
    query.setMap(initMap.getMap())
    query.sqlQuery1()
    // var drawDialog = $('#attrtable')
    // control.ShowCloseDom(drawDialog, 'show')
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
