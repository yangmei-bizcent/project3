import { 
    SET_HOSPITALID,
    SET_HOSPITALLIST,
    SET_TOKEN,
    SET_PROJECTID,
    SET_OPENID,
    SET_CODE,
    SET_ISLOGINED,
    SET_USERID,
    SET_USERINFO,
    SET_USERINFODATA,
    SET_ROUTERNAME,
    SET_ISWXSHOW,
    SET_JZRINFO,
    SET_BGDITEMINFO,
    SET_REPORTSTATE,
    SET_REPORTITEM,
    SET_REPORTTAB
} from '../mutation-types'

const state = {
    hospitalId: '',
    hospitalList: [],
    token: '',
    projectId: '',
    openId: '',
    code: '',
    isLogined: false,
    userid:null,
    userinfo:"",
    userinfodata:"",
    routername:"",
    iswxshow:"",
    jzrinfo:"",
    bgditeminfo:"",
    reportstate:"",
    reportitem:"",
    reporttab:""
}
const getters={
    token: function(state){
        if(state.token=='' || state.token==null || state.token==undefined){
            return JSON.parse(sessionStorage.getItem('tokenS'));
        }
        return state.token;
    },
    hospitalId: function(state){
        if(state.hospitalId=='' || state.hospitalId==null || state.hospitalId==undefined){
            return JSON.parse(sessionStorage.getItem('hospitalIdS'));
        }
        return state.hospitalId;
    },
    hospitalList: function(state){
        return state.hospitalList;
    },
    projectId: function(state){
        if(state.projectId=='' || state.projectId==null || state.projectId==undefined){
            return JSON.parse(sessionStorage.getItem('projectIdS'));
        }
        return state.projectId;
    },
    openId: function(state){
        if(state.openId=='' || state.openId==null || state.openId==undefined){
            return JSON.parse(sessionStorage.getItem('openIdS'));
        }
        return state.openId;
    },
    code: function(state){
        return state.code;
    },
    isLogined: function(state){
        return state.isLogined;
    },
    userid: function(state){
        return state.userid;
    },
    userinfo: function(state){
        if(state.userinfo==''|| state.userinfo==null|| state.userinfo==undefined){
            return JSON.parse(sessionStorage.getItem('userinfoS'));
        }
        return state.userinfo;
    },
    userinfodata: function(state){
        if(state.userinfodata=='' || state.userinfodata==null||state.userinfodata==undefined){
            return JSON.parse(sessionStorage.getItem('userinfodataS'));
        }
        return state.userinfodata;
    },
    routername: function(state){
        if(state.routername=='' || state.routername==null || state.routername==undefined){
            return JSON.parse(sessionStorage.getItem('routernameS'));
        }
        return state.routername;
    },
    iswxshow: function(state){
        if(state.iswxshow=='' || state.iswxshow==null || state.iswxshow==undefined){
            return JSON.parse(sessionStorage.getItem('iswxshowS'));
        }
        return state.iswxshow;
    },
    jzrinfo: function(state){
        if(state.jzrinfo=='' || state.jzrinfo==null || state.jzrinfo==undefined){
            return JSON.parse(sessionStorage.getItem('jzrinfoS'));
        }
        return state.jzrinfo;
    },
    bgditeminfo: function(state){
        if(state.bgditeminfo=='' || state.bgditeminfo==null || state.bgditeminfo==undefined){
            return JSON.parse(sessionStorage.getItem('bgditeminfoS'));
        }
        return state.bgditeminfo;
    },
    reportstate: state=>state.reportstate,
    reportitem: state=>state.reportitem,
    reporttab: state=>state.reporttab,
}

