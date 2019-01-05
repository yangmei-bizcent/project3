<template>
    <section class="microorganism">
        <report-header :reportHeader="reportHeader"></report-header>
       <div v-for="(item,index) in reportTable" :key="index">
            <report-section2 :repSecDate2="item"></report-section2>
            <report-table :reportTable="item.germItems"  class="marginB8"></report-table>
       </div>
    </section>
</template>

<script>
import axios from "axios"
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { BaseUrl, apiurl } from '@/service/api.js';
import { Indicator, Toast, MessageBox } from 'mint-ui'
import reportHeader from '../../components/reportHeader'
import reportSection2 from '../../components/reportSection2'
import reportTable from '../../components/reportTable'
require('../../assets/sass/reportIndex.scss');
export default {
 data(){
        return{
            reportHeader:{
                userInfo:{
                    
                }
            },
        //    repSecDate:{
        //        title:'奇异变形菌',
        //        content:'无嗜血杆菌无真菌生长，正常菌群生长。',
        //        result:'+++3+'
        //    },
        //    repSecDate2:{
        //        title:'螺旋杆菌',
        //        content:'无嗜血杆菌无真菌生长，正常菌群生长。',
        //        result:'+++3+'
        //    },
           reportTable:[],
          
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
       reportSection2,
       reportTable

    },
    mounted() {
        this.reportHeader.userInfo=this.bgditeminfo;
        let a=[]
        let title=[];
        this.bgditeminfo.germs.map(item1=>{
            let b=[]
            let c=[]
           item1.germItems.map(item=>{
                b.push({val:{name:item.drugName,result:item.qualitativeResult,default:item.qualitativeState,type:0}});
                c={title:['药物名称','MIC/KB','药敏性'],list:b}
            })
            a.push({checkMethod:item1.checkMethod,cultureResult:item1.cultureResult,germName:item1.germName,resultDescription:item1.resultDescription,germItems:c})
        })
       
        this.reportTable=a;
        // console.log("aaab", this.reportTable)
    },
    methods: {
       
    },

}
</script>
