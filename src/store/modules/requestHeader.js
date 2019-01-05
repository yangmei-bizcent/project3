import { 
    SET_XBUSINESSID,
} from '../mutation-types'

const state = {
    xBusinessId: '',
}
const getters={
    xBusinessId:function(state){
        if(state.xBusinessId==""||state.xBusinessId==null||state.xBusinessId==undefined){
            return JSON.parse(sessionStorage.getItem('xBusinessIdS'));
        }
        return state.xBusinessId;
    },
}

const mutations={
    [SET_XBUSINESSID](state, xBusinessId) {
        state.xBusinessId = xBusinessId;  
    },
}
const actions={
    set_xBusinessId({ commit },xBusinessId) {
        sessionStorage.setItem('xBusinessIdS',JSON.stringify(xBusinessId))
        commit(SET_XBUSINESSID, xBusinessId)
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}