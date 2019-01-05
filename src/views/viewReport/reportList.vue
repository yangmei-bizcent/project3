<template>
    <section class="reportList">
        <header>
            <nav v-if="reportDate.datetimes">
                <a v-for="(item,index) in reportDate.datetimes" :class="{curr_replist:index==currindex}" @click="navFun(index,item,1)" :key="index"><span>{{item.headDesc}}</span></a>
            </nav>
            <nav v-if="reportDate.reportTypes">
                <a v-for="(item,index) in reportDate.reportTypes" :class="{curr_replist:index==currindex}" @click="navFun(index,item,2)" :key="index"><span>{{item.headDesc}}</span></a>
            </nav>
        </header>
        <div>
            <div v-show="reportLen>0"  v-for="(item,index) in reportDate.reports" :key="index" @click="goDetail(item)">
                <mt-cell :title="item.reportName" :label="item.assayDate" is-link ></mt-cell>
            </div>
            <div v-show="reportLen==0" class="noDate">
                暂无记录
            </div>
            <!-- <mt-cell title="浅表局部肿块彩超检查" label="2018-08-23 18:09:19" is-link to=""></mt-cell>
            <mt-cell title="浅表局部肿块彩超检查浅表局部肿块彩超检查" label="2018-08-23 18:09:19" is-link to=""></mt-cell> -->
        </div>
    </section>
</template>

<script>
import axios from "axios"
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost ,appointmentConfig} from '@/service/config.js'
import { BaseUrl, apiurl } from '@/service/api.js';
import { Indicator, Toast, MessageBox ,Cell } from 'mint-ui'
require('../../assets/sass/reportIndex.scss');
export default {
 data(){
        return{
            currindex:0,
            reportDate:"",
            reportLen:0
        }
    },
     computed: {
        ...mapGetters({
            userinfo: 'userinfo',
            xBusinessId: 'xBusinessId',
            projectId: 'projectId',
            hospitalList: 'hospitalList',
            iswxshow:'iswxshow',
            hospitalId:'hospitalId',
            jzrinfo:'jzrinfo',
            reportstate:'reportstate',
            reportitem:'reportitem'
        })
    },
     components: {
       Cell
    },
    mounted() {
        
        if(this.reportstate!=""){
           this.currindex=this.reportstate
           if(this.reportitem.type==1){
                this.getReportlist(this.reportitem.item.componentKey,"");
           }else if(this.reportitem.type==2){
               this.getReportlist("",this.reportitem.item.componentKey);
           }
      
        }else{
            this.getReportlist("","");
        }
        
    },
    methods: {
        ...mapActions(['set_bgditeminfo','set_reportstate','set_reportitem']),
        getReportlist(daynum,reportType){//获取报告单
            let data={
                patientVisit:this.jzrinfo
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            axios.post(`${apiurl.getReportlist}${this.xBusinessId}?daynum=${daynum}&reportType=${reportType}`,data,appointmentConfig).then((res)=>{
                Indicator.close();
                if(res.data){
                    this.reportDate=res.data;
                    this.reportLen=this.reportDate.reports.length;
                }
                console.log('获取报告单',res)
            }).catch((err)=>{
                Indicator.close();
                console.log(err)
            })
        },
       navFun(index,item,type){
           if(index==this.currindex){
               return;
           }
           console.log('item',item)
           this.set_reportitem({item:item,type:type});
           if(type==1){
                this.getReportlist(item.componentKey,"");
           }else if(type==2){
                this.getReportlist("",item.componentKey);
           }
          
           this.currindex=index;
       },
       goDetail(item){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                axios.post(`${apiurl.getReportDetail}${this.xBusinessId}/${this.userinfo.scyUserId}/detail`,item,appointmentConfig).then((res)=>{
                    Indicator.close();
                    if(res.data){
                        this.set_reportstate(this.currindex);
                        this.set_bgditeminfo(res.data);
                        if(res.data.reportType=="INSPECT"){
                            this.$router.push({name:'checkList'})
                        }else if(res.data.reportType=="INSPECTPIC"){
                            this.$router.push({name:'inspectList'})
                        }else if(res.data.reportType=="CHEMICAL"){
                            this.$router.push({name:'microorganism'})
                        }else if(res.data.reportType=="IMAGE"){
                            this.$router.push({name:'imageList'})
                        }
                    }
                    // console.log('获取报告单',res)
                }).catch((err)=>{
                    Indicator.close();
                    console.log(err)
                })
       }
    },

}
</script>

