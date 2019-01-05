<template>
    <section class="select_body">
        <selectList :userList="userList" @getJZJYlist="getJZJYlist"></selectList>
        <ul class="jzrecords">
            <li  v-for="item in list" @click="goDetails(item.patientOrderId)">
                <header class="clearfix">
                    <label v-for="item2 in item.itemNameList">{{item.itemNameList>1? item2+' | ':item2}}</label>
                    <span :class="{'text_orange':item.orderStatus==1||item.orderStatus==2||item.orderStatus==3||item.orderStatus==10}">{{item.viewStatusName}}</span>
                </header>
                <section>
                   <div>
                       <span class="ks_name">{{item.deptName}}</span>
                       <span class="xm_name">/{{item.doctorName}}</span>
                       <span class="lag_tips" :class="{'orange':item.orderStatus==9}">{{item.orderStatus==9?'停诊':''}}</span>
                       <span class="lag_tips" :class="{'yellow':item.clinicType==2,'blue':item.clinicType==1}">{{item.clinicType==2?'专':item.clinicType==1?'普通':''}}</span>
                   </div>
                    <div class="content_list">
                        <i class="i_name"></i>
                        <span>{{item.patientName ||'无'}}</span>
                    </div>
                    <div class="content_list">
                        <i class="i_address"></i>
                        <span>{{item.visitAddress || '无'}}</span>
                    </div>
                    <div class="content_list">
                        <i class="i_time"></i>
                        <span>{{item.medicalDate}}{{item.tAmPm.ampmType=="A"?'上午':item.tAmPm.ampmType=="P"?"下午":item.tAmPm.ampmType=="N"?"夜间":item.tAmPm.ampmType=="M"?"中午":""}} {{item.visitTime.visitTime}} {{item.queueNo}}号</span>
                    </div>
                </section>
                <footer>
                    <div class="text_tips" v-show="false">
                        <i></i>
                        <span>您所预约的医生已停诊，请去线下窗口退号</span>
                    </div>
                    <div class="btn" v-show="config.componentValue==1">
                        <!-- <span>再挂一次</span> -->
                        <span v-show="config.componentValue==1 &&(item.orderStatus==3||item.orderStatus==4)" @click.stop="DiagnosticResultsFun">诊断结果</span>
                        <!-- <span class="orgeen" v-show="item.orderStatus==3">服务评价</span> -->
                    </div>
                </footer>
            </li>
           
        </ul>
    </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import selectList from "@/components/selectList.vue";
