<template>
    <div class="page-container page-hospitalList">
        <mt-header fixed title="预约须知" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <div class="page-content" :class="{'margintop45':iswxshow}">
            <AppNotice :appointNotice="appointNotice"></AppNotice>
            <div class="paddingX15 margintop50 marginbottom10">
                <mt-button class="width100" type="primary" @click="goToAppoint()">确定</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import AppNotice from '../components/appNotice'
import { Button, Indicator } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';
export default {
    data() {
        return {
            stepId: '',     // 页面ID
            appointNotice: {}
        }
    },
    computed: {
        ...mapGetters({
            selectHos: 'selectHos',
            iswxshow:'iswxshow'
        })
    },
    components: {
        Indicator,
        AppNotice,
    },
    mounted() {
        this.title('预约须知')
        Indicator.open({
            text: '预约须知加载中...',
            spinnerType: 'fading-circle'
        });
        setTimeout(() => {
            this.stepId = this.flowEngine.currentState.vId;
            this.getAppointNotice();
        }, 10);
        console.log(this.flowEngine.currentState);
    },
    methods: {
        getAppointNotice() {
            var self = this;
            
            appointmentpost(apiurl.GetAppointNotice, {stepId: self.stepId,branch:this.selectHos})
            .then(function (response) {
                Indicator.close();
                // console.log("预约须知",response)
                if(response.status == 200) {
                    // console.log(response.data.viewUcUiConfigs[0]);
                    self.appointNotice = response.data.viewUcUiConfigs[0];
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        goToAppoint() {
            this.flowEngine.nextState('next', (err, state)=>{
                 this.$router.push({
                    path: '/'+state.key
                })
            })

        },
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        }
    },
}
</script>

<style lang="scss">
    
</style>


