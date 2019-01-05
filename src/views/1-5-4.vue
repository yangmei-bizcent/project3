<template>
    <div class="page-container page-sectionlist">
        <mt-header fixed title="选择科室" v-show="iswxshow">
            <mt-button slot="left" @click="goToPrev" icon="back">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;关闭</mt-button>
        </mt-header>
        <div class="page-content" :class="{'margintop45':iswxshow}">
            <div class="fixed width100 zindex1000" :class="{'top45':iswxshow,'top0':!iswxshow}">
                <mt-search 
                    v-model="searchKey" 
                    @keyup.enter.native="searchStart"></mt-search>
            </div>
            <div class="margintop48" :class="{'margintop93':iswxshow}">
                <div v-if="sectionList.length>0" v-for="(item, index) in sectionList" :key="index" @click="next(item)">
                    <mt-cell :title="item.deptName" is-link value=""></mt-cell>
                </div>
                <div v-else>
                    <NoData></NoData>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoData from '../components/noData'
import { Navbar, TabItem, TabContainer, TabContainerItem, Search, Indicator } from 'mint-ui';
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost } from '@/service/config.js'
import { apiurl } from '@/service/api.js';

export default {
    data() {
        return {
            stepId: '',     // 页面ID
            selected: '1',
            sectionList: [],
            allSectionList: [],
            searchKey: '',
            timeout:  null,
        }
    },
    components: {
        Navbar,
        TabItem,
        TabContainer,
        TabContainerItem,
        Search,
        Indicator,
        NoData
    },
    computed: {
        ...mapGetters({
            selectDept: 'selectDept',selectHos:'selectHos',iswxshow:'iswxshow'
        })
    },
    mounted() {
        this.title('选科室')
        setTimeout(() => {
           this.stepId = this.flowEngine.currentState.vId;
            this.getSectionList();
        }, 10);
    },
    methods: {
        ...mapActions(['set_selectDept']),
        // START--------搜索
        searchStart() {
            // console.log('试验触发搜索');
            var allSectionList = this.allSectionList;
            var results = this.searchKey ? allSectionList.filter(this.createStateFilter(this.searchKey)) : allSectionList;
            console.log('搜索结果是：', results);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.sectionList = results;
            }, 1000 * Math.random());
        },
        createStateFilter() {
            return (state) => {
                return (state.deptName.search(this.searchKey) != -1);
            };
        },
        // END--------搜索
        getSectionList() {
            var self = this;
            let params = {
                stepId: self.stepId,
                branch:this.selectHos
            }
            Indicator.open({
                text: '科室列表加载中...',
                spinnerType: 'fading-circle'
            });
            appointmentpost(apiurl.GetSectionList, params)
            .then(function (response) {
                Indicator.close();
                if(response.status == 200) {
                    self.sectionList = [];
                    self.allSectionList = [];
                    self.sectionList = response.data.deptList;
                    self.allSectionList = response.data.deptList;
                }
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        goToPrev(){
            this.flowEngine.preState((err, state)=>{
                this.$router.push({
                 path: '/'+state.key
                })
            })
        },
        next(data) {
            var self = this;
            self.set_selectDept({});
           
            self.set_selectDept(data);
            // console.log('科室:', self.selectDept);

            this.flowEngine.nextState('next', (err, state)=>{
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
    .page-sectionlist {
        .zindex1000 {
            z-index: 1000;
        }
        .top45 {
            @include cal(top, 45px);
        }
        .margintop48 {
            @include cal(margin-top, 48px);
        }
        .margintop93 {
            @include cal(margin-top, 93px);
        }
        .mint-cell-wrapper {
            @include font-dpr(14px);
        }
        .mint-cell:last-child {
            background-image: none;
        }
    }
</style>


