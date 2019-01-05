import { 
    SET_SELECTHOS,
    SET_SELECTDEPT,
    SET_SELECTVISITTIME,
    SET_SELECTDOCTOR,
    SET_SELECTVISITPERIOD
} from '../mutation-types'

const state = {
    selectHos: {},  //选择院区
    selectDept: {}, //选择科室
    selectVisitTime: {},    //选择就诊时间
    selectDoctor: {},   //选择医生
    selectVisitPeriod: {},  //选择就诊时段
}
const getters={
    selectHos:function(state){
        return state.selectHos;
    },
    selectDept:function(state){
        return state.selectDept;
    },
    selectVisitTime:function(state){
        return state.selectVisitTime;
    },
    selectDoctor:function(state){
        return state.selectDoctor;
    },
    selectVisitPeriod:function(state){
        return state.selectVisitPeriod;
    },
}

const mutations={
    [SET_SELECTHOS](state, selectHos) {
        // localStorage.removeItem('selectHos');
        localStorage.setItem('selectHos', JSON.stringify(selectHos));
        state.selectHos = selectHos;  
    },
    [SET_SELECTDEPT](state, selectDept) {
        // localStorage.removeItem('selectDept');
        localStorage.setItem('selectDept', JSON.stringify(selectDept));
        state.selectDept = selectDept;  
    },
    [SET_SELECTVISITTIME](state, selectVisitTime) {
        // localStorage.removeItem('selectVisitTime');
        localStorage.setItem('selectVisitTime', JSON.stringify(selectVisitTime));
        state.selectVisitTime = selectVisitTime;  
    },
    [SET_SELECTDOCTOR](state, selectDoctor) {
        // localStorage.removeItem('selectDoctor');
        localStorage.setItem('selectDoctor', JSON.stringify(selectDoctor));
        state.selectDoctor = selectDoctor;  
    },
    [SET_SELECTVISITPERIOD](state, selectVisitPeriod) {
        // localStorage.removeItem('selectVisitPeriod');
        localStorage.setItem('selectVisitPeriod', JSON.stringify(selectVisitPeriod));
        state.selectVisitPeriod = selectVisitPeriod;  
    },
}
const actions={
  set_selectHos({ commit },selectHos) {
      commit(SET_SELECTHOS, selectHos)
  },
  set_selectDept({ commit },selectDept) {
      commit(SET_SELECTDEPT, selectDept)
  },
  set_selectVisitTime({ commit },selectVisitTime) {
      commit(SET_SELECTVISITTIME, selectVisitTime)
  },
  set_selectDoctor({ commit },selectDoctor) {
      commit(SET_SELECTDOCTOR, selectDoctor)
  },
  set_selectVisitPeriod({ commit },selectVisitPeriod) {
      commit(SET_SELECTVISITPERIOD, selectVisitPeriod)
  },
}
export default {
    state,
    getters,
    actions,
    mutations
}