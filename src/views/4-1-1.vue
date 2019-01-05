<template>
    <div class="page-container page-visitorlist">
        <mt-header fixed title="就诊人管理" v-show="iswxshow">
            <mt-button slot="left" @click="$router.go(-1)" icon="back"></mt-button>
        </mt-header>
        <div class="page-content" :class="{'margintop40':iswxshow}">
            <div class="paddingbottom70">
                <TopNotice v-if="showTopNotice" :notice="notice"></TopNotice>
                <ul v-if="visitorsData.length > 0">
                    <li 
                        v-for="(item, index) in visitorsData" 
                        :key="index"
                        class="list-item">
                        <div 
                            :class="index%2==0?'odd':'even'"
                            class="paddingX15 padding15X bgcolor-white visitor-item flex-alignstart-justify-column color-333"
                            @click="toDetail(item)">
                            <div class="flex-align-justifystart">
                                <span class="fontsize4 bold">{{ item.patientName }}</span>
                                <span class="fontsize1">&nbsp;/&nbsp;{{ item.genderValue }}&nbsp;{{ item.age }}岁</span>
                                <span 
                                    v-if="item.isDefault==0?true:false"
                                    class="flex-align-justify-column fontsize-2 marginleft12 tag-blue">默认</span>
                                <span 
                                    v-if="item.healthCardNumber!=null"
                                    class="flex-align-justify-column fontsize-2 marginleft12 tag-green"><i></i>医保</span>
                            </div>
                            <table class="width100 fontsize2 margintop16">
                                <tr>
                                    <td class="color-999 left">{{ idCardTypeText(item.idCardType) }}</td>
                                    <td class="color-666">{{ item.idCard.substring(0, item.idCard.length-4)+'****' }}</td>
                                </tr>
                                <tr v-if="(item.cardNumber==null||item.healthCardNumber==null||item.patientIdCardNumber==null)?true:false">
                                    <td class="color-999">{{ cardTypeText(item.cardNumber, item.healthCardNumber, item.patientIdCardNumber) }}</td>
                                    <td class="color-666">{{ cardTypeVal(item.cardNumber, item.healthCardNumber, item.patientIdCardNumber) }}</td>
                                </tr>
                                <!-- <tr>
                                    <td class="color-999">院区</td>
                                    <td class="color-666">{{ item.cardNumber }}</td>
                                </tr> -->
                            </table>
                        </div>
                        <div 
                            v-if="item.isCertificate==0?false:true"
                            class="fontsize0 bgcolor-white link-tocertificate">还未实名，去认证&nbsp;&gt;</div>
                    </li>
                </ul>
                <div v-else class="have-no-visitor">
                    <img src="../assets/img/visitors/visitor_nodata.png" class="visitor-nodata" />
                    <div class="nodata-text">未添加就诊人</div>
                </div>
            </div>
            <div class="width100 fixed bottom0 left0 padding10X paddingX15 bgcolor-white">
                <mt-button type="primary" class="width100 fontsize3" @click.native="toAddVisitor">
                    <i class="icon-plus" slot="icon"></i>添加就诊人
                </mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
import TopNotice from '../components/topNotice'
import { Header,utton, Indicator, MessageBox } from 'mint-ui'
import { appointmentget, appointmentConfig } from '@/service/config.js'
import axios from "axios"
import { apiurl } from '@/service/api.js';
export default {
    data() {
        return {
            patientNumLimit: 0, // 最多添加就诊人数量
            notice: '',
            showTopNotice: false, 
            visitorsData: [],   // 就诊列表数据
        }
    },
    components: {
        TopNotice,
    },
    computed: {
         ...mapGetters({
            userinfo: 'userinfo',xBusinessId: 'xBusinessId', iswxshow:'iswxshow',
        })
    },
    mounted() {
        this.getPatientVisitList();
    },
    methods: {
        // 证件类型
        idCardTypeText(idcardtype) {
            switch(idcardtype) {
                case '1':
                    return '身份证';
                    break;
                case '2':
                    return '军官证';
                    break;
                case '3':
                    return '护照';
                    break;
                case '4':
                    return '华侨证';
                    break;
            }
        },
        // 判断显示卡号/医保卡/就诊卡 文本
        cardTypeText(cardnumber, healthcardnumber, patientidcardnumber) {
            if(cardnumber!=null) {
                return '卡号';
            }else if(healthcardnumber!=null) {
                return '医保卡';
            }else if(patientidcardnumber!=null) {
                return '就诊卡';
            }
            return '';
        },
        // 判断显示卡号/医保卡/就诊卡 值
        cardTypeVal(cardnumber, healthcardnumber, patientidcardnumber) {
            if(cardnumber!=null) {
                return cardnumber;
            }else if(healthcardnumber!=null) {
                return healthcardnumber;
            }else if(patientidcardnumber!=null) {
                return patientidcardnumber;
            }
            return '';
        },
        getPageConfig() {
            axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId="+ this.xBusinessId +"&stepId=bindPatientVisit",appointmentConfig).then((res)=>{
                if(res.data){
                    // console.log('配置项',res.data);
                    let addPatientLimit = res.data.filter((item) => {
                        return item.ucUiConfigId == 'c8cc36a2-b7b6-11e6-bca2-0050569b08a8';
                    });
                    this.patientNumLimit = parseInt(addPatientLimit[0].componentDesc);
                    if(this.patientNumLimit > 0) {
                        this.showTopNotice = true;
                        switch(this.patientNumLimit > this.visitorsData.length) {
                            case true:
                                this.notice = '已添加' + this.visitorsData.length + '人，还能添加' + (this.patientNumLimit-this.visitorsData.length) + '人';
                                break;
                            case false:
                                this.notice = '已添加' + this.visitorsData.length + '人，还能添加0人';
                                break;
                        }
                    }
                }
            });
        },
        // 
        toAddVisitor() {
            let self=this;
            if(self.patientNumLimit == 0 || self.patientNumLimit > self.visitorsData.length) {
                self.$router.push({
                    path: '/4-2',
                    query:{ucUiFlowId:self.xBusinessId}
                });
            }
            else {
                MessageBox('提示', '亲，就诊人数量达到上限，最多只能添加' + self.patientNumLimit + '位就诊人');
            }
        },
        getPatientVisitList() {
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
                    self.getPageConfig();
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        toDetail(item){
            this.$router.push({
                path: '/patientInfo',
                query: {
                    pvPatientVisitId: item.pvPatientVisitId,
                    ucUiFlowId: this.xBusinessId
                }
            });
        }
    },
}
</script>

<style lang="scss">
@import '../assets/sass/var.scss';
.page-visitorlist {
    table tr td{
        display: inline-block;
    }
    .left{
       margin-right: 5px;
    }

    .margintop16 {
        margin-top: 16px;
    }
    .have-no-visitor {
        padding-top: 25%;
        text-align: center;
        .visitor-nodata {
            width: 42%;
        }
        .nodata-text {
            font-size: 17px;
            color: #6c7d8f;
            margin-top: 28px;
        }
    }
    .visitor-item {
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.04);
        & + .visitor-item {
            margin-top: 12px;
        }
        &.odd {
            border-left: 4px solid $color-1c97fc;
        }
        &.even {
            border-left: 4px solid $color-16b797;
        }
    }
    .list-item {
        &+.list-item {
            margin-top: 12px;
        }
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.04);
    }
    .link-tocertificate {
        color: $color-1c97fc;
        height: 36px;
        line-height: 36px;
        padding: 0 18px;
        border-top: 1px solid $color-e2e2e2;
    }
}
</style>


