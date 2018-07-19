import Vue from 'vue'
import Router from 'vue-router'
import cp1 from '../componets/cp1.vue'
Vue.use(Router)
export default new Router({
    routes: [{
        path: '/cp1',
        name: 'cp1',
        component: cp1
    }]
})
