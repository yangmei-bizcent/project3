<template>
    <section class="checkList">
        <report-header :reportHeader="reportHeader"></report-header>
        <report-section :repSecDate="repSecDate" class="marginB8"></report-section>
        <report-table :reportTable="reportTable"></report-table>
        <div class="twotips" v-show="remarks">
            备注：{{remarks}}
        </div>
    </section>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost,appointmentConfig } from '@/service/config.js'
import { BaseUrl, apiurl } from '@/service/api.js';
import axios from "axios"
import { Indicator, Toast, MessageBox } from 'mint-ui'
import reportHeader from '../../components/reportHeader'
import reportSection from '../../components/reportSection'
import reportTable from '../../components/reportTable'
require('../../assets/sass/reportIndex.scss');
export default {
 data(){
        return{
             reportHeader:{
                userInfo:{
                    
                }
            },
           repSecDate:{
               title:'诊断结论',
               content:''
           },
           reportTable:{
            //    title:['项目名称','结果','参考范围'],
            //    list:[{val:{name:"name",result:'result',default:'default',type:'H'}},{val:{name:"2",result:'5555',default:'2',type:'F'}},{val:{name:"2",result:'res2ult',default:'3',type:'L'}},{val:{name:"sdfa",result:'1',default:'1',type:'M'}},{val:{name:"单核细胞百分数单核细胞百分数",result:'0.51',default:'0~1',type:'0'}}],
            //     tips:"偏高 ↑ 偏低 ↓ 阳性 + 阴性 - 无状态为正常"
           },
           remarks:""
           
        }
    },
     computed: {
      ...mapGetters({
            userinfo: 'userinfo',
            xBusinessId: 'xBusinessId',
            projectId: 'projectId',
            hospitalList: 'hospitalList',
            hospitalId:'hospitalId',
            bgditeminfo:'bgditeminfo'
        })
    },
     components: {
       reportHeader,
       reportSection,
       reportTable
    },
    mounted() {
        this.reportHeader.userInfo=this.bgditeminfo;
        this.repSecDate.content=this.bgditeminfo.checkConclusion || '无';
        this.remarks=this.bgditeminfo.remarks;
        console.log('bgditeminfo',this.bgditeminfo);
        let b=[]
        this.bgditeminfo.assayItems.map(item=>{
            b.push({val:{name:item.itemName,result:item.result+item.unit,default:item.rangeLimit,type:item.state}});
        })
       this.reportTable={title:['项目名称','结果','参考范围'],list:b,tips:"偏高 ↑ 偏低 ↓ 阳性 + 阴性 - 无状态为正常"}

    },
    methods: {
    
    },

}
</script>

