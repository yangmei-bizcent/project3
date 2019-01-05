<template>
    <div class="page-container page-bindphone bgcolor-white paddingX15">
        <mt-header fixed title="绑定手机号" v-show="iswxshow">
            <!-- <router-link to="/bindPhone" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link> -->
            <mt-button slot="left" icon="back"></mt-button>
            <mt-button slot="right">
                <i class="close"></i>
            </mt-button>
        </mt-header>
        <div class="page-content " :class="{'margintop45':iswxshow}">
            <div class="flex-align-justify-column textAlignCenter paddingtop25 paddingbottom15">
                <div class="flex-align-justify-column user-photo">
                    <img v-show="userinfo.headImgUrl" :src="userinfo.headImgUrl" :alt="userinfo.headImgUrl" />
                </div>
            </div>
            <div class="fontsize-2 color-8f8f8f">亲爱的{{ (userinfo.nickName=='' || userinfo.nickName==null)?'用户':userinfo.nickName }}：</div>
            <div class="fontsize-2 color-8f8f8f">为了给您更好的服务，请输入您的手机号</div>
            <div class="form-container margintop20">
                <mt-field class="fontsize0 color-3d3d3d" placeholder="账号" type="tel" v-model.trim="phone"></mt-field>
                <mt-field v-model.trim="yzm" class="fontsize0 color-3d3d3d" placeholder="验证码">
                    <mt-button 
                        plain 
                        size="small" 
                        type="primary" 
                        class="fontsize-2 color-1c98fc height28 marginleft5"
                        @click="GetDuanXinCode">{{ getCodeMsg }}</mt-button>
                </mt-field>
            </div>
            <AgreeCheckCompt :isChecked="isChecked" class="margintop15" @switchCheck="switchCheck" @toAgreePage="toAgreePage"></AgreeCheckCompt>
            <mt-button type="primary" class="width100 margintop30" :disabled="isChecked?false:true" :class="classBtnOne" @click="toSubmit">提交</mt-button>
        </div>
        <!-- 弹出框图片验证码 -->
        <SecurityCodeDlg  v-show="codeShow" @input="OnInput" @FunClose="closeX" @FunRefresh="OnRefresh" :imgUrl="imgUrl" ></SecurityCodeDlg>
    </div>
</template>

