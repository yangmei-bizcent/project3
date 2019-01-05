import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import base from './modules/base'
import routeMenu from './modules/routeMenu'
import appointInfo from './modules/appointInfo'
import patientVisit from './modules/patientVisit'
import requestHeader from './modules/requestHeader'
import dynamic from './modules/dynamic'
//Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        base,
        routeMenu,
        requestHeader,
        appointInfo,
        patientVisit,
        dynamic
    },
    strict: process.env.NODE_ENV !== 'production'//进行自动判断严格模式还是非严格模式（开发环境下是严格模式）做这个判断是为了避免不必要的性能损耗
})