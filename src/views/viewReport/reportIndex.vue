<template>
    <section class="reportIndex" >
        <div v-show="isShowYY">
            <TopNotice v-show="noticeDate" class="reportIndex_notice" :notice="noticeDate"></TopNotice>
            <nav>
                <div class="left" :class="{'currClass':index==1}" @click="currFun(1)">
                <span> 按就诊人</span>
                </div>
                <i>|</i>
                <div :class="{'currClass':index==2}" class="right" @click="currFun(2)">
                <span> 按报告单</span>
                </div>
            </nav>
            <div class="addjzr" @click="addJzrFun()" v-show="isShow">
                <i class="add_icon"></i>
                <span>添加就诊人</span>
            </div>
        </div>
        <patients-list v-if="isShow" :patientsList="visitorsData"></patients-list>
        <report :isShowYY.sync="isShowYY=isShowYY" v-show="!isShow" :reportDate="config" class="marginTop"></report>
        
    </section>
</template>

<script>
import axios from "axios"
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost,appointmentget ,appointmentConfig} from '@/service/config.js'
import {  apiurl } from '@/service/api.js';
import { Indicator, Toast, MessageBox ,Button} from 'mint-ui'
import TopNotice from '../../components/topNotice'
import patientsList from '../../components/patientsList'
import report from '../../components/report'
require('../../assets/sass/reportIndex.scss');
export default {
    data(){
        return{
            notice:'查报告单提示查报告单提示',
            notice2:'查报告单提示查报告单提示2',
            index:1,
            isShow:true,
            isShowYY:true,
            noticeDate:'',
            visitorsData:'',
            config:[],
        }
    },
     computed: {
        ...mapGetters({ hospitalId: 'hospitalId',userinfo: 'userinfo',xBusinessId:'xBusinessId',reporttab:'reporttab'})
    },
     components: {
        TopNotice,
        patientsList,
        report,
        Button
    },
    mounted() {
        this.set_reportstate('');
        this.set_reportitem('');
        this.getPatientVisitList();
        this.getConfing();
        
    },
    methods: {
        ...mapActions(['set_reportstate','set_reportitem','set_reporttab']),
        getConfing(){//获取配置
            this.config=[];
            let arr=["#promptMessagePatient",'#promptMessageReport','#patientNameInput','#medicalCardInput','#medicareCardInput','#idCardInput','#phoneInput','#branchSelect','#scavengingButton'];
            axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId="+this.xBusinessId+"&stepId=report",appointmentConfig).then((res)=>{
                // console.log("配置",res)
                if(res.data){
                    arr.map((item)=>{
                         res.data.filter((item1)=>{
                            if(item==item1.componentKey){
                                this.config.push(item1);
                            }
                        })
                    })
                }
               this.noticeDate=this.config[0].componentDesc;
               if(this.reporttab!=""){
                    if(this.reporttab==2){
                        this.isShow=false;
                        this.index=2;
                        this.noticeDate=this.config[1].componentDesc;
                    }
                }
            //    console.log('config',this.config);
            }).catch((err)=>{
            console.log(err)
        })
        },
        getPatientVisitList() {//获取就诊人列表
            var self = this;
            Indicator.open({
                text: '就诊列表加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentget(apiurl.GetPatientVisitList+'?scyUserId='+this.userinfo.scyUserId)
            .then(function (response) {
                Indicator.close();
                if(response.status == 200) {
                    self.visitorsData = response.data;
                    // console.log('就诊人列表数据：', self.visitorsData);
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        addJzrFun(){//添加就诊人
        let self=this;
             appointmentget(apiurl.GetFlowConfig+'?defaultPlatformHospitalId='+self.hospitalId+'&useType=patientVisit')
            .then(function (response) {
                if(response.status == 200 && response.data.code == undefined) {
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
        },
        currFun(index){
            if(index==this.index){
                return;
            }
            this.set_reporttab(index);
            if(this.config.length>0){
                if(index==1){
                    this.noticeDate=this.config[0].componentDesc;
                }else if(index==2){
                    this.noticeDate=this.config[1].componentDesc;
                }
            }
            
            this.isShow=!this.isShow;
            this.index=index;
        }
    },
}
</script>

