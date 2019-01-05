import {
    patienthomepageV2
} from "../../service/dynamic";

const state = {
  dynamicList: {}
};
const getters = {

};
const mutations = {
    dynamicFuncList(state, payload) {
        return state.dynamicList = payload.res.data;
    }
};
const actions = {
  /**
   * 获取动态首页列表
   * @param {*} param0
   * @param {*} payload
   */
  dynamicFuncList({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
        patienthomepageV2(payload.phId, payload.styleType, payload.clientMobileType).then(d => {
        commit({
          type: 'dynamicFuncList',
          res: d
        });
        resolve(d);
      });
    })
  },
};


export default {
  state,
  getters,
  actions,
  mutations
}
