<template>
  <div class="login">
    <label>{{uname}}</label><input class="input"/><br>
    <label>{{password}}</label><input class="input"/><br>
    <div class="btndiv">
        <button id="login" v-on:click="login">登录</button>
        <button id="regist" v-on:click="regist">注册</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dj',
  data () {
    return {
      msg: '爱是恒久忍耐又有恩赐',
      uname: '用户名: ',
      password: '密  ...码: '
    }
  },
  methods: {
    login: function () {
      this.$router.push({path: '/home'})// 实现页面跳转
    },
    regist: function () { }
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
label {
    color:chartreuse;
    font-size: 30px;
}
.login {
    background-color:darkorchid;
    width: 40%;
    height: 30%;
    margin-left: 30%;
    margin-top: 15%;
    padding: 50px 10px 50px 10px;
}
.btndiv {
    text-align:center;
    width: 15;
    margin-top: 50px;
}
#login {
    margin-right: 50px;
    font-size: 18px;
}
#regist {
    margin-left: 50px;
    font-size: 18px;
}
.input {
    height: 23px;
}
</style>
