<template>
  <div id="showsm">
      <div class="dialog_top">
        <li id="rain_close">
            <a class="close"><img src="../assets/img/close.png" title="关闭" /></a>
        </li>
        {{ dname }}
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
    var showlayers = $('#showsm')
    controlLayer.ShowCloseDom(showlayers, 'close')
  })
})
</script>
<style>
#showsm {
  position: absolute;
  background-color: brown;
  display: none;
  margin-top: 2%;
  right: 2%;
  width: 10%;
  height: 40%;
}
#dialog_top {
    background-color: aqua;
}

div[id="rain_close"] li:hover{
  transform:scale(1.2,1.2);
}
</style>
