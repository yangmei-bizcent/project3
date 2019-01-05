<template>
    <div class="page-container page-visittime">
        <mt-header fixed title="就诊时间" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <div class="page-content" :class="{'margintop45':iswxshow}">
            <DoctorCard :doctorInfo="doctorInfo" ref="docid"></DoctorCard>
            <VisitTimeList v-if="timeListData.length>0" :timeListData="timeListData" @goToNext="goToNext"></VisitTimeList>
            <div v-else>
                <NoData></NoData>
            </div>
        </div>
    </div>
</template>

<script>
import DoctorCard from '../components/doctorCard'
import VisitTimeList from '../components/visitTimeList'
import NoData from '../components/noData'
import { Header, Cell, Indicator } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';

export default {
    data() {
        return {
            stepId: '',     // 页面ID
            doctorInfo: {},
            timeListData: [],
        }
    },
    computed: {
        ...mapGetters({
            selectVisitTime: 'selectVisitTime',selectHos:'selectHos',iswxshow:'iswxshow',selectDoctor:'selectDoctor',selectDept:'selectDept'
        })
    },
    components: {
        Header,
        Cell,
        Indicator,
        DoctorCard,
        VisitTimeList,
        NoData
    },
    mounted() {
        this.title('选日期')
        setTimeout(() => {
            this.stepId = this.flowEngine.currentState.vId;
            this.getVisitTimeList();
        }, 10);
    },
    methods: {
        ...mapActions(['set_selectVisitTime']),
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        },
        goToNext(payload) {
            var self = this;
            self.set_selectVisitTime({});
            self.set_selectVisitTime(payload);
            // console.log('就诊时间:', self.selectVisitTime);

            self.flowEngine.nextState('next', (err, state)=>{
                self.$router.push({
                 path: '/'+state.key
                })
            })
        },
        getVisitTimeList() {
            var self = this;
            let params = {
                stepId: self.stepId,
                branch:this.selectHos,
                department:self.selectDept,
                doctor:this.selectDoctor.doctorObj
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentpost(apiurl.GetVisitTime, params)
            .then(function (response) {
                Indicator.close();
                // console.log("选日期页面",response.data)
                if(response.status == 200) {
                    self.doctorInfo = response.data.doctorDetail;
                    self.timeListData = response.data.schedulList;
                    if(response.data.viewUcUiConfigs[0].componentValue==1){
                        self.$refs.docid.setShow();
                    }
                    
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
    },
}
</script>

<style lang="scss">

</style>


