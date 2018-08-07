<template>
  <div id="attrtable">
    <div class='dialog_top'>
        <li>
            <a class='close' id="rainInputClose" v-on:click='closeDialog'><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ name }}
    </div>
    <div id="featattr">
        <label>平均坡度：</label><label id="slope">0.00</label>
        <label>面积(公顷)：</label><label id="area">0.00</label>
    </div>
  </div>
</template>
<script>
import control from '../assets/commTool/controlDom'
import $ from 'jquery'
export default {
  name: 'selectFeat',
  data () {
    return {
      name: '属性查询',
      slope: 0
    }
  },
  methods: {
    closeDialog: function () {
      var Dialog = $('#attrtable')
      control.ShowCloseDom(Dialog, 'close')
    },
    changeSlope: function (s) {
      this.slope = s
    }
  }
}
</script>
<style>
#attrtable {
  margin-top: 2%;
  right: 2%;
  width: 12%;
  height: 40%;
}
#featattr {
  margin-top: 20px;
}
</style>
