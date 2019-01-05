<template>
    <div class="page-container page-appointresult bgcolor-white" style="padding-bottom:20px;">
        <mt-header fixed title="预约成功" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back"></mt-button>
            <mt-button slot="right" @click="finishAppoint">
                <span class="color-1c98fc">完成</span>
            </mt-button>
        </mt-header>
        <div class="page-content paddingX15" :class="{'margintop45':iswxshow}">
            <AppointResult></AppointResult>
            <div class="solid-line"></div>
            <Notice :notice="notice" v-show="notice"></Notice>
            <AppointResultInfo class="paddingtop37" :listInfo="listInfo"></AppointResultInfo>
        </div>
        <div style="padding:0 50px;" v-show="!iswxshow">
            <mt-button type="primary" size="large" @click="finishAppoint">完成</mt-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from "axios"
import AppointResult from '../components/appointResult'
import Notice from '../components/notice'
import AppointResultInfo from '../components/appointResultInfo'
import { mapGetters,mapActions } from 'vuex'
import { Toast,Indicator } from 'mint-ui';
import {  appointmentConfig } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
export default {
    data() {
        return {
            notice: '',
            listInfo:[]
        }
    },
    computed: {
        ...mapGetters({
            xBusinessId: 'xBusinessId',userinfodata:'userinfodata',iswxshow:'iswxshow'
        })
    },
    created(){
        this.title('预约结果')
        this.getInfo();
    },
    components: {
        AppointResult,
        Notice,
        AppointResultInfo,
    },
    methods: {
        getInfo(){
            Indicator.open({ 
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            axios.post(apiurl.GetInfoYYok,this.userinfodata,appointmentConfig).then((res)=>{
                Indicator.close();
                //  console.log(res);
               let arr=[];
                 if(res.status==200){
                     if(res.data){
                        res.data.viewUcUiConfigs.map(item=>{
                            if(item.componentKey=='#tips'){
                                this.notice=item.componentDesc;
                            }else if(item.componentKey=='#orderInfo'){
                               arr=JSON.parse(item.componentDesc);
                              this.listInfo= arr.map(item=>{
                                   let a={key:item.value,value:res.data.detailMap[item.key]}
                                   return a;
                               });
                            //    console.log('111',this.listInfo)
                            }
                        })

                     }
                     
                 }
             }).catch((err)=>{
                 Indicator.close();
                 console.log(err)
             })
             ;
        },
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        },
        finishAppoint() {
            this.flowEngine.end();    // 流程结束
            Toast('预约完成');
            setTimeout(()=>{
                WeixinJSBridge.call('closeWindow');
            },500)
            // this.$router.push({
            //     path: '/',
            //     query: {
            //         xBusinessId: !localStorage.getItem('xBusinessId') ? this.xBusinessId : localStorage.getItem('xBusinessId')
            //     }
            // })
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .page-appointresult {
        .solid-line {
            height: 0;
            border-top: 1px solid #f0f3f5;
        }
        .paddingtop37 {
            @include cal(padding-top, 37px);
        }
    }
</style>


