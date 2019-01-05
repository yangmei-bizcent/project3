<template>
    <div class="notice margintop13">
        <div class="tablecell">
            <i class="width-height-15 marginright5"></i>
        </div>
        <div class="tablecell">{{ notice }}</div>
    </div>
</template>

<script>
export default {
    props: ['notice'],
}
</script>

<style lang="scss">
    @import '@/assets/sass/base_common.scss';
    .notice {
        @include font-dpr(14px);
        color: #8f8f8f;
        &.margintop13 {
            @include cal(margin-top, 13px);
        }
        .width-height-15 {
            @include cal(width, 15px);
            @include cal(height, 15px);
        }
        i {
            background: url('../assets/img/notice.png') center no-repeat;
            background-size: contain;
            position: relative;
            top: 2px;
        }
        
    }
</style>