import axios from "axios"
import {  appointmentConfig } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data() {
        return{
            list:[],
            userList:[],
            headers:{},
            config:{}
        }
    },
     computed: {
         ...mapGetters({userinfo:'userinfo',xBusinessId: 'xBusinessId',})
     },
     
      components: {
          selectList
      },
      created(){
            this.getJZJYlist('');
            this.getConfing();
      },
       mounted() {

       },
       methods:{
           DiagnosticResultsFun(){
               this.$router.push({name:'6-3'})
           },
           getConfing(){
               let params={
                   ucUiFlowId:this.xBusinessId,
                   stepId:'visitRecordDetail'
               }
               axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId="+this.xBusinessId+"&stepId=visitRecordDetail",appointmentConfig).then((res)=>{
                res.data.filter((item)=>{
                      if( item.ucUiConfigId=='cc8ed778-d31c-47ea-bccb-d6b05e34c038'){
                         this.config=item;
                      }
                   })
                //    console.log( this.config);
               }).catch((err)=>{
                console.log(err)
            })
           },
        getJZJYlist(val){
           
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.list=[];
            // this.headers={
            // // "Authorization": !localStorage.getItem('token') ? store.state.token : localStorage.getItem('token'), 
            // "Authorization": '04daa883843bc5ffda446bf92e983f91', 
            // //所有微服务接口加一个公共HEADER：X-BUSINESS-ID
            // // "X-BUSINESS-ID": !localStorage.getItem('xBusinessId') ? store.state.xBusinessId : localStorage.getItem('xBusinessId'), 
            // "X-BUSINESS-ID": 'e49f5778-12b5-11e7-aceb-507b9d24b9d1',
            // "Content-Type": "application/json;charset=utf-8",
            // "Accept": "application/json",
            // "S":'{"globalSession":{"clientMobileType":"","defaultHospitalId":"3487","defaultPlatformHospitalId":"52cd0571-0d88-4606-abe1-7bcf3969438dd","platformHospitalId":"52cd0571-0d88-4606-abe1-7bcf3969438dd","projectId":"04a71f58-a0f6-4b3c-a65c-1632c3786267"}}'
            // }
                    
            let params={
                scyUserId:this.userinfo.scyUserId,
                patientVisitId:val
            }
            
            axios.get(apiurl.PatientOrderListBySyuserId+"?scyUserId="+this.userinfo.scyUserId+"&patientVisitId="+val,appointmentConfig).then((res)=>{
                Indicator.close();
                if(res.data!=null){
                    this.userList=[{patientName:'全部',pvPatientVisitId:''}]
                   if( res.data.patientVisitList.length!=0){
                        res.data.patientVisitList.map(item=>{
                            this.userList.push(item);
                        })
                   }
                }
                if(res.data.patientOrderList.length!=0){
                    this.list=res.data.patientOrderList;
                }else{
                    Toast("无记录！")
                }
                console.log(res);
            }).catch((err)=>{
                Indicator.close();
                console.log(err)
            })
            
        },
        Onclick(){
            this.ListShow=!this.ListShow;
        },
        goDetails(patientOrderId){
            this.$router.push({'name':'6-1-2',params:{orderId:patientOrderId,userId:this.userList[1].scyUserId}});
        },
       
       }
}
</script>

<style lang="scss" scoped>
.select_body{
    .jzrecords{
        margin-top:38px;
        li{
            background: #fff;
            margin-bottom: 8px;
            padding: 0 14px;
            header{
                font-size: 15px;
                border-bottom: 1px solid #E2E2E2;
                line-height: 44px;
                label{
                    float: left;
                    color: #666666;
                }
                span{
                    float: right;
                    color: #999999;
                }
                .text_orange{
                    color: #FF7B35;
                }
            }
            section{
                padding-top:15px;
                padding-bottom: 10px;
                .ks_name{
                    font-size: 17px;
                    color: #333333;
                    font-weight: bold;
                }
                .xm_name{
                    font-size: 15px;
                    color: #333333;
                }
                .lag_tips{
                    padding:2px 4px;
                    font-size: 12px;
                    color: #FFFFFF;
                    border-radius: 2px;
                }
                .orange{
                    background:#FF5F4E;
                }
                .yellow{
                    background:#FFC136;
                }
                .blue{
                    background:#35A4FF;
                }
                .content_list{
                    line-height: 30px;
                    i,span{
                        font-size: 14px;
                        color: #999999;
                        display: inline-block;
                    }
                    i{
                        width:12px;
                        height: 12px;
                        margin-right: 5px;
                       
                    }
                    .i_name{
                        background: url('../assets/img/prson_name_icon.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .i_address{
                        background: url('../assets/img/addre_icon.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .i_time{
                        background: url('../assets/img/time_icon.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            footer{
                width:100%;
                border-top: 1px dashed #E2E2E2;
                .text_tips{
                    padding: 12px 0;
                    font-size: 14px;
                    color: #666666;
                    i,span{
                        display: inline-block;
                    }
                    i{
                        width:7px;
                        height: 7px;
                        background: url('../assets/img/tips_quan_icon.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .btn{
                    padding: 8px 0;
                   text-align: right;
                    span{
                        display: inline-block;
                        border: 1px solid #CDCDCD;
                        border-radius: 4px;
                       padding: 4px 10px;
                       margin-left: 5px;
                    }
                    .orgeen{
                        font-size: 14px;
                        color: #FF7B35;
                        border: 1px solid #FF7B35;
                    }
                }
            }

        }
    }
}
</style>
