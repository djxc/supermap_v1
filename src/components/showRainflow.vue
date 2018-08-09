<template>
  <div id='rainflow' >
    <div class='dialog_top'>
        <li>
            <a class='close' id='rainflowClose' v-on:click="rainClose"><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
    </div>
    <div id='rainflowEcharts'>
    </div>
  </div>
</template>
<script>
import controlLayer from '../assets/commTool/controlDom'
import $ from 'jquery'

export default {
  name: 'rainflow',
  data () {
    return {
      dname: '经流量'
    }
  },
  mounted () {
  },
  methods: {
    rainClose: function () {
      var rainDialog = $('#rainflow')
      controlLayer.ShowCloseDom(rainDialog, 'close')
    }
  }
}
</script>
<style>
#rainflow {
  position: absolute;
  background-color: rgb(223, 240, 223);
  margin-top: 30%;
  right: 2%;
  width: 40%;
  height: 30%;
}
#rainflowEcharts {
    background-color: thistle;
    height: 95%;
    border-radius:0px 0px 25px 25px;
    -moz-border-radius:25px;
}
</style>
