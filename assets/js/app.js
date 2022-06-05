import Vue from './vendor/vue.js'
import Router from './vendor/vue-router.js'

import get_template from './components/get_template.js'
Vue.use(VueMask.VueMaskPlugin);

import page_home from './view/home/home.js'
Vue.component('p-home', page_home)

import page_finalizar from './view/finalizar/home.js'
Vue.component('p-finalizar', page_finalizar)

import page_atendimento from './view/atendimento/home.js'
Vue.component('p-atendimento', page_atendimento)

import page_jms from './view/jms/home.js'
Vue.component('p-jms', page_jms)
 

Vue.use(Router)

const routes = [
    { path: '/', component: { template: '<p-home></p-home>' } },
    { path: '/finalizar', component: { template: '<p-finalizar></p-finalizar>' } },
    { path: '/atendimento', component: { template: '<p-atendimento></p-atendimento>' } },

    { path: '/jms', component: { template: '<p-jms></p-jms>' } },  
]



const router = new Router({ routes })

new Vue({
    router,
    data: {}
}).$mount('#app')

;(async () => { })()