<template>
    <div class="addjiuzr">
        <div v-show="!nationSelectPageShow && !hospitalSelectPageShow" class="page-container">
            <mt-header fixed title="绑定就诊人" v-show="iswxshow">
                <mt-button slot="left" @click="$router.go(-1)" icon="back"></mt-button>
            </mt-header>
            <div class="page-content page-patientlist" :class="{'margintop45':iswxshow}">
                <div>
                    <TopNotice :notice="notice" v-show="noticeSHow==1"></TopNotice>
                    <mt-field 
                        label="姓名" 
                        placeholder="请输入真实的姓名"
                        class="fontsize2 color-999" 
                        v-model="patientName">
                    </mt-field>

                    <div @click="showIdCardTypeSelect" class="cell-wrap" v-show="numZJH>1">
                        <mt-cell 
                            title="证件类型" 
                            is-link 
                            class="fontsize2 color-999"
                            :value="idCardTypeText">
                        </mt-cell>
                    </div>
                    <mt-actionsheet :actions="idCardTypes" v-model="idCardTypeShow"></mt-actionsheet>    <!-- 证件类型 -->
                    
                    <div @click="showIsGuardianSelect" class="cell-wrap" v-show="isShowJHR==1">
                        <mt-cell 
                            title="证件所属人" 
                            is-link 
                            class="fontsize2 color-999"
                            :value="isGuardianText">
                        </mt-cell>
                    </div>
                    <mt-actionsheet :actions="isGuardians" v-model="isGuardianShow"></mt-actionsheet>    <!-- 证件所属人 -->
                    <mt-field 
                        :label="numZJH>1?'证件号':'身份证号'" 
                        placeholder="请输入证件号" 
                        v-model="idCard"
                        class="fontsize2 color-999">
                    </mt-field>
                    
                    <div @click="showIsCardLX" class="cell-wrap" v-show="isShowcard==1">
                        <mt-cell 
                            title="卡类型" 
                            is-link 
                            class="fontsize2 color-999"
                            :value="isCardLxtext">
                        </mt-cell>
                    </div>
                    <mt-actionsheet :actions="CardLXDate" v-model="idCardlXShow"></mt-actionsheet>    <!-- 卡类型 -->
                    <mt-field 
                        label="卡号" 
                        :placeholder=" TipsCardLX|| `${isCardLxtext}必填`" 
                        v-model="CardLX"
                        class="fontsize2 color-999" v-show="isShowcard==1">
                        <span style="margin:0 10px; font-size: 14px;color: #1C97FC;" v-show="isShowKLXBtn==1" @click="serachHealthCardNumber(1)">查询卡号</span>
                    </mt-field>

                    <mt-field 
                        label="医保卡号" 
                        :placeholder="TipsYBK" 
                        v-model="healthCardNumber"
                        v-show="isShowYBK==1"
                        class="fontsize2 color-999">
                        <span style="margin:0 10px; font-size: 14px;color: #1C97FC;" v-show="isShowYBKBtn==1" @click="serachHealthCardNumber(2)">查询卡号</span>
                    </mt-field>
                     <mt-field 
                        label="就诊卡号" 
                        :placeholder="TipsJZK" 
                        v-model="jzcard"
                        v-show="isShowJZK==1"
                        class="fontsize2 color-999">
                        <span style="margin:0 10px; font-size: 14px;color: #1C97FC;" v-show="isShowJZKBtn==1" @click="serachHealthCardNumber(3)">查询卡号</span>
                    </mt-field>
                     <mt-field 
                        label="详细地址" 
                        :placeholder="TipsAdd" 
                        v-model="XXaddress"
                        v-show="isShowAddress==1"
                        rows="2"
                        type="textarea" 
                        class="fontsize2 color-999">
                    </mt-field>
                    <mt-field 
                        label="手机号码" 
                        :placeholder="TipsPhone" 
                        v-model.trim="phoneNumber"
                        type="tel"
                        v-show="isShowPhone==1"
                        class="fontsize2 color-999">
                        <mt-button v-show="isShowYZM==1" type="default" size="small" style="margin-left:10px;" @click="GetDuanXinCode">{{getCodeMsg}}</mt-button>
                    </mt-field>
                     <mt-field 
                        label="手机验证码" 
                        placeholder="验证码必填" 
                        v-model="yzm"
                        v-show="isShowYZM==1"
                        type="number"
                        class="fontsize2 color-999">
                    </mt-field>

                    <!-- <div @click="showNationSelect" class="cell-wrap">
                        <mt-cell 
                            title="民族" 
                            is-link 
                            placeholder="请选择"
                            class="fontsize2 color-999" 
                            :value="nationValue">
                        </mt-cell>
                    </div> -->
                    

                    <div @click="showHospitalSelect" class="cell-wrap margintop8" v-show="isShowYQ==1">
                        <mt-cell 
                            title="院区" 
                            is-link 
                            placeholder="请选择" 
                            class="fontsize2 color-999"
                            :value="platformHospitalName">
                        </mt-cell>
                    </div>
                    
                    <mt-field 
                        label="设为默认就诊人" 
                        class="fontsize2 color-666 margintop8 switch-field xzmzyq">
                        <mt-switch v-model="isDefaultSwitch"></mt-switch>
                    </mt-field>
                    
                    <div class="paddingX15 margintop50 marginbottom10">
                        <mt-button class="width100" type="primary" @click="validateForm">保存</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="nationSelectPageShow" class="page-container">
            <mt-header fixed title="选择民族">
                <mt-button slot="left" @click="nationSelectPageShow=false" icon="back"></mt-button>
            </mt-header>
            <div class="page-content page-patientlist margintop45">
                <div 
                    v-if="nationsOptions.length>0"
                    class="paddingbottom70">
                    <mt-radio
                        v-model="nation"
                        :options="nationsOptions">
                    </mt-radio>
                    <div class="width100 fixed bottom0 left0 padding10X paddingX15 bgcolor-white">
                        <mt-button class="width100" type="primary" @click="confirmNationSelect">确定</mt-button>
                    </div>
                </div>
                <div v-else class="flex-align-justify-column paddingtop70">暂无数据</div>
            </div>
        </div>

        <div v-show="hospitalSelectPageShow" class="page-container xzmzyq paddingTop36">
            <mt-header fixed title="选择院区">
                <mt-button slot="left" @click="hospitalSelectPageShow=false" icon="back"></mt-button>
            </mt-header>
            <div class="page-content page-patientlist">
                <div v-if="hospitalsOptions.length>0">
                    <mt-radio
                        v-model="platformHospitalId"
                        :options="hospitalsOptions">
                    </mt-radio>
                    <div class="width100 fixed bottom0 left0 padding10X paddingX15 bgcolor-white">
                        <mt-button class="width100" type="primary" @click="confirmHospitalSelect">确定</mt-button>
                    </div>
                </div>
                <div v-else class="flex-align-justify-column paddingtop70">暂无数据</div>
            </div>
        </div>

        <mt-actionsheet class="cardNmb" :actions="CXBtnDate" v-model="CXBtnShow"></mt-actionsheet>    <!-- 查询卡号 -->
         <!-- 弹出框图片验证码 -->
        <SecurityCodeDlg ref="inputYZM"  v-show="codeShow" @input="OnInput" @FunClose="closeX" @FunRefresh="OnRefresh" :imgUrl="imgUrl" ></SecurityCodeDlg>
    </div>
