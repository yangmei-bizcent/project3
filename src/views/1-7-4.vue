<template>
    <div class="page-container">
        <mt-header fixed :title="pageTitle" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <TopNotice v-show="noticeDate" class="reportIndex_notice" :notice="noticeDate"></TopNotice>
        <section-introduction v-if="departmentDate" :departmentDate="departmentDate"></section-introduction>
        <div class="page-content" :class="{'margintop60':iswxshow}">
            <DoctorList v-if="doctorList.length>0" :doctorList="doctorList" @goToNext="goToNext"></DoctorList>
            <div v-else>
                <NoData></NoData>
            </div>
        </div>
    </div>
</template>

<script>
import DoctorList from '../components/doctorList'
import NoData from '../components/noData'
import TopNotice from '../components/topNotice'
import { Indicator } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
import sectionIntroduction from '../components/sectionIntroduction'
export default {
    data(){
        return {
            stepId: '',     // 页面ID
            pageTitle: '',
            doctorList: [],
            noticeDate:"",
            departmentDate:''
        }
    },
    computed: {
        ...mapGetters({
            selectDoctor: 'selectDoctor',
            selectDept: 'selectDept',
            selectHos:'selectHos',
            selectDept:'selectDept',
            iswxshow:'iswxshow'
        })
    },
    components: {
        Indicator,
        DoctorList,
        NoData,
        TopNotice,
        sectionIntroduction
    },
    mounted() {
        this.title('选医生')
        this.pageTitle = this.selectDept.deptName;
        setTimeout(() => {
            this.stepId = this.flowEngine.currentState.vId;
            this.getDoctorList();
        }, 10);
       
    },
    methods: {
        ...mapActions(['set_selectDoctor']),
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        },
        goToNext(payload) {
            var self = this;
            self.set_selectDoctor({});
           
            self.set_selectDoctor(payload);
            console.log('选择医生:', self.selectDoctor);
            
            self.flowEngine.nextState('next', (err, state)=>{
                self.$router.push({
                 path: '/'+state.key
                })
            })
        },
        getDoctorList() {
            var self = this;
            let params = {
                stepId: self.stepId,
                branch:this.selectHos,
                department:self.selectDept,
                // visitTime:self.selectVisitTime
            }
            Indicator.open({
                text: '医生列表加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentpost(apiurl.GetDoctorsList, params)
            .then(function (response) {
                // console.log('医生列表',response.data)
                Indicator.close();
                if(response.status == 200) {
                    self.doctorList = response.data.doctList;
                    self.departmentDate=response.data.departmentIntroduction;
                    response.data.viewUcUiConfigs.map(item=>{
                        if(item.componentKey=="#tips1_7_4"){
                            self.noticeDate=item.componentDesc;
                        }
                    })
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


