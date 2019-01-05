<template>
    <div class="appointResultInfo fontsize2 padding10X">
        <table class="width100">
            <!-- <tr v-show="listInfo.voucherNo">
                <td class="color-666 minwidth60" >取号密码</td>
                <td class="color-333" align="right">{{listInfo.voucherNo}}</td>
            </tr>
            <tr>
                <td class="color-666">挂号科室</td>
                <td class="color-333" align="right">{{listInfo.deptName}}</td>
            </tr>
            <tr>
                <td class="color-666">挂号医生</td>
                <td class="color-333" align="right">{{listInfo.doctName}}</td>
            </tr> -->
            <tr v-for="(item,index) in listInfo" :key="index">
                <td class="color-666">{{item.key}}</td>
                <td class="color-333" align="right">{{item.value}}</td>
            </tr>
            <!-- <tr>
                <td class="color-666">上/下午</td>
                <td class="color-333" align="right">{{listInfo.ampmView}}</td>
            </tr>
            <tr>
                <td class="color-666">就诊序号</td>
                <td class="color-333" align="right">{{listInfo.xh}}号</td>
            </tr>
            <tr>
                <td class="color-666">就诊地址</td>
                <td class="color-333" align="right">{{listInfo.hzdd}}</td>
            </tr>
            <tr>
                <td class="color-666">挂号费</td>
                <td class="color-333" align="right">{{listInfo.zfzfbf}}</td>
            </tr>
            <tr>
                <td class="color-666">医保支付金额</td>
                <td class="color-333" align="right">{{listInfo.ybzhzfje}}</td>
            </tr> -->
        </table>
    </div>
</template>

<script>
export default {
     props: ['listInfo'],
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .appointResultInfo {
        td {
            @include cal(padding-top, 3px);
            @include cal(padding-bottom, 3px);
        }
    }
</style>