const mutations={
    [SET_TOKEN](state, token) {
        state.token = token;  
    },
    [SET_HOSPITALID](state, hospitalId) {
        state.hospitalId = hospitalId;  
    },
    [SET_HOSPITALLIST](state, hospitalList) {
        localStorage.setItem('hospitalId', JSON.stringify(hospitalList));
        state.hospitalList = hospitalList;  
    },
    [SET_PROJECTID](state, projectId) {
        state.projectId = projectId;  
    },
    [SET_OPENID](state, openId) {
        state.openId = openId;  
    },
    [SET_CODE](state, code) {
        localStorage.setItem('code', code);
        state.code = code;  
    },
    [SET_ISLOGINED](state, isLogined) {
        localStorage.setItem('isLogined', isLogined);
        state.isLogined = isLogined;  
    },
    [SET_USERID](state, userid) {
        localStorage.setItem('userid', userid);
        state.userid = userid;  
    },
    [SET_USERINFO](state, userinfo) {
        
        state.userinfo = userinfo;  
    },
    [SET_USERINFODATA](state, userinfodata) {
        localStorage.setItem('userinfodataS', userinfodata);
        state.userinfodata = userinfodata;  
    },
    
    [SET_ROUTERNAME](state, routername) {
        state.routername = routername;  
    },
    [SET_ISWXSHOW](state, iswxshow) {
        state.iswxshow = iswxshow;  
    },
    [SET_JZRINFO](state, jzrinfo) {
        state.jzrinfo = jzrinfo;  
    },
    [SET_BGDITEMINFO](state, bgditeminfo) {
        state.bgditeminfo = bgditeminfo;  
    },
    [SET_REPORTSTATE](state, reportstate) {
        state.reportstate = reportstate;  
    },
    [SET_REPORTITEM](state, reportitem) {
        state.reportitem = reportitem;  
    },
    [SET_REPORTTAB](state, reporttab) {
        state.reporttab = reporttab;  
    },
}
const actions={
    set_token({ commit },token) {
        sessionStorage.setItem('tokenS', JSON.stringify(token));
        commit(SET_TOKEN, token)
    },
    set_hospitalId({ commit },hospitalId) {
        sessionStorage.setItem('hospitalIdS',JSON.stringify(hospitalId))
        commit(SET_HOSPITALID, hospitalId)
    },
    set_hospitalList({ commit },hospitalList) {
        commit(SET_HOSPITALLIST, hospitalList)
    },
    set_projectId({ commit },projectId) {
        sessionStorage.setItem('projectIdS',JSON.stringify(projectId))
        commit(SET_PROJECTID, projectId)
    },
    set_openid({ commit },openId) {
        sessionStorage.setItem('openIdS',JSON.stringify(openId))
        commit(SET_OPENID, openId)
    },
    set_code({ commit },code) {
        commit(SET_CODE, code)
    },
    set_isLogined({ commit },isLogined) {
        commit(SET_ISLOGINED, isLogined)
    },
    set_userid({ commit },userid) {
        commit(SET_USERID, userid)
    },
    set_userinfo({ commit },userinfo) {
        sessionStorage.setItem('userinfoS', JSON.stringify(userinfo));
        commit(SET_USERINFO, userinfo)
    },
    set_userinfodata({ commit },userinfodata) {
        sessionStorage.setItem('userinfodataS',JSON.stringify(userinfodata))
        commit(SET_USERINFODATA, userinfodata)
    },
    set_routername({ commit },routername) {
        sessionStorage.setItem('routernameS',JSON.stringify(routername))
        commit(SET_ROUTERNAME, routername)
    },
    set_iswxshow({ commit },iswxshow) {
        sessionStorage.setItem('iswxshowS',JSON.stringify(iswxshow))
        commit(SET_ISWXSHOW, iswxshow)
    },
    set_jzrinfo({ commit },jzrinfo) {
        sessionStorage.setItem('jzrinfoS',JSON.stringify(jzrinfo))
        commit(SET_JZRINFO, jzrinfo)
    },
    set_bgditeminfo({ commit },bgditeminfo) {
        sessionStorage.setItem('bgditeminfoS',JSON.stringify(bgditeminfo))
        commit(SET_BGDITEMINFO, bgditeminfo)
    },
    set_reportstate({ commit },reportstate) {
        commit(SET_REPORTSTATE, reportstate)
    },
    set_reportitem({ commit },reportitem) {
        commit(SET_REPORTITEM, reportitem)
    },
    set_reporttab({ commit },reporttab) {
        commit(SET_REPORTTAB, reporttab)
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}