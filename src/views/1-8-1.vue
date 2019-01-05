<template>
    <div class="page-container">
        <mt-header fixed :title="pageTitle" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <div class="page-content "  :class="{'margintop45':iswxshow}">
            <VisitTimePeriod v-if="periods.length>0" :periods="periods" @goToNext="goToNext"></VisitTimePeriod>
            <div v-else>
                <NoData></NoData>
            </div>
        </div>
    </div>
</template>

<script>
import VisitTimePeriod from '../components/visitTimePeriod'
import NoData from '../components/noData'
import { Indicator } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
export default {
    data() {
        return {
            stepId: '',     // 页面ID
            pageTitle: '2018-01-13',
            periods: [],
        }
    },
    computed: {
        ...mapGetters({
            selectVisitPeriod: 'selectVisitPeriod',iswxshow:'iswxshow',selectVisitTime:'selectVisitTime',selectDoctor:'selectDoctor',selectDept:'selectDept',selectHos:'selectHos'
        })
    },
    components: {
        Indicator,
        VisitTimePeriod,
        NoData,
    },
    mounted() {
        this.title('选时段号源')
        setTimeout(() => {
            this.stepId = this.flowEngine.currentState.vId;
            this.getTimePeriod();
        }, 10);
    },
    methods: {
        ...mapActions(['set_selectVisitPeriod']),
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        },
        goToNext(payload) {
            var self = this;
            self.set_selectVisitPeriod({});
            // let visitPeriod = {
            //     visitTime: payload.periodObj.visitTime,
            //     ampmView: payload.periodObj.tAmPm.ampmView,
            //     remainNumber: payload.periodObj.remainNumber,
            // }
            self.set_selectVisitPeriod(payload);
            // console.log('就诊时段:', self.selectVisitPeriod);

            self.flowEngine.nextState('next', (err, state)=>{
                self.$router.push({
                 path: '/'+state.key
                })
            })
        },
        getTimePeriod() {
            var self = this;
            let params = {
                stepId: self.stepId,
                branch:this.selectHos,
                department:self.selectDept,
                doctor:this.selectDoctor.doctorObj,
                schedul:this.selectVisitTime.timeObj
            }
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentpost(apiurl.GetVisitPeriod, params)
            .then(function (response) {
                Indicator.close();
                if(response.status == 200) {
                    self.periods = response.data;
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