<script>
import SecurityCodeDlg from '@/components/securityCodeDlg'
import AgreeCheckCompt from '@/components/agreeCheckCompt'
import { Header, Field, Button, Checklist, Toast, Indicator } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { appointmentget } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
import { appid } from '@/service/api.js'
export default {
    data() {
        return {
            isChecked: false,
            phone: '',     //账号
            userPhoto: '../static/img/visittime_doctorphoto.png',  //用户头像
            classBtnOne: '',

            iphoneB:false,
            getCodeMsg:'获取验证码',
            isCanSendCode:true,
            countdown:60,
            yzm:null,
            yzmB:false,
            codeShow:false,
            imgUrl:"",
            valon:"",
            CacheName:"",
            agreePath: "./serviceTerm",
            Request:"",
            userinfo:{
                headImgUrl:"",
                nickName:""
            },
            redirect_uri:""
           
        }
    },
    computed: {
        ...mapGetters({
            code: 'code',
            openId:'openId',
            projectId: 'projectId',
            routername:'routername',
            iswxshow:'iswxshow',
            xBusinessId:'xBusinessId',
            hospitalId:'hospitalId'
        })
    },
    components: {
        Header,
        Field,
        Button,
        Indicator,
        Checklist,
        AgreeCheckCompt,
        SecurityCodeDlg,
    },
    mounted() {
       this.Request= new this.UrlSearch(location.href); //实例化
       this.userinfo.headImgUrl=decodeURIComponent(this.Request.head_img);
        this.userinfo.nickName=decodeURIComponent(this.Request.nick_name);
        this.set_openid(this.Request.openid);
        this.redirect_uri=decodeURIComponent(this.Request.redirect_uri);
        let localUrl=new this.UrlSearch(this.redirect_uri);
        this.set_projectId(localUrl.projectid);
        this.set_xBusinessId(localUrl.xBusinessId);
        this.set_hospitalId(localUrl.hospitalId)
        if(localUrl.router!=undefined){
            this.set_routername(localUrl.router)
        }
        if(this.routername=='yygh'){
            this.getFlowXml();  //获取页面流配置xml
        }
        console.log('localUrl.router',localUrl.router)
    },
    watch:{
		iphone:{
			handler:function(val, oldval){
				if(val.length==11){
					this.iphoneB=true;
					// this.btnClassFun();
				}else{
					this.iphoneB=false;
					// this.btnClassFun();
				}
			}
		},
		yzm:{
			handler:function(val, oldval){
				if(val.length==6){
					this.yzmB=true;
					// this.btnClassFun();
				}else{
					this.yzmB=false;
					// this.btnClassFun();
				}
			}
		},
	},
    methods: {
         ...mapActions([
            'set_hospitalId',
            'set_token', 
            'set_projectId',
            'set_openid', 
            'set_userinfo',  
            'set_xBusinessId',
            'set_routername',
            'set_flowXml'

        ]),
        switchCheck() {
            this.isChecked = !this.isChecked;
            console.log(this.isChecked);
        },
        toAgreePage() {
            this.$router.push({
                path: '/serviceTerm'
            });
        },
        GetDuanXinCode(){
            var vm=this;
            var reg = /^((1[3-9][0-9])+\d{8})$/;
            if(vm.phone.length==0){
                Toast('请输入手机号');
            }else if(!reg.test(vm.phone)){
                Toast("请输入正确手机号");
            }else{
                if(vm.isCanSendCode){
                    vm.CacheName="";
                    vm.getyzmImg();
                    vm.codeShow=true;
                    // 图片验证弹框中的input获取焦点
                    setTimeout(()=>document.getElementsByClassName('input-code')[0].focus(),100)
                }else{
                    Toast('请在'+vm.getCodeMsg+'秒后再试')
                }	
            }
        },
        CountDown(){
            var vm=this;
            if (vm.countdown == 0) { 
                vm.isCanSendCode=true;
                vm.countdown = 60; 
                vm.getCodeMsg="重新获取";
            } else { 
                vm.countdown--; 
                vm.getCodeMsg=vm.countdown+"s"; 
                setTimeout(function() { 
                    vm.CountDown() 
                },1000) 
            } 
        },
        OnInput(payload){
            var vm = this;
            vm.valon = payload.inputImgCode;
            // console.log('填好后，验证码所传过来的值是：', payload.inputImgCode);
            if(vm.valon!=""){
                vm.getyzm(vm.valon);
            }
        },
        closeX(){
            this.codeShow=false;
        },
        OnRefresh(){
            // console.log('刷新图片验证码');
            this.CacheName="";
            this.getyzmImg(); 
        },
        // 获取图形验证码图片
        getyzmImg(){
            let vm=this;
            appointmentpost(apiurl.GetPictureCode+'?phone='+vm.phone+'&scene=0')
            .then(function (response) {
                console.log(response)
                if(response.data.code == undefined) {
                    // 获取验证码图片
                    vm.imgUrl = response.data;
                    // vm.CacheName=data.extra.cacheName;
                }else{
                    Toast(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 验证图片验证码输入是否正确
        getyzm(Code){
            let vm=this;
            let proId = vm.projectId;
            // let proId = !localStorage.getItem('projectId')?vm.projectId:localStorage.getItem('projectId');
            // console.log('code是：', !localStorage.getItem('code')?vm.code:localStorage.getItem('code'));
            // console.log('projectid是：', proId);
            if(vm.isCanSendCode){
                vm.isCanSendCode=false;
                appointmentpost(apiurl.GetValidateCode+'?projectId='+proId+'&phone='+vm.phone+'&scene=0&clientType=11&picCode='+Code)
                .then(function (response) {
                    if(response.data.code == undefined) {
                        setTimeout(()=>vm.codeShow=false,1000);
                        Toast(response.data);
                        vm.CountDown();
                    }else{
                        Toast(response.data.msg);
                        vm.getCodeMsg="获取验证码";
                        vm.isCanSendCode=true;
                        vm.valon="";
                        vm.CacheName="";
                        if(response.data.mes=="该手机号已经注册，你可以直接登录"){
                            setTimeout(()=>vm.codeShow=false,1000);
                            // vm.set_loginihopne(vm.phone);
                        }else{
                            vm.getyzmImg(); 
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        toSubmit(){
            let vm=this;
            var reg = /^((1[3-9][0-9])+\d{8})$/;
            if(vm.phone==""){
                Toast("请输入手机号");
                return false;
            } 
            if(!reg.test(vm.phone)){
                Toast("请输入正确手机号");
                return false;
            }
            if(vm.yzm==null){
                Toast("请输入验证码");
                return false;
            }
            if(vm.yzm.length!=6){
                Toast("请输入6位验证码");
                return false;
            }
            Indicator.open({
                text: '提交中...',
                spinnerType: 'fading-circle'
            });
            // 提交
            appointmentget(apiurl.BindPhone+ '?validatecode=' + vm.yzm +'&phone=' + vm.phone + '&openid='+vm.openId + '&type=0'+'&state='+vm.projectId).then((response)=>{
                Indicator.close();
                if(response.status==200 && response.data.code==undefined) {
                    vm.set_token(response.data.token);
                    vm.set_userinfo({
                        scyUserId:response.data.scyUserId
                    });
                   
                    if(vm.routername=="yygh"){
                        vm.flowEngine.start((err, state)=>{
                            vm.$router.push({
                                path: '/'+state.key
                            })
                        })
                    }else{
                        window.location.href=vm.redirect_uri+"&token="+response.data.token+"&openid="+vm.openId+"&scyUserId="+response.data.scyUserId;
                    }
                    
                }
                Toast('注册成功');
                // localStorage.setItem();
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        UrlSearch(url) {
            let name, value;
            let str = url; //取得整个地址栏
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
                    self.set_flowXml(response.data.definition);
                    self.appointmentInit();
                    // console.log('获取的xml：', self.flowXml);
                }
                else {
                    Toast(response.data.msg);
                }
            })
            .catch(function (error) {
                Indicator.close();
            });
        },
        
    },
    // btnClassFun(){
	// 	if(this.iphoneB==true && this.yzmB==true){
	// 		this.classBtnOne='rgba_btn';
	// 	}else{
	// 		this.classBtnOne='';
	// 	}
    // },
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
    }
    .page-bindphone {
        height: 100vh;
        .height28 {
            @include cal(height, 28px);
        }
        .user-photo {
            border-radius: 100%;
            background-color: #ededed;
            @include cal(width, 90px);
            @include cal(height, 90px);
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .mint-cell {
            @include cal(min-height, 51px); 
        }
        .mint-cell:first-child .mint-cell-wrapper {
            background: none;
        }
        .mint-cell-wrapper {
            padding: 0;
            background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        }
    }
</style>


