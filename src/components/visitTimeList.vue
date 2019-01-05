<template>
    <div class="visitTimeList fontsize0">
        <!-- <mt-cell v-for="(item, index) in timeListData" :key="index" :title="item.clinicDate.substring(5, 10)+item.week+' '+item.tAmPm.ampmView" is-link>
            <span v-if="item.unusedSource>0" class="color-8f8f8f">
                余号&nbsp;<span class="color-1c98fc">{{ item.unusedSource }}</span>
            </span>
            <span v-else class="color-d6d6d6">已满</span>
        </mt-cell> -->
        <div>
            <a v-for="(item, index) in timeListData" :key="index" class="mint-cell" @click="item.unusedSource>0?goToNext(item):''">
                <span class="mint-cell-mask"></span>
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text">
                            {{ item.clinicDate.substring(5, 10)+item.week }} 
                            <span class="fontsize-2 color-8f8f8f marginleft15">{{ item.tAmPm.ampmView }}</span>
                        </span>
                    </div>
                    <div class="mint-cell-title" v-show="item.payFee">
                        <span class="mint-cell-text">
                            <span class="fontsize-2 color-8f8f8f">￥{{item.payFee}}</span>
                        </span>
                    </div>
                    <div class="mint-cell-value is-link">
                        <span v-if="item.unusedSource>0" class="color-8f8f8f">
                            余号&nbsp;<span class="color-1c98fc">{{ item.unusedSource }}</span>
                        </span>
                        <span v-else class="color-d6d6d6">已满</span>
                    </div>
                    <i class="mint-cell-allow-right"></i>
                </div>
                <div class="mint-cell-right"></div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    props: ['timeListData'],
    components: {
        
    },
    mounted() {
    },
    methods: {
        goToNext(item) {
            this.$emit('goToNext', {timeObj: item});
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
.cell-container {
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
    
    table {
        td {
            @include cal(height, 48px);
            text-decoration: none;
        }
    }
}
</style>


