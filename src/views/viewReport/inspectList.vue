<template>
    <section class="checkList">
        <report-header :reportHeader="reportHeader"></report-header>
        <report-section :repSecDate="repSecDate" class="marginB8"></report-section>
        <report-section :repSecDate="repSecDate2" class="marginB8"></report-section>
        <ul class="imglist">
            <li v-if="bgditeminfo.inspect.cloudGlues" v-for="(item,index) in bgditeminfo.inspect.cloudGlues" :key="'0'+index" @click="goImg(item.jumpUrl);"><img v-show="item.type==1" :src="item.content"> <p style="color:#0066cc" v-show="item.type==2" >{{item.content}}</p></li>
            <li v-if="bgditeminfo.inspect.pics" v-for="(item,index) in bgditeminfo.inspect.pics" :key="index"><img :src="item"></li>
        </ul>
    </section>
</template>

<script>
import axios from "axios"
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { BaseUrl, apiurl } from '@/service/api.js';
import { Indicator, Toast, MessageBox } from 'mint-ui'
import reportHeader from '../../components/reportHeader'
import reportSection from '../../components/reportSection'
require('../../assets/sass/reportIndex.scss');
export default {
 data(){
        return{
            reportHeader:{
                userInfo:{
                   
                }
            },
           repSecDate:{
               title:'检查描述',
                content:''
              
           },
           repSecDate2:{
               title:'检查结论',
               content:''
           },
          
        }
    },
     computed: {
      ...mapGetters({
            userinfo: 'userinfo',
            xBusinessId: 'xBusinessId',
            projectId: 'projectId',
           bgditeminfo:'bgditeminfo'
        })
    },
     components: {
       reportHeader,
       reportSection,

    },
    mounted() {
        this.reportHeader.userInfo=this.bgditeminfo;
        this.repSecDate.content=this.bgditeminfo.describe;
        this.repSecDate2.content=this.bgditeminfo.checkConclusion;
        console.log(this.bgditeminfo)
    },
    methods: {
       goImg(url){
            window.open(url);
       }
    },

}
</script>

