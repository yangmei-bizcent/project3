<template>
    <div class="doctorList fontsize0">
        <div>
            <a v-for="(item, index) in doctorList" :key="index" class="mint-cell" @click="item.unusedSource>0?goToNext(item):''">
                <span class="mint-cell-mask"></span>
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text fontsize-2 color-8f8f8f block nowrap lineEllipsis">
                            <span class="fontsize0 color-3d3d3d width70 inlineBlock lineEllipsis">{{ item.doctName }}</span>
                            <span class="width70 inlineBlock lineEllipsis marginleft10">{{ item.doctPosition }}</span>
                            <!-- <span class="width50 inlineBlock lineEllipsis marginleft10">&yen;{{ item.outpatientFee }}</span> -->
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
    props: ['doctorList'],
    components: {
        
    },
    mounted() {
    },
    methods: {
        goToNext(item) {
            this.$emit('goToNext', {doctorObj: item});
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
.doctorList {
    .width70 {
        @include cal(width, 70px);
    }
    .width50 {
        @include cal(width, 50px);
    }
    .mint-cell-wrapper {
        line-height: initial;
    }
}
</style>


