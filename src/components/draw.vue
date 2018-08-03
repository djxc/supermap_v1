<template>
  <div id="draw">
    <div id="rain_top">
        <li id="rain_close">
            <a class="selected"><img src="../assets/img/close.png" title="关闭" /></a>
        </li>
        {{ dname }}
    </div>
    <div>
        <button>point</button>
        <button>line</button>
        <button>polygon</button>
        <button>point</button>
    </div>
   </div>
</template>

<script>
import controlLayer from '../assets/commTool/controlDom'
import $ from 'jquery'
export default {
  name: 'myDialog',
  data () {
    return {
      dname: '编辑'
    }
  }
}
$(function () {
  $('.selected').on('click', function () {
    var drawDialog = $('#draw')
    controlLayer.ShowCloseDom(drawDialog, 'close')
  })
})
</script>
<style>
#draw {
  position: absolute;
  background-color: brown;
  display: none;
  margin-top: 2%;
  right: 2%;
  width: 30%;
  height: 15%;
}
#rain_top {
    background-color: aqua;
}
.selected {
    float: right;
}
div[id="rain_close"] li:hover{
  transform:scale(1.2,1.2);
}
</style>