</template>

<script>
import SecurityCodeDlg from '@/components/securityCodeDlg'
import TopNotice from '../components/topNotice'
import { Header, Button, Indicator, Toast, Field, Actionsheet, Switch, Radio, MessageBox } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { _NATION } from '@/assets/js/nation.constans.js'
import { appointmentpost ,appointmentConfig} from '@/service/config.js'
import { BaseUrl, apiurl } from '@/service/api.js';
import axios from "axios"
export default {
    data() {
        return {
            validateFlag: true, // 表单验证通过标志， true通过，false不通过
            stepId: '',     // 页面ID
            notice: '就诊人最多添加5人',
            getCodeMsg:'获取验证码',
            isCanSendCode:true,
            countdown:60,
            idCardTypeShow: false,  // 证件类型选择
            idCardTypeText: '',
            idCardTypes: [],
            isGuardianShow: false,
            isGuardianText: '本人',
            isGuardians: [],
            isDefaultSwitch: false, // 是否默认开关值
            CardLXDate:[],
            isCardLxtext:'',//卡类型
            idCardlXShow:false,

            nationsOptions: [], // 民族列表
            nationSelectPageShow: false,    // 显示民族选择列表
            hospitalsOptions: [],   // 从接口获取后，经过处理后的院区列表
            hospitalsData: [],  // 接口返回的院区数据
            hospitalSelectPageShow: false,  // 显示院区选择列表

            patientName: '',    // 姓名
            phoneNumber: '',    // 手机号
            yzm: '',    // 验证码
            idCardType: '0', // 证件类型
            isGuardian: '0', // 证件所属人
            idcardLxdian:'0',//卡类型
            idcardNub:'0',//卡号码
            idCard: '', //证件号
            CardLX:'',//卡号
            jzcard:'',//就诊卡号
            XXaddress:'',//详细地址
            yzm:'',//短信验证码
            nation: '', // 民族
            nationValue: '',    // 民族值
            addr: '',    // 详细地址
            healthCardNumber: '',   // 医保卡号
            platformHospitalId: '',     // 院区
            platformHospitalName: '',   // 院区名称
            isDefault: '1',     // 是否默认
            configData:[],     //配置项
            noticeSHow:0,//是否显示提示
            CacheName:"",
            codeShow:false,
            imgUrl:"",
            valon:"",
            isShowcard:0,//是否显示卡类型
            isShowYBK:0,//是否展示医保卡
            isShowJZK:0,//是否展示就诊卡
            TipsCardLX:"",//卡类型提示
            TipsYBK:'',//医保卡提示
            TipsJZK:'',//就诊卡提示
            TipsAdd:'',//详细地址提示
            TipsPhone:'',//手机提示
            isShowAddress:0,//是否展示地址
            isShowPhone:0,//是否展示手机号码
            isShowYZM:0,//是否显示验证码
            isShowKLXBtn:0,//是否展示查询卡号btn--卡类型
            isShowYBKBtn:0,//是否展示查询卡号btn--医保卡
            isShowJZKBtn:0,//是否展示查询卡号btn--就诊卡
            isShowYQ:0,//是否显示院区
            isShowJHR:0,//是否显示监护人
            numZJH:"",//证件类型数
            CXBtnDate:[],//查询卡号列表
            CXBtnShow:false,// 显示卡号列表
        }
    },
    computed: {
        ...mapGetters({
            userinfo: 'userinfo',
            xBusinessId: 'xBusinessId',
            projectId: 'projectId',
            hospitalList: 'hospitalList',
            iswxshow:'iswxshow',
            hospitalId:'hospitalId'
        })
    },
    components: {
        Header,
        Button,
        Indicator,
        Toast,
        Field,
        TopNotice,
        Actionsheet,
        SecurityCodeDlg
    },
    mounted() {
        let self = this;
        self.nationsOptions = _NATION;  // 民族
        // self.hospitalsOptions = self.hospitalList;  // 院区
        self.hospitalsOptions = [];
        self.getHospitalsData();
        self.getConfigInfo();
       
    },
    methods: {
        ...mapActions(['set_selectHos']),
        getConfigInfo(){//获取配置
            let vm=this;
            Indicator.open({
                text: '列表加载中...',
                spinnerType: 'fading-circle'
            });
            let IDname=['#promptMessage','#idCard','#guardianPapers','#cardType','#showCard','#healthCardNumber','#patientIdCardNumber','#address','#phoneNumber','#validNum','#cardNumber .rbk-btn','#healthCardNumber .rbk-btn','#patientIdCardNumber .rbk-btn','#branchs'];
            axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId="+this.$route.query.ucUiFlowId+"&stepId=bindPatientVisit",appointmentConfig).then((res)=>{
            //  axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId=fcd00a9f-451d-4662-8205-b050ddc994ff&stepId=bindPatientVisit",appointmentConfig).then((res)=>{
                if(res.data){
                    console.log('配置项',res);
                    Indicator.close();
                    IDname.filter((item1)=>{
                        res.data.forEach((item,index)=>{
                            if(item.componentKey==item1){
                                // console.log('id#',item.componentKey)
                                return this.configData.push(item);
                                
                            }
                        }) 
                    });
                    console.log('config',this.configData)
                    this.notice=this.configData[0].componentDesc;//提示 
                    if(this.configData[0].componentValue==1){
                            this.noticeSHow=1;
                    }
                    //证件类型
                    let id=['1','2','3','4'];
                    let idname=['身份证','军官证','护照','华侨证'];
                    let configarr=this.objToArray(JSON.parse(this.configData[1].componentDesc)).sort();
                    this.numZJH=configarr.length;
                    id.forEach((item,index)=>{
                        if(item==configarr[index]){
                            let a={name:idname[index], method: ()=>{this.idCardType = index;this.idCardTypeText = idname[index];},index:item}
                             this.idCardTypes.push(a);
                        }
                        if(item==configarr[0]){
                            this.idCardTypeText=idname[index];
                        }
                        
                    })
                    //"允许为监护人的证件"
                    let zjname=['本人','监护人'];
                    this.isShowJHR=this.configData[2].componentValue
                    zjname.forEach((item,index)=>{
                        let itemObj={name:item,method: ()=>{this.isGuardian = index;this.isGuardianText = item;}}
                        this.isGuardians.push(itemObj); 
                    })
                    
                    //展示卡类型选择区域+展示卡号输入区域（与卡类型同时出现）
                    let cardLX=this.objToArray(JSON.parse(this.configData[3].componentDesc));
                    cardLX.map(item=>{
                        let a={name:item.value,method:()=>{this.idcardLxdian=item.key,this.isCardLxtext=item.value},index:item.key}
                        this.CardLXDate.push(a);
                    })
                    this.isCardLxtext=cardLX[0].value;
                    this.isShowcard=this.configData[4].componentValue;
                    this.TipsCardLX=this.configData[4].componentDesc;

                    //"展示医保卡输入区域"
                    this.isShowYBK=this.configData[5].componentValue;
                    this.TipsYBK=this.configData[5].componentDesc;
                    //展示就诊卡输入区域
                    this.isShowJZK=this.configData[6].componentValue;
                    this.TipsJZK=this.configData[6].componentDesc;
                    //展示地址输入区域
                    this.isShowAddress=this.configData[7].componentValue;
                    this.TipsAdd=this.configData[7].componentDesc;
                    //展示手机号码输入区域
                    this.isShowPhone=this.configData[8].componentValue;
                    this.TipsPhone=this.configData[8].componentDesc;
                    //展示短信验证码输入区域
                    this.isShowYZM=this.configData[9].componentValue;
                    //展示查询卡号button--卡类型
                    this.isShowKLXBtn=this.configData[10].componentValue;
                    //展示查询卡号button--医保卡
                    this.isShowYBKBtn=this.configData[11].componentValue;
                    //展示查询卡号button--就诊卡
                    this.isShowJZKBtn=this.configData[12].componentValue;

                    //展示院区
                    this.isShowYQ=this.configData[13].componentValue;

                    

                    //调试使用
                    // this.isShowcard=1;
                    // this.isShowYBK=1;
                    // this.isShowJZK=1;
                    // this.isShowAddress=1;
                    // this.isShowPhone=1;
                    // this.isShowYZM=1;
                    // this.isShowKLXBtn=1;
                    // this.isShowYBKBtn=1;
                    // this.isShowJZKBtn=1;
                    // this.isShowYQ=1;
                }
                
            }).catch((err)=>{
                Indicator.close();
                console.log(err)
            })
        },
        objToArray(array) {//对象转数组
            var arr = []
            for (var i in array) {
                arr.push(array[i]); 
            }
            // console.log(arr);
            return arr;
        },
         GetDuanXinCode(){//获取短信验证码
            var vm=this;
            var reg = /^((1[3-9][0-9])+\d{8})$/;
            if(vm.phoneNumber.length==0){
                Toast('请输入手机号');
            }else if(!reg.test(vm.phoneNumber)){
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
        // 获取图形验证码图片
        getyzmImg(){
            let vm=this;
            appointmentpost(apiurl.GetPictureCode+'?phone='+vm.phoneNumber+'&scene=5')
            .then(function (response) {
                // console.log(response)
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
            // console.log("projectId:",vm.projectId)
            // console.log('code是：', !localStorage.getItem('code')?vm.code:localStorage.getItem('code'));
            // console.log('projectid是：', proId);
            if(vm.isCanSendCode){
                vm.isCanSendCode=false;
                appointmentpost(apiurl.GetValidateCode+'?projectId='+proId+'&phone='+vm.phoneNumber+'&scene=5&clientType=11&picCode='+Code)
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
                        vm.$refs.inputYZM.inputImgCode="";
                        setTimeout(()=>{
                            vm.$refs.inputYZM.getFocus();
                        },3000)
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
         closeX(){
            this.codeShow=false;
        },
        OnRefresh(){
            // console.log('刷新图片验证码');
            this.CacheName="";
            this.getyzmImg(); 
        },
         OnInput(payload){
            var vm = this;
            vm.valon = payload.inputImgCode;
            // console.log('填好后，验证码所传过来的值是：', payload.inputImgCode);
            if(vm.valon!=""){
                vm.getyzm(vm.valon);
            }
        },
        showIsCardLX(){//显示卡类型选择
            this.idCardlXShow=true;
        },
        // 显示证件类型选择
        showIdCardTypeSelect() {
            this.idCardTypeShow = true;
        },
        // 显示证件所属人选择
        showIsGuardianSelect() {
            this.isGuardianShow = true;
        },
        // 显示民族选择
        showNationSelect() {
            this.nationSelectPageShow = true;
        },
        // 显示院区选择
        showHospitalSelect() {
            this.hospitalSelectPageShow = true;
        },
        // 确认民族选择
        confirmNationSelect() {
            let self = this;
            self.nationsOptions.forEach((item, index)=> {
                if(item.value == self.nation) {
                    self.nationValue = item.label;
                    self.nationSelectPageShow = false;
                }
            });
        },
        // 获取院区列表数据
        getHospitalsData() {
            var self = this;
            
            appointmentpost(apiurl.GetHospitalList)
            .then(function (response) {
                if(response.status == 200) {
                    self.hospitalsData = response.data.branchList;
                    self.hospitalsData.forEach((item, index)=> {
                        let hosItem = {
                            value: item.branchId,
                            label: item.branchName
                        };
                        self.hospitalsOptions.push(hosItem);
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 确认院区选择
        confirmHospitalSelect() {
            let self = this;
            self.hospitalsOptions.forEach((item, index)=> {
                if(item.value == self.platformHospitalId) {
                    self.platformHospitalName = item.label;
                    self.hospitalSelectPageShow = false;
                }
            });
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
        // 查询医保卡号
        serachHealthCardNumber(type) {
            if(this.patientName==""){
                Toast('请输入名字');
                return;
            }
            if(this.idCard==""){
                Toast('请输入证件号')
                return;
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.CXBtnDate=[];
             axios.get(apiurl.cardNumber+"?patientName="+this.patientName+"&idCard="+this.idCard,appointmentConfig).then((res)=>{
                  Indicator.close();
                 if(res.data.length!=0){
                     res.data.forEach((item,index)=>{
                         let json={}
                         if(type==1){
                             json={name:item.value+":"+item.cardNumber,method: ()=>{this.idcardNub=index;this.CardLX=item.cardNumber},index:item.key}
                         }else if(type==2){
                              json={name:item.value+":"+item.cardNumber,method: ()=>{this.idcardNub=index;this.healthCardNumber=item.cardNumber},index:item.key}
                         }else if(type==3){
                             json={name:item.value+":"+item.cardNumber,method: ()=>{this.idcardNub=index;this.jzcard=item.cardNumber},index:item.key}
                         }
                        
                         this.CXBtnDate.push(json);
                     })
                     this.CXBtnShow=true;
                 }else{
                    Toast('没有卡号'); 
                 }
             }).catch((err)=>{
                Indicator.close();
                console.log(err)
            })
            
            
        },
       
        // 验证姓名
        validateName() {
            if(this.patientName == '') {
                Toast("请输入姓名");
                this.validateFlag = false;
                return false;
            }
        },
        // 验证身份证
        validateIdCard() {
            // 验证身份证的话，先判断证件类型是否选择的是身份证
            if(this.idCardTypeText != '身份证') {
                if(this.idCard == '') {
                    Toast('请输入证件号');
                    this.validateFlag = false;
                    return false;
                }
                return true;
            }
            var idCardNoUtil = {
                /*省,直辖市代码表*/
                provinceAndCitys: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
                31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
                45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
                65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

                /*每位加权因子*/
                powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],

                /*第18位校检码*/
                parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],

                /*性别*/
                genders: {male:"男",female:"女"},

                /*校验地址码*/
                checkAddressCode: function(addressCode){
                    var check = /^[1-9]\d{5}$/.test(addressCode);   
                    if(!check) return false;
                    if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
                        return true;
                    }else{
                        return false;
                    }
                },
                /*校验日期码*/
                checkBirthDayCode: function(birDayCode){
                    var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
                    if(!check) return false;
                    var yyyy = parseInt(birDayCode.substring(0,4),10);
                    var mm = parseInt(birDayCode.substring(4,6),10);
                    var dd = parseInt(birDayCode.substring(6),10);
                    var xdata = new Date(yyyy,mm-1,dd);
                    if(xdata > new Date()){
                        return false;//生日不能大于当前日期
                    }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
                        return true;
                    }else{
                        return false;
                    }
                },

                /*计算校检码*/
                getParityBit: function(idCardNo){
                    var id17 = idCardNo.substring(0,17);
                    /*加权 */
                    var power = 0;
                    for(var i=0;i<17;i++){
                    power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
                    }
                    /*取模*/
                    var mod = power % 11;
                    return idCardNoUtil.parityBit[mod];
                },

                /*验证校检码*/
                checkParityBit: function(idCardNo){
                    var parityBit = idCardNo.charAt(17).toUpperCase();
                    if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
                        return true;
                    }else{
                        return false;
                    }
                },
            };
            if(this.idCard == '') {
                Toast('请输入正确的身份证号');
                this.validateFlag = false;
                return false;
            }else if(this.idCard.length == 15){
                //校验身份证
                //校验地址码
                //校验日期码
                if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(this.idCard) || !idCardNoUtil.checkAddressCode(this.idCard.substring(0,6)) || !idCardNoUtil.checkBirthDayCode('19' + this.idCard.substring(6,12))) {
                    Toast('请输入正确的身份证号');
                    this.validateFlag = false;
                    return false;
                }
            }else if(this.idCard.length == 18){
                //校验身份证
                if(!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(this.idCard) || !idCardNoUtil.checkAddressCode(this.idCard.substring(0,6)) || !idCardNoUtil.checkBirthDayCode(this.idCard.substring(6,14)) || !idCardNoUtil.checkParityBit(this.idCard))  {
                    Toast('请输入正确的身份证号');
                    this.validateFlag = false;
                    return false;
                }
            }
            else {
                Toast('请输入正确的身份证号');
                this.validateFlag = false;
                return false;
            }
        },
        // 验证手机号
        validatePhone() {
            if(this.isShowPhone!=1){
                return true;
            }
            if(this.phoneNumber == '' || !/^1(3[0-9]{1}|4[57]{1}|5[0-9]{1}|8[0-9]{1}|7[0-9]{1}|9[0-9]{1})\d{8}$/.test(this.phoneNumber))
            {
                Toast("请输入正确的手机号");
                this.validateFlag = false;
                return false;
            }
        },
        // 验证验证码
        validateYzm() {
            if(this.isShowYZM!=1){
                return true;
            }
            if(this.yzm == '') {
                Toast("请输入验证码");
                this.validateFlag = false;
                return false;
            }
        },
        valiCardLX(){//验证卡类型
            if(this.isShowcard!=1){//不存在，不做判断
                return true;
            }
            if(this.CardLX==''){
                Toast("请输入卡号");
                this.validateFlag = false;
                return false;
            }
        },
        // 验证详细地址
        validateAddress() {
            if(this.isShowAddress!=1){
                return true;
            }
            if(this.XXaddress == '') {
                Toast("请输入详细地址");
                this.validateFlag = false;
                return false;
            }
        },
        // 验证院区
        validateHospital() {
            if(this.isShowYQ!=1){
                return true;
            }
            if(this.platformHospitalName == '') {
                Toast("请选择院区");
                this.validateFlag = false;
                return false;
            }
        },
        // 验证医保卡号
        validateHealthCardNumber() {
            if(this.isShowYBK!=1){
                return true;
            }
            if(this.healthCardNumber == '') {
                Toast("请输入医保卡号");
                this.validateFlag = false;
                return false;
            }
        },
        valiJZKCard(){//验证就诊卡
            if(this.isShowJZK!=1){
                return true;
            }
            if(this.jzcard==''){
                Toast("请输入就诊卡号");
                this.validateFlag = false;
                return false;
            }
        },
        // 验证表单
        validateForm(){
            
            this.validateName()==false?'':(this.validateIdCard()==false?'':(this.valiCardLX()==false?'':(this.validateHealthCardNumber()==false?'':(this.valiJZKCard()==false?'':(this.validateAddress()==false?'':(this.validatePhone()==false?'':(this.validateYzm()==false?'':(this.validateHospital()==false?'':this.saveBind()))))))));

            // this.validateName()==false?'':(this.validatePhone()==false?'':(this.validateIdCard()==false?'':(this.validateAddress()==false?'':(this.validateHospital()==false?'':(this.validateHealthCardNumber()==false?'':this.saveBind())))));
        },
        async saveBind() {
            var self = this;
            self.isDefault = self.isDefaultSwitch?'0':'1';  // 是否默认就诊人，0是，1否
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            //  function  dxyzm(){
            //      axios.get(apiurl.verifyMessageCode+"?type=5&phone="+self.phoneNumber+"&validateCode="+self.yzm,appointmentConfig).then((res)=>{
            //         if(res.data=='短信验证失败'){
            //             Toast(res.data);
            //              Indicator.close();
                        
            //         }else{
            //              seveDate();
            //         }
            //     }).catch((err)=>{
            //         Indicator.close();
            //         Toast(error);
            //         console.log(err)
                    
            //     })
            //  }
            
                let flowid =  self.$route.query.ucUiFlowId;
                let id=1;//设置默认为身份证
                if(this.numZJH>1){
                    id=self.idCardTypeText=="身份证"?'1':(self.idCardTypeText=="军官证"?'2':(self.idCardTypeText=="护照"?'3':'4'));
                 }
                let cardKey="";
                self.CardLXDate.filter((item)=>{
                    if(item.name==self.isCardLxtext){
                        cardKey=item.index;
                    }
                })
                let patientBindInfo = {
                    patientName:self.patientName,
                    idCard: self.idCard,
                    idCardType:id,
                    isGuardian:self.isGuardianText=="本人"?'0':'1',
                    address:self.XXaddress,
                    phoneNumber:self.phoneNumber,
                    validNum:self.isShowYZM==1?self.yzm:'hiddenValidNum',
                    hisValidateCode:self.isShowYZM,
                    cardType:cardKey,
                    cardTypeValue:self.isCardLxtext,
                    cardNumber:self.CardLX,
                    healthCardNumber:self.healthCardNumber,
                    patientIdCardNumber:self.jzcard,
                    isDefault:self.isDefault,
                    scyUserId:self.userinfo.scyUserId,
                    platformHospitalId:this.hospitalId,
                    vcProjectId:self.projectId,
                    ucUiFlowId:flowid,
                    branchId:self.platformHospitalId,
                };
                /**入参注释 */
                // tPatientVisitParam：就诊人信息
                //     {
                //     pvPatientVisitId:就诊人ID
                //     patientName:就诊人姓名
                //     gender:性别（1：男；2：女）
                //     idCard:证件号码
                //     idCardType:证件类型（1：身份证；2：军官证；3：护照）
                //     isGuardian:允许为监护人的证件（0：不允许；1：允许）
                //     age:年龄
                //     address:联系地址
                //     phoneNumber:联系电话
                //     cardType:卡类型
                //     cardTypeValue:卡类型的值，如：就诊卡、医保卡
                //     cardNumber:卡号
                //     healthCardNumber:医保卡号
                //     patientIdCardNumber:就诊卡号
                //     isCertificate:是否实名认证（0：是，1：否）
                //     idCardUrl:身份证正面照片
                //     idCardBackUrl:身份证反面照片
                //     isDefault:是否默认就诊人（0：是，1否）
                //     scyUserId:用户ID
                //     validNum:手机验证码
                //     platformHospitalId:医院ID
                //     vcProjectId:项目ID
                //     ucUiFlowId:业务ID，即flowId、X-BUSINESS-ID 
                //     }
                


                // console.log('提交的信息是：', patientBindInfo);
                appointmentpost(apiurl.bindPatient, patientBindInfo)
                .then(function (response) {
                    Indicator.close();
                    if(response.data.code == 200) {
                        if(response.data.msg){
                            Toast(response.data.msg);
                        }else{
                            MessageBox.alert('绑定就诊人成功').then(action => {
                                self.$router.go(-1);
                            });
                            
                        }
                    
                    }
                    else {
                        // Toast(response.data.alertModel.title+ '：' +response.data.alertModel.content);
                        Toast(response.data.msg);
                    }
                })
                .catch(function (error) {
                    Indicator.close();
                    Toast(error);
                    console.log(error);
                });

      

        },
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
.cardNmb .mint-actionsheet-list .mint-actionsheet-listitem{
        white-space: nowrap;/*表示强制不换行*/
        overflow: hidden;
        text-overflow: ellipsis;/*显示省略号*/
        padding: 0 10px;
    }
.page-patientlist {
    .margintop8 {
        margin-top: 8px;
    }
    .mint-cell-text {
        font-size: 14px;
        color: #999;
    }
    
    .mint-actionsheet-listitem, .mint-actionsheet-button {
        font-size: 16px;
    }
    .mint-cell-wrapper {
        font-size: 14px;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#e2e2e2), color-stop(50%, #e2e2e2), color-stop(50%, transparent));
        background-image: linear-gradient(180deg, #e2e2e2, #e2e2e2 50%, transparent 50%);
    }
    .cell-wrap {
        .mint-cell:last-child {
            background-image: none;
        }
    }
    .switch-field {
        .mint-cell-title {
            width: initial;
        }
    }
    .mint-switch-core {
        width: 47px;
        height: 27px;
        &:before {
            width: 45px;
            height: 25px;
        }
        &:after {
           width: 25px;
            height: 25px; 
        }
    }
    
}
.addjiuzr{
    .paddingTop36{
        padding-top:36px;
    }
    .page-patientlist .mint-field.is-textarea .mint-cell-title{
         align-self: flex-start;
        height: 100%;
        padding: 8px 0;
    }
    .page-patientlist .mint-cell-title {
            flex: initial;
            @include cal(width, 90px);
    }
   .xzmzyq .mint-cell-title{
        width: 100%;
    }
}
</style>


