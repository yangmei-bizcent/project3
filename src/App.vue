<template>
  <div>
    <!-- <mt-button class="fixed top0 width100 zIndex0" type="primary" @click="startAppoint">开始预约挂号</mt-button> -->
    <router-view></router-view>
    
  </div>
</template>

<script>
import '@/assets/sass/base_common.scss'
import '@/assets/sass/global.scss'
import '@/assets/sass/header.scss'
import '@/assets/sass/layout.scss'
import { Button,  Indicator} from 'mint-ui'
import { Toast } from 'mint-ui';
import { mapGetters,mapActions } from 'vuex'
import { appointmentget, appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
import axios from 'axios'
// import { constants } from 'http2';
// START------------获取微信授权后地址中参数：code, state(projectId), 以及自定义的xBusinessId
var GWC = {
    version: '1.1.1',
    urlParams: {},
    appendParams: function(url, params) {
        if (params) {
            var baseWithSearch = url.split('#')[0];
            var hash = url.split('#')[1];
            for (var key in params) {
                var attrValue = params[key];
                if (attrValue !== undefined) {
                    var newParam = key + "=" + attrValue;
                    if (baseWithSearch.indexOf('?') > 0) {
                        var oldParamReg = new RegExp('^' + key + '=[-%.!~*\'\(\)\\w]*', 'g');
                        if (oldParamReg.test(baseWithSearch)) {
                            baseWithSearch = baseWithSearch.replace(oldParamReg, newParam);
                        } else {
                            baseWithSearch += "&" + newParam;
                        }
                    } else {
                        baseWithSearch += "?" + newParam;
                    }
                }
            }
            if (hash) {
                url = baseWithSearch + '#' + hash;
            } else {
                url = baseWithSearch;
            }
        }
        return url;
    },
    getUrlParams: function() {
        var pairs = location.search.substring(1).split('&'); 
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos === -1) {
                continue;
            }
            GWC.urlParams[pairs[i].substring(0, pos)] = decodeURIComponent(pairs[i].substring(pos + 1));
        }
    },
};
// END------------获取微信授权后地址中参数：code, state(projectId), 以及自定义的xBusinessId


