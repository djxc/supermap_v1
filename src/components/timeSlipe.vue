<template>
    <div id="timeslider">
      <div class='dialog_top'>
        <li>
            <a class='close' id="timeClose" v-on:click='closeDialog'><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
      </div>
    <div id='timelineecharts'>
    </div>
    </div>
</template>
<script>
import $ from 'jquery'
import control from '../assets/commTool/controlDom'

export default {
  name: 'timeslider',
  data () {
    return {
      dname: '事件序列'
    }
  },
  methods: {
    closeDialog: function () {
      var Dialog = $('#timeslider')
      control.ShowCloseDom(Dialog, 'close')
    }
  }
}
$(function () {
})
</script>
<style>
#timeslider {
  margin-top: 30%;
  right: 2%;
  width: 42%;
  height: 30%;
}
#timelineecharts {
    height: 93%;
}
</style>
