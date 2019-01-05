<template>
    <div class="page-container page-hospitalList">
        <mt-header fixed title="选择院区" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <div class="page-content" :class="{' margintop60':iswxshow}">
            <div v-if="hospitalListData.length>0" v-for="(item, index) in hospitalListData" :key="index" @click="next(item, item.branchIdentify)">
                <mt-cell :title="item.branchName" is-link></mt-cell>
            </div>
            <div v-else>
                <NoData></NoData>
            </div>
        </div>
    </div>
</template>

<script>
import NoData from '../components/noData'
import { Header, Cell, Button, Indicator } from 'mint-ui'
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';

export default {
    data() {
        return {
            stepId: '',     // 页面ID
            hospitalListData: [],
        }
    },
    computed: {
        ...mapGetters({
            selectHos: 'selectHos',
            hospitalList: 'hospitalList',
            iswxshow:'iswxshow'
        })
    },
    components: {
        Header,
        Cell,
        Button,
        Indicator,
        NoData,
    },
    mounted() {
        var self = this;
         setTimeout(() => {
            self.stepId = self.flowEngine.currentState.vId;
            self.getHospitalList();
        }, 10);
       
       this.title('选院区');
    },
    methods: {
        ...mapActions(['set_selectHos', 'set_hospitalList']),
        goToPrev(){
            this.$router.push({
                path: '/'
            })
        },
        getHospitalList() {
            var self = this;
            Indicator.open({
                text: '院区列表加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentpost(apiurl.GetHospitalList, {stepId: self.stepId})
            .then(function (response) {
                Indicator.close();
                if(response.status == 200) {
                    self.hospitalListData = response.data.branchList;
                    self.set_hospitalList(response.data.branchList);
                    // console.log('医院列表：', self.hospitalList);
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        next(data, branch) {
            var self = this;
            self.set_selectHos({});
            self.set_selectHos(data);
            console.log('院区:', self.selectHos);
            // console.log('当前页面：', this.flowEngine.currentstate.key);
            this.flowEngine.nextState(branch,(err, state)=>{
                console.log('222',state)
                self.$router.push({
                    path: '/'+state.key
                })
            })
        },
    },
   
    
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .page-hospitalList {
        .page-content {
            
        }
        .mint-cell {
            @include cal(min-height, 50px);
        }
        .mint-cell:last-child {
            background-image: none;
        }
    }
</style>


