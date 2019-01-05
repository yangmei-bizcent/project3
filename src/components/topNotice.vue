<template>
    <div class="topNotice fontsize-2 background-fdedc9 color-d08031">
        <i class="width-height-14 marginright5"></i>
        <span>{{ notice }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['notice'],
}
</script>

<style lang="scss">
    @import '@/assets/sass/base_common.scss';
    .topNotice {
        @include cal(padding, 10px);
        .width-height-14 {
            @include cal(width, 14px);
            @include cal(height, 14px);
        }
        i {
            position: relative;
            top: 2px;
            background: url('../assets/img/topNotice.png') center no-repeat;
            background-size: contain;
            vertical-align: top;
        }
        span{
            display: inline-block;
            word-wrap: break-word;
            width:90%;
        }
    }
</style>


