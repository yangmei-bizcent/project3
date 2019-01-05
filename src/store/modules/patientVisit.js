import { 
    SET_PATIENTNATION,
    SET_PATIENHOSPITAL
} from '../mutation-types'

const state = {
    patientNation: {},
    patientHospital: {},
    patientInfo: '',
}
const getters={
    patientNation:function(state){
        return state.patientNation;
    },
    patientHospital:function(state){
        return state.patientHospital;
    },
}

const mutations={
    [SET_PATIENTNATION](state, patientNation) {
        localStorage.setItem('patientNation', patientNation);
        state.patientNation = patientNation;  
    },
    [SET_PATIENHOSPITAL](state, patientHospital) {
        localStorage.setItem('patientHospital', patientHospital);
        state.patientHospital = patientHospital;  
    },
}
const actions={
    set_patientNation({ commit },patientNation) {
        commit(SET_PATIENTNATION, patientNation)
    },
    set_patientHospital({ commit },patientHospital) {
        commit(SET_PATIENHOSPITAL, patientHospital)
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}