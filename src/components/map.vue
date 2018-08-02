<template>
  <div class='dj'>
    <div id='map'>
    </div>
        <!-- 点击弹出窗口 -->
    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import initMap from '../assets/commTool/intial'

export default {
  name: 'dj',
  data () {
    return {
      msg: '爱是恒久忍耐又有恩赐,爱是不嫉妒'
    }
  },
  methods: {
    createMap: function () {     
    }
  },
  mounted () {
    initMap.initMap()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#map {
  position: absolute;
  background-color: #42b983;
  top: 6.7%;
  width: 100%;
  height: 93.3%;
  left: 0px;
  margin-top: 0px;
}

</style>
