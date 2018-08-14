<template>
  <div id='queryFeat' >
    <div class='dialog_top'>
        <li>
            <a class='close' id="rainInputClose" v-on:click='closeDialog'><img src='../assets/img/close.png' title='关闭' /></a>
        </li>
        {{ dname }}
    </div>
    <div id="querySQL">
        <label>图层：</label><br>
        <select>
            <option value ="xianqu">xianqu</option>
            <option value ="sd">sd</option>
            <option value ="watershed">watershed</option>
            <option value ="LID">LID</option>
        </select>
        <label>字段：</label><br>
        <input>
        <label>表达式：</label><br>
        <input>
    </div>
  </div>
</template>
<script>
import control from '../assets/commTool/controlDom'
import $ from 'jquery'
export default {
  name: 'query',
  data () {
    return {
      dname: '属性查询'
    }
  },
  methods: {
    closeDialog: function () {
      var Dialog = $('#queryFeat')
      control.ShowCloseDom(Dialog, 'close')
    }
  }
}
</script>
<style>
#queryFeat {
  margin-top: 2%;
  right: 2%;
  width: 12%;
  height: 40%;
}
#querySQL {
  margin-top: 2%;
  right: 2%;
  width: 12%;
  height: 40%;
}
</style>
