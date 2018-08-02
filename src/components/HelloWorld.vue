<template>
  <div class="hello">
    <head-com></head-com>
    <map-com></map-com>
    <left-com></left-com>
  </div>
</template>

<script>
import map from './map'
import left from './left'
import myheader from './myheader'
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: 'dj',
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ]
    }
  },
  methods: {
    reverseMessage: function () {
      alert('test')
      // this.msg = this.msg.split('').reverse().join('')
    }
  },
  components: {
    'map-com': map,
    'left-com': left,
    'head-com': myheader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
