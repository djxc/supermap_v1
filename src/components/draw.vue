<template>
  <div id="draw">
    <div id="dialog_top">
        <li>
            <a class="close" id="drawClose"><img src="../assets/img/close.png" title="关闭" /></a>
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
  $('#drawClose').on('click', function () {
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

div[id="rain_close"] li:hover{
  transform:scale(1.2,1.2);
}
</style>
