import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './vuex'
import axios from 'axios'
//引入Mint UI
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'; 
Vue.use(Mint);
// 可以直接在组件中使用this.$ajax
Vue.prototype.$axios = axios

//引入mock.js
import './mock/mock.js'
new Vue({
    el: '#app',
    router,
    store,
    render: (c) => { 
       return  c(App);
    }
})
