<template>
    <div class="appointForm color-8f8f8f">
        <div @click="selectPeriod">
            <mt-cell title="时段/序号" is-link :value="appointInfo.visitPeriod+'/'+appointInfo.remainNumber+'号'"></mt-cell>
        </div>
        <div @click='selectPatient'>
            <mt-cell title="就诊人" is-link :value="appointInfo.patientName"></mt-cell>
        </div>
        <div @click='ifFirstVisit'  v-if="isShowObj.isShowCz>0">
            <mt-cell title="初/复诊" is-link :value="appointInfo.ifFirstVisit"></mt-cell>
        </div>
        <div v-if="isShowObj.isShowMS>0">
            <mt-field label="病情主诉" placeholder="请描述病情" type="textarea" rows="3" v-model="diseaseDesc"></mt-field>
        </div>

        <mt-actionsheet :actions="actionSheetData.periodList" v-model="periodListShow"></mt-actionsheet>    <!-- 时段/序号 -->
        <mt-actionsheet :actions="actionSheetData.patientList" v-model="patientListShow"></mt-actionsheet>    <!-- 就诊人 -->
        <mt-actionsheet :actions="actionSheetData.ifFirstVisitList" v-model="ifFirstVisitShow"></mt-actionsheet>    <!-- 初/复诊 -->
    </div>
</template>

<script>
import { Cell, Button, Actionsheet, Field } from 'mint-ui';
export default {
    data() {
        return {
            patientListShow: false, // 就诊人选择
            periodListShow: false,
            ifFirstVisitShow: false,
            diseaseDesc: '',
        }
    },
    props: ['appointInfo', 'actionSheetData',"isShowObj"],
    components: {
        Cell,
        Button,
        Actionsheet,
        Field,
    },
    mounted() {
        
    },
    methods: {
        // 选择时段/序号
        selectPeriod() {
            this.periodListShow = true;
        },
        // 选择就诊人
        selectPatient() {
            this.patientListShow = true;
        },
        // 选择初/复诊
        ifFirstVisit() {
            this.ifFirstVisitShow = true;
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .appointForm {
        .mint-cell-title {
            flex: initial;
            @include cal(width, 90px);
        }
        .mint-cell-value {
            color: #3d3d3d;
        }
        .mint-cell:last-child {
            background-image: none;
        }
        .mint-field.is-textarea .mint-cell-title {
            height: 100%;
            padding: 12px 0;
        }
    }
</style>


