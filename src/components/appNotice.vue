<template>
    <div class="appoint-notice marginX10 bgcolor-white color-333">
        <div class="app-notice-header paddingX10 padding15X">
            <i class="icon-notice width-height-15 marginright5"></i>
            {{ appointNotice.headDesc==null?'预约须知':appointNotice.headDesc }}
        </div>
        <div class="divider relative">
            <div class="d-left width-height-15 borderRadius100 absolute"></div>
            <div class="dash-line"></div>
            <div class="d-right width-height-15 borderRadius100 absolute"></div>
        </div>
        <div class="app-notice-content paddingX10 padding15X" v-html="appointNotice.componentDesc"></div>
        <div class="dotted-line relative"></div>
    </div>
</template>

<script>
export default {
    props: ['appointNotice'],
}
</script>

<style lang="scss">
    @import '@/assets/sass/base_common.scss';
    .appoint-notice {
        @include font-dpr(14px);
        .dotted-line {
            height: 0;
            border-top: 6px dotted #f0f3f5;
            top: 3px;
        }
        .width-height-15 {
            @include cal(width, 15px);
            @include cal(height, 15px);
        }
        .icon-notice {
            background: url('../assets/img/appointnotice_notice.png') center no-repeat;
            background-size: contain;
            position: relative;
            top: 2px;
        }
        .borderRadius100 {
            border-radius: 100%;
        }
        .app-notice-content * {
            @include font-dpr(12px);
            color: #8f8f8f !important;
        }
        .d-left {
            top: -7px;
            left: -7px;
            background-color: #f0f3f5;
        }
        .d-right {
            top: -7px;
            right: -7px;
            background-color: #f0f3f5;
        }
        .dash-line {
            width: 100%;
            height: 0;
            border-top: 4px dotted #f0f3f5;
        }
    }
</style>


