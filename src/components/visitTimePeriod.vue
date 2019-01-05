<template>
    <div class="timePeriod fontsize0">
        <a v-for="(item, index) in periods" :key="index" class="mint-cell" @click="item.remainNumber>0?goToNext(item):''">
            <span class="mint-cell-mask"></span>
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                    <span class="mint-cell-text">
                        <span class="lineEllipsis color-3d3d3d minWidth120 inlineBlock">{{ item.visitTime }}</span>
                        <span class="color-8f8f8f marginleft30">{{ item.tAmPm.ampmView }}</span>
                    </span>
                </div>
                <div class="mint-cell-value is-link">
                    <span v-if="item.remainNumber>0" class="background-1c98fc fontsize-4 color-white inlineBlock borderRadius2 paddingX3 paddingY4">
                        余&nbsp;{{ item.remainNumber>9?item.remainNumber:'0'+item.remainNumber }}
                    </span>
                    <span v-else class="fontsize-2 color-d6d6d6">已满</span>
                </div>
                <i class="mint-cell-allow-right"></i>
            </div>
            <div class="mint-cell-right"></div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['periods'],
    components: {
        
    },
    mounted() {
        
    },
    methods: {
        goToNext(item) {
            this.$emit('goToNext', {periodObj: item});
        }
    },
}
</script>

<style lang="scss">
    @import '@/assets/sass/base_common.scss';
    .timePeriod {
        .paddingX3 {
            @include cal(padding-left, 3px);
            @include cal(padding-right, 3px);
        }
        .paddingY4 {
            @include cal(padding-top, 4px);
            @include cal(padding-bottom, 4px);
        }
        .minWidth120 {
            @include cal(width, 120px);
        }
    }
</style>


