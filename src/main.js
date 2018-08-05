// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import './assets/fonts/iconfont.css'
import './assets/css/htmleaf-demo.css'
import './assets/css/nav.css'
import './assets/css/info.css'
import './assets/css/cssCharts.css'
import './assets/css/font-awesome.css'
import './assets/css/fonts_goole.css'
import './assets/css/mycss.css'

require('./assets/css/iclient9-openlayers.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
