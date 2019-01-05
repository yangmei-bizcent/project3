import axios from "axios"
import Vuex from 'vuex'
import store from '../store/index.js'
import { Toast } from 'mint-ui';
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    if(store.getters.token!=null){
        config.headers.Authorization=store.getters.token;
    }
    config.headers['X-BUSINESS-ID']=store.getters.xBusinessId;
    // console.log(`请求地址: ${config.url}`)
    return config
}, function(error) {
    console.log('请求失败')
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function(config) {
    console.log('接收响应', config.data.mes)
    // if(config.status == 401 || config.data.mes == '用户未登录' || config.data.mes == '账号已退出登录') {
    //     var param = {};
    //     param.method = "loginOut";
    //     window.parent.postMessage(JSON.stringify(param), '*');
    // }
    if (config.hasOwnProperty('data') && config.data.hasOwnProperty('code') && `${config.data.code}` != "200") {
        console.log(config.data.msg);
        Toast(config.data.msg)
        return config;
    }
    return config
}, function(error) {
    // Do something with request error
    console.log(error)
    Toast(error)
    return Promise.reject(error)
})

export const errorFn = error => {
    console.log('错误：', error);
    if(error.response != undefined && error.response.status != undefined) {
        switch (error.response.status) {
            case 400:
                Toast('请求错误(400)')
                break
            case 403:
                Toast('拒绝访问(403)')
                break
            case 404:
                Toast('请求出错(404)')
                break
            case 405:
                Toast('拒绝访问(405)')
                break
            case 408:
                Toast('请求超时(408)')
                break
            case 500:
                Toast('服务器错误(500)')
                break
            case 501:
                Toast('服务未实现(501)')
                break
            case 502:
                Toast('网络错误(502)')
                break
            case 503:
                Toast('服务不可用(503)')
                break
            case 504:
                Toast('网络超时(504)')
                break
            case 505:
                Toast('HTTP版本不受支持(505)')
                break
            default:
                Toast('连接出错')
                break;
        }
    }
    else {
        Toast(error);
        return false;
    }
}
export const appointmentConfig = {
    baseURL: URL_CONFIG.backendBaseUrl,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json",
    },
    timeout: 50000
}

export const appointmentpost = (_url, obj) => { return axios.post(_url, obj, appointmentConfig).catch(errorFn) }
export const appointmentget = (_url) => { return axios.get(_url, appointmentConfig).catch(errorFn) }
export const appointmentdelete = (_url) => { return axios.delete(_url, appointmentConfig).catch(errorFn) }

/**
 * http post 请求
 * @param _url
 * @param obj
 * @returns {Promise<AxiosResponse<any> | never>}
 */
export const axiospost = (_url, obj) => {
    return axios.post(_url, obj, appointmentConfig)
  };
  
  /**
   * http post 请求
   * @param _url
   * @param obj
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  export const axiospost_params = (_url, obj, params) => {
    return axios.post(_url, obj, Object.assign(params,appointmentConfig))
  };
  
  /**
   * https 全部数据修改
   * @param _url
   * @param obj
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  export const aixosput = (_url, obj) => {
    return axios.put(_url, obj, appointmentConfig)
  };
  
  /**
   *  https 局部数据修改
   * @param _url
   * @param obj
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  export const aixospatch = (_url, obj) => {
    return axios.patch(_url, obj, appointmentConfig)
  };
  
  /**
   * https 获取数据资源
   * @param _url
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  export const axiosget = (_url) => {
    return axios.get(_url, appointmentConfig)
  };
  
  /**
   * https 获取数据资源
   * @param _url
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  export const axiosget_params = (_url, params) => {
    return axios.get(_url, Object.assign({params:params},appointmentConfig))
  };
  
  /**
   * https 数据删除
   * @param _url
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  export const axiosdel = (_url, obj) => {
    return axios.delete(_url, appointmentConfig)
  };
