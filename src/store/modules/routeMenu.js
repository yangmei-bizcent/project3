import { 
    SET_FLOWXML,
    SET_FLOWROUTERS
} from '../mutation-types'

const state = {
    flowXml: '',
	flowRouters: []
}
const getters={
    flowXml:function(state){
        if( state.flowXml==null ||  state.flowXml==undefined || state.flowXml==""){
            return JSON.parse(sessionStorage.getItem('flowXml'));
        }
        return state.flowXml;
    },
    flowRouters:function(state){
        if(state.flowRouters.length==0){
            return JSON.parse(sessionStorage.getItem('flowRouters'));
        }
        return state.flowRouters;
    },
}

const mutations={
    [SET_FLOWXML](state, flowXml) {
        // localStorage.removeItem('flowXml');
        state.flowXml = flowXml;  
    },
    [SET_FLOWROUTERS](state, flowRouters) {
        // localStorage.removeItem('flowRouters');
        state.flowRouters = flowRouters;  
    }
}
const actions={
    set_flowXml({ commit },flowXml) {
        sessionStorage.setItem('flowXml', JSON.stringify(flowXml));
        commit(SET_FLOWXML, flowXml)
    },
    set_flowRouters({ commit },flowRouters) {
        sessionStorage.setItem('flowRouters', JSON.stringify(flowRouters));
        commit(SET_FLOWROUTERS, flowRouters)
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}