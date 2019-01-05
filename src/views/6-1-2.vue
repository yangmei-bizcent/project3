<template>
    <section class="jz_details">
        <div class="details_content">
            <header>
                <h3>{{dataList.deptName}}</h3>
                <span>{{dataList.medicalDate}}{{dataTime=="A"?'上午':dataTime=="P"?"下午":dataTime=="N"?"夜间":dataTime=="M"?"中午":""}} {{visitTime}} </span>
            </header>
            <ul class="details_list">
                <li class="clearfix">
                    <label>取号密码</label>
                    <span>{{dataList.voucherNo}}</span>
                </li>
                <li class="clearfix">
                    <label>就诊序号</label>
                    <span>{{dataList.queueNo}}</span>
                </li>
                <li class="clearfix">
                    <label>医生</label>
                    <span>{{dataList.doctorName}}</span>
                </li>
                 <li class="clearfix">
                    <label>门诊类型</label>
                    <span>{{dataList.clinicType==2?'专家':dataList.clinicType==1?'普通':''}}</span>
                </li>
                <li class="clearfix">
                    <label>就诊地址</label>
                    <span>{{dataList.branchName}}{{dataList.visitAddress}}</span>
                </li>
            </ul>
            <footer class="clearfix">
                <label>挂号费</label>
                <span>{{dataList.outpatientFee}}元<i style="color:red;font-style: normal;diplay:inline-block;" v-show="dataList.viewStatusName"> ({{dataList.viewStatusName}})</i></span>
            </footer>
        </div>
        <div class="btn" @click="cancelYY()" v-show="dataList.orderStatus==1 || dataList.orderStatus==2 ||dataList.orderStatus==4 ||dataList.orderStatus==7">
            <span>取消预约</span>
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import axios from "axios"
import { MessageBox } from 'mint-ui';
import { apiurl } from '@/service/api.js';
import { Indicator,Toast } from 'mint-ui';
import {  appointmentConfig } from '@/service/config.js'
export default {
    data(){
        return{
            dataList:{},
            dataTime:'',
            visitTime:'',
        }
    },
    created(){
        this.getPatientOrder();
    },
    methods:{
        getPatientOrder(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });

            // let params={
            //     patientOrderId:this.$route.params.orderId,
            //     scyUserId:this.$route.params.userId
            // }

            axios.get(apiurl.getPatientOrder+"?patientOrderId="+this.$route.params.orderId+"&scyUserId="+this.$route.params.userId,appointmentConfig).then((res)=>{
                Indicator.close();
                if(res.status==200){
                    this.dataList=res.data.patientOrder;
                    this.dataTime=res.data.patientOrder.tAmPm.ampmType;
                    this.visitTime=res.data.patientOrder.visitTime.visitTime;
                }
                // console.log(res);
            }).catch((err)=>{
                Indicator.close();
                console.log(err)
            })
        },
         cancelYY(){
             let data={
                'patientOrderId':this.dataList.patientOrderId
             }
             MessageBox.confirm('是否取消预约?').then(action => {
                

                axios.post(apiurl.cancelRegister,data,appointmentConfig).then((res)=>{
                    this.getPatientOrder();
                     Toast(res.data);
                }).catch((err)=>{
                    Toast(err);
                    console.log(err);
                })
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .jz_details{
        .details_content{
            background: #fff;
            padding:20px 14px;
            header{
                text-align: center;
                h3{
                    font-size: 20px;
                    color: #333333;
                    margin-bottom: 8px;
                }
                span{
                    font-size: 16px;
                    color: #333333;
                }
            }
            .details_list{
                margin-top:30px;
                li{
                    margin-bottom: 10px;
                    font-size: 16px;
                    label{float: left;width:25%;color: #666666;}
                    span{float: right;width:75%;text-align: right;color: #333333;}
                }
            }
            footer{
                font-size: 16px;
                border-top:1px solid  #E2E2E2;
                margin-top:20px;
                padding-top:16px;
                label{
                    float: left;
                    width:25%;
                    color: #666666;
                }
                span{
                    float: right;
                    width:75%;
                    text-align: right;
                    color: #333333;
                }
            }
        }
        .btn{
            position: fixed;
            left:0;
            bottom:0;
            width:100%;
            padding:8px 0;
            background: #fff;
            span{
                display: block;
                border: 1px solid #CDCDCD;
                border-radius: 4px;
                text-align: center;
                width:90%;
                padding:10px 0;
                margin:0 auto;
                font-size: 17px;
                color: #333333;
                z-index: 1;
            }
        }
    }
</style>
