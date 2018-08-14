<template>
    <div id="myheader">
      <div>
        <h1>{{ msg }}</h1>
      </div>
    </div>
</template>
<script>
export default {
  name: 'myheader',
  data () {
    return {
      msg: '海绵城市雨洪管理系统'
    }
  }
}
</script>
<style>
h1, h2 {
  font-weight: normal;
  color: #42b983;
}
#myheader {
  background-color: #263238;
  position: absolute;
  width: 100%;
  height: 6.7%;
  left: 0px;
  top: 0px;
  padding: 0px;
  margin: 0px;
}
</style>
