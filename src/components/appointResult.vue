<template>
    <div class="appointResult textAlignCenter" :class="{'paddingtop32':iswxshow}">
        <i></i>
        <div class="fontsize2">预约成功！</div>
        <div class="fontsize0 color-1c98fc margintop6" @click="goList">点击查看就诊记录</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            userinfodata:'userinfodata',iswxshow:'iswxshow'
        })
    },
    methods: {
           goList(){
               this.$router.push({'name':'6-1-1'});
           } 
        }
    
}
</script>

<style lang="scss">
    @import '@/assets/sass/base_common.scss';
    .appointResult {
        
        @include cal(padding-bottom, 32px);
        .margintop6 {
            @include cal(margin-top, 6px);
        }
        
    }
    .paddingtop32{
            padding-top:32px;
        }
</style>


