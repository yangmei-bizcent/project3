<template>
    <div class="page-container">
        <mt-header fixed title="预约信息" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <div class="page-content " :class="{'margintop45':iswxshow}">
            <TopNotice :notice="notice"></TopNotice>
            <AppointDoctorCard :appointInfo="appointInfo"></AppointDoctorCard>
            <AppointForm 
                :appointInfo="appointInfo" 
                :actionSheetData="actionSheetData" 
                @getPeriodIndexList="getPeriodIndexList" 
                :periodListShow="periodListShow" 
                @getPatientIndexList="getPatientIndexList" 
                :isShowObj="isShowObj"
                 ref="infoApp"></AppointForm>

            <div class="paddingX15 margintop50 marginbottom10">
                <mt-button class="width100" type="primary" @click="confirmAppoint">确认预约</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from "axios"
import TopNotice from '../components/topNotice'
import AppointDoctorCard from '../components/appointDoctorCard'
import AppointForm from '../components/appointForm'
import { Header, Button, Indicator, Toast } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost,appointmentget ,appointmentConfig} from '@/service/config.js'
import { BaseUrl, apiurl } from '@/service/api.js';
export default {
    data() {
        return {
            stepId: '',     // 页面ID
            notice: '请务必在就诊前，到窗口完成支付方可生效。',
            appointInfo: {
                doctorPhoto: 'http://ok7wlv1ee.bkt.clouddn.com/17-8-16/74969861.jpg',
                doctName: '',   //医生姓名
                deptName: '',   //就诊科室
                visitType: '',  //门诊类型
                visitTime: '',  //就诊时间
                visitPeriod: '',    //就诊时段
                remainNumber: '',   //所选就诊序号
                outpatientFee: '',   //挂号费用
                ifFirstVisit: '初诊',   // 初/复诊
                patientName:'请添加就诊人',//就诊人
            },
            actionSheetData: {
                periodList: [],     // 时段/序号选择列表
                patientList: [],    // 就诊人列表
                ifFirstVisitList: [], //初/复诊
            },
            patientVisit:"",//就诊人信息
            periodListShow:"",
            isShowObj:{
                isShowCz:0,
                isShowMS:0
            }
        }
    },
    computed: {
        ...mapGetters({
            selectHos: 'selectHos',
            selectDept: 'selectDept',
            selectVisitTime: 'selectVisitTime',
            selectDoctor: 'selectDoctor',
            selectVisitPeriod: 'selectVisitPeriod',
            userinfo: 'userinfo',
            iswxshow:'iswxshow',
            hospitalId: 'hospitalId',
            selectVisitTime:'selectVisitTime'
        })
    },
    components: {
        Header,
        Button,
        Indicator,
        TopNotice,
        AppointDoctorCard,
        AppointForm,
    },
    mounted() {
        this.title('信息确认')
        var self = this;
        self.getAppointInfo();
        self.getPatientIndexList(); 
        setTimeout(() => {
            self.stepId = self.flowEngine.currentState.vId;
            self.getPeriodIndexList();
        }, 10);
        
        self.actionSheetData.ifFirstVisitList = [
            {
                name: '初诊',
                method: ()=>{
                    self.appointInfo.ifFirstVisit = '初诊';
                }
            },
            {
                name: '复诊',
                method: ()=>{
                    self.appointInfo.ifFirstVisit = '复诊';
                }
            },
        ]
    },
    methods: {
        ...mapActions(['set_selectHos', 'set_selectDept', 'set_selectVisitTime', 'set_selectDoctor', 'set_selectVisitPeriod','set_userinfodata']),
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        },
        getAppointInfo() {
            var self = this;
            //START 页面刷新，防止vuex数据丢失
            self.set_selectDoctor(!localStorage.getItem('selectDoctor') ? self.selectDoctor : JSON.parse(localStorage.getItem('selectDoctor')));
            self.set_selectDept(!localStorage.getItem('selectDept') ? self.selectDept : JSON.parse(localStorage.getItem('selectDept')));
            self.set_selectVisitTime(!localStorage.getItem('selectVisitTime') ? self.selectVisitTime : JSON.parse(localStorage.getItem('selectVisitTime')));
            self.set_selectVisitPeriod(!localStorage.getItem('selectVisitPeriod') ? self.selectVisitPeriod : JSON.parse(localStorage.getItem('selectVisitPeriod')));
            //END 页面刷新，防止vuex数据丢失
            console.log('self.selectDoctor',self.selectDoctor)
            self.appointInfo.doctName = self.selectDoctor.doctorObj.doctName;
            self.appointInfo.doctorPhoto= self.selectDoctor.doctorObj.doctPhoto;
            self.appointInfo.deptName = self.selectDept.deptName;
            self.appointInfo.visitTime = self.selectVisitTime.timeObj.clinicDate+' '+self.selectVisitTime.timeObj.week+' '+self.selectVisitTime.timeObj.tAmPm.ampmView;
            self.appointInfo.visitPeriod = self.selectVisitPeriod.periodObj.visitTime;
            self.appointInfo.remainNumber = self.selectVisitPeriod.periodObj.remainNumber;
        },
       getPatientIndexList() {
            var self = this;
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentget(apiurl.GetPatientVisitList +'?scyUserId='+this.userinfo.scyUserId)
            .then(function (response) {
                Indicator.close();
                if(response.status == 200) {
                    // console.log('就诊人列表：', response.data);
                    let visitList = response.data;
                    self.actionSheetData.patientList = [];
                    if(visitList.length > 0) {
                        visitList.forEach((item)=> {
                            // 设置默认就诊人
                            if(item.isDefault == 0) {
                                self.appointInfo.patientName = item.patientName;
                                self.appointInfo.idCard = item.idCard;
                                self.patientVisit=item;
                            }
                            let visit = {
                                name: item.patientName,
                                method: ()=>{
                                    self.appointInfo.patientName = item.patientName;
                                    self.appointInfo.idCard = item.idCard;
                                    self.patientVisit=item;
                                }
                            }
                            self.actionSheetData.patientList.push(visit);
                        });
                    }
                    else {

                        Toast('暂无就诊人数据，请添加就诊人');
                    }
                    //就诊人列表容器中，加‘新增就诊人’按钮
                    let addPatientBtn = {
                        name: '新增就诊人',
                        method: ()=>{
                             appointmentget(apiurl.GetFlowConfig+'?defaultPlatformHospitalId='+self.hospitalId+'&useType=patientVisit')
                                .then(function (response) {
                                    if(response.status == 200 && response.data.code == undefined) {
                                        self.flowEngine.nextState('next', (err, state)=>{});
                                         self.$router.push({
                                            path:'/4-2',
                                            query:{ucUiFlowId:response.data.ucUiFlowId}
                                        });
                                    }
                                    else {
                                        Toast(response.data.msg);
                                    }
                                })
                                .catch(function (error) {
                                    Indicator.close();
                                    console.log(error);
                                });
                           
                        }
                    }
                    self.actionSheetData.patientList.push(addPatientBtn);
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        getPeriodIndexList() {
            var self = this;
            let params = {
                stepId: self.stepId,
                branch:this.selectHos,
                department:self.selectDept,
                visitTime:self.selectVisitPeriod.periodObj,
                doctor:self.selectDoctor.doctorObj,
                schedul:self.selectVisitTime.timeObj,

            }
            
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentpost(apiurl.GetPeriodIndexList, params)
            .then(function (response) {
                Indicator.close();
                if(response.status == 200) {
                    self.appointInfo.visitType=response.data.schedules[0].genre.clinicTypeValue;
                    //费用
                    self.appointInfo.outpatientFee= response.data.paymentAmount.showFee;
                    let arr=["#registerInfoValue","#firstOrReturnVisit","#patientComplain"]
                    if(response.data.viewUcUiConfigs.length>0){
                        response.data.viewUcUiConfigs.map(item=>{

                                if(item.componentKey=="#registerInfoValue"){
                                    self.notice=item.componentDesc;
                                }else if(item.componentKey=="#firstOrReturnVisit"){
                                    self.isShowObj.isShowCz=item.componentValue;
                                }else if(item.componentKey=="#patientComplain"){
                                    self.isShowObj.isShowMS=item.componentValue;
                                }

                        })
                    }


                    let timelist = response.data.visitTimes;
                    self.actionSheetData.periodList = [];
                    if (timelist.length > 0) {
                        timelist.forEach((item)=> {
                            // 时段/序号列表中，只显示余号大于0的数据
                            if(item.remainNumber > 0) {
                                let time = {
                                    name: item.visitTime,
                                    method: ()=>{
                                        self.appointInfo.visitPeriod = item.visitTime;
                                        self.appointInfo.remainNumber = item.remainNumber;
                                    }
                                }
                                self.actionSheetData.periodList.push(time);
                            }
                        });
                    }
                    else {
                        Toast('暂无排班数据');
                    }
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        confirmAppoint() {
            var self = this;
            if(self.patientVisit==""){
                Toast("请选择就诊人");
                return false;
           }
             Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            
        self.flowEngine.nextState('next', (err, state)=>{
            // console.log('院区',this.selectHos)
            // console.log('科室',this.selectDept)
            //  console.log('就诊时间',this.selectVisitTime)
            //   console.log('选择医生',this.selectDoctor)
            //    console.log('就诊时段',this.selectVisitPeriod)
            //     // console.log(this.userinfo)
            //     console.log('病情描述',this.$refs.infoApp.diseaseDesc)
            //     console.log('就诊人信息',self.patientVisit);
                let jztime=JSON.parse(JSON.stringify(this.selectVisitPeriod));
                jztime.periodObj.visitTime=self.appointInfo.visitPeriod;
            //     console.log('切换后的时间段',jztime.periodObj.visitTime)
                if(!self.patientVisit){
                    self.patientVisit={};
                }
                let data={
                    branch:this.selectHos,
                    department:this.selectDept,
                    schedul:this.selectVisitTime.timeObj,
                    doctor:this.selectDoctor.doctorObj,
                    visitTime:jztime.periodObj,
                    patientVisit:self.patientVisit,
                    patientOrder:{
                        stateIllness:this.$refs.infoApp.diseaseDesc
                    },
                    strategy:'5',
                    stepId:state.key
                }
                axios.post(apiurl.PostAppointmentInfo,data,appointmentConfig).then((res)=>{
                    // console.log(res);
                     Indicator.close();
                    if(res.status==200){
                       if(res.data.msg){
                            Toast(res.data.msg);
                       }else{
                           data.patientOrder=res.data;
                            self.set_userinfodata(data)
                            console.log(state.key)
                            self.$router.push({'path':'/'+state.key});
                       }
                    }

                }).catch((err)=>{
                     Indicator.close();
                    console.log(err);
                })

            
                
            })
        },
    }
}
</script>

<style lang="scss">

</style>


