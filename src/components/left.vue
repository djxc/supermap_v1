<template>
      <div class="nav">
        <div class="nav-top">
            <div id="mini" style="border-bottom:1px solid rgba(255,255,255,.1)">
                <img src="../assets/img/mini.png">
            </div>
        </div>
        <ul>
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
                                <input type="checkbox" id="isAddRoad" />&amp;&amp;路网</span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:;" id="AddRS">
                            <span>
                                <input type="checkbox" id="isAddRS" checked="checked"/>&amp;&amp;影像</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="AddWMS">
                            <span>
                                <input type="checkbox" id="isAddWMS" />&amp;&amp;WMS</span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:;" id="addWFS">
                            <span>
                                <input type="checkbox" id="isAddWFS" />&amp;&amp;WFS</span>
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
                            <span id="myDraw">开始编辑 &amp;&amp;</span>
                            <select id="type">
                                <option value="Point">Point</option>
                                <option value="LineString">LineString</option>
                                <option value="Polygon">Polygon</option>
                                <option value="Circle">Circle</option>
                                <option value="None">None</option>
                            </select>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="exportMap">
                            <span>导出地图</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="getFeature">
                            <span>获取地图要素</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="getGeojson">
                            <span>加载geojson数据</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="Geojsonlayer">
                            <span>加载geojson图层</span>
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
                        <a href="javascript:;">
                            <span id="myCluster">聚类分析</span>&amp;&amp;
                            <input id="distance" value="40" />
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
                        <a href="javascript:;" id="createPa">
                            <span>
                                <input type="checkbox" id="isAddAnno" />&amp;&amp;添加节点</span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:;" id="Ad">
                            <span>
                                <input type="checkbox" id="isAddRoad" />&amp;&amp;路网</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" id="showLayers">
                            <span>显示所有图层</span>
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

export default {
  name: 'left',
  mounted () {
    // control.initMap()
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
      console.log('add wfs')
      addWFS.addWFS(initMap.getMap())
      console.log(initMap.getMap())
    } else if (!$('#isAddWFS').is(':checked')) {
      console.log('remove wfs')
    }
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