export default {
    data(){
        return{
             Request:"",
             showB:false,
             bool:false,//控制刷新后页面点击返回是否需要关闭页面
        }
    },
  computed: {
      ...mapGetters({
        hospitalId: 'hospitalId',
        token: 'token',
        code:'code',
        openId:'openId',
        projectId: 'projectId',
        flowXml: 'flowXml',
        flowRouters: 'flowRouters',
        xBusinessId: 'xBusinessId',
        userinfo:'userinfo',
        routername:'routername'
      })
  },
  components: {
      Button,
  },
   created() {
    var vm=this;
    this.set_iswxshow(false);
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)!="micromessenger") {
        this.set_iswxshow(true);
    }
        /*access_token:是微信授权的token;从OauthStatus接口获取的token是校验失效，headers里Authorization字段的值就是从接口获取的token*/
        this.Request = new this.UrlSearch(); //实例化
        if(this.Request.projectid!=undefined){
            vm.set_projectId(this.Request.projectid)
            vm.set_openid(this.Request.openid);
            vm.set_xBusinessId(this.Request.xBusinessId)
            vm.set_hospitalId(this.Request.hospitalId)
            vm.set_token(this.Request.token);
            vm.set_userinfo({
                scyUserId:this.Request.scyUserId
            });
            if(this.Request.router!=undefined){
                vm.set_routername(this.Request.router)
            }
        }
        if(this.routername=="yygh"){
            this.getFlowXml();  //获取页面流配置xml
        }
        this.$nextTick(()=>{
            
             window.addEventListener("popstate", function(e) {//微信触发返回
                if(vm.routername=="yygh"){
                    if(vm.bool){
                        WeixinJSBridge.call('closeWindow');
                    }
                    vm.flowEngine.preState((err, state)=>{});  
                }
            }, false);            
        })
        // if(this.Request.router!="dynamicOnPhone"){
        //     this.getOauthstatus(); 
        // }else{//判断是否是动态微官网
        //     vm.set_routername(this.Request.router)
        //     vm.showB=true;
        // }
           
        
    // }
  },
  mounted() { 
      
   
  },
  methods: {
    ...mapActions([
        'set_hospitalId',
        'set_token',
        'set_code', 
        'set_projectId',
        'set_openid', 
        'set_userinfo', 
        'set_isLogined', 
        'set_flowRouters', 
        'set_flowXml', 
        'set_xBusinessId',
        'set_routername',
        'set_iswxshow'
        ]),
        
     UrlSearch() {
            let name, value;
            let str = location.href; //取得整个地址栏
            let num = str.indexOf("?")
            str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
            let arr = str.split("&"); //各个参数放到数组里
            for(let i = 0; i < arr.length; i++) {
                num = arr[i].indexOf("=");
                if(num > 0) {
                    name = arr[i].substring(0, num);
                    value = arr[i].substr(num + 1);
                    this[name] = value;
                }
            }
        },
    getOauthstatus(){
    //     let vm=this;
    //         Indicator.open({ 
    //             text: '加载中...',
    //             spinnerType: 'fading-circle'
    //         });
        
    // //    appointmentget(apiurl.OauthStatus+'?state=3ff96e0f-c932-4a85-93ab-d36578d0ea83&access_token=16_GOyZqcyYsQuhNlqCQpM21eX7qmBxRDts9bWyJWXsHjQJ2sSBXL47uOKrOa36S9bJ-XfKT91ZwWQO3B8wGcmRRbsyYOWg6--_JvCbTNmBbsM&openid=okc9E0TCiPno5qNNb_54gofEfwlM&authAppId=wxe130160f55f1d0da')
    //         appointmentget(apiurl.OauthStatus+'?state='+ this.projectId + '&access_token='+ this.accesstoken+'&openid='+this.openId+'&authAppId='+this.authAppId)
    //         .then(function(response) { 
    //             Indicator.close();
    //             if(response.status == 200 && response.data.code == undefined) {
    //                 // 根据返回的token，1）为空的话则是新用户，需要绑定；2）若不为空则是老用户，不需要绑定
    //                 // vm.set_token('04daa883843bc5ffda446bf92e983f91');   //☆☆☆☆☆☆☆☆☆☆☆☆暂时放的，后面token能获取到之后，这里要删掉

    //                 if(response.data.token){
    //                     let userData = response.data;
    //                     console.log('得到的token是：',userData.token);
    //                     // 获取用户信息，将返回的用户信息整个存到userinfo中
    //                     vm.set_token(userData.token);
    //                     // vm.set_token('04daa883843bc5ffda446bf92e983f91');
    //                     vm.set_userinfo(response.data);
    //                     vm.showB=true;
                    
    //                     if(vm.routername==""){
    //                         vm.procInst.start((state)=>{
    //                             vm.$router.replace({
    //                                 path: '/'+state['@id'].substring(2)
    //                             })
    //                         })  
                            
                                
    //                     }
    //                     // console.log('11111',JSON.stringify(vm.userinfo))
    //                 }
    //                 else {
    //                     console.log('新用户需要跳转到绑定手机号界面');
    //                     vm.set_userinfo(response.data);
    //                     // console.log('用户头像：', response.data.headImgUrl);
    //                     vm.showB=true;
    //                     if(vm.routername!="dynamicOnPhone"){
    //                          vm.$router.push({'name':'bindPhone'});
    //                     }
                       

    //                 }
    //             }else{
    //                 vm.showB=true;
    //                 Indicator.close();
    //                 Toast(response.data.msg)
    //                 // vm.set_userid('');
    //                 vm.set_userinfo({});
    //             }
    //         })
    //         .catch(function (error) {
    //             vm.showB=true;
    //             Indicator.close();
    //         });
    },
    getFlowXml() {
      var self = this;
      Indicator.open({ 
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      appointmentget(apiurl.GetFlowConfig+'?defaultPlatformHospitalId='+this.hospitalId+'&useType=appointment')
      .then(function (response) {
          Indicator.close();
          if(response.status == 200 && response.data.code == undefined) {
            self.set_flowXml(response.data);
            self.appointmentInit();
                self.showB=true;
                if(self.routername=="yygh"){
                self.flowEngine.start((err, state)=>{
                    self.$router.replace({
                        path: '/'+state.key
                    })
                })  
                
                    
            }
 
            // console.log('获取的xml：', self.flowXml);
          }
          else {
              Toast(response.data.msg);
          }
      })
      .catch(function (error) {
          self.showB=true;
          Indicator.close();
          console.log(error);
      });
    },
  },
    watch:{
        $route(to,from){
            setTimeout(()=>{
                if(document.URL.indexOf('1-1-1')>-1){
                    this.bool=true;
                }else{
                    this.bool=false;
                }
            },500)
        }
    }
}
</script>

<style>
/* .loading{
    background: #fff;
    width:100%;
    height: 100%;
    position:absolute;
    top:0;
    left:0;
    z-index: 999;
} */
  html,body{
    margin: 0px;
    font-size: 16px;
    user-select: none;
    background-color: #f0f3f5;
  }
  h1,h2,h3,h4,h5,h6{
    margin: 0px;
  }
  i {
    display: inline-block;
  }
  a{
    text-decoration: none;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  ul li{
    list-style: none;
  }
</style>
