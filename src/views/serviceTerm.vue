<template>
    <div class="page-container page-serviceterm bgcolor-white paddingX15">
        <mt-header fixed title="服务条款">
            <router-link to="/bindPhone" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-content margintop45">
            <div class="fontsize6 color-333 bold padding20X">浙一互联网医院服务条款</div>
            <div>
                <dl>
                    <dt class="fontsize2 color-333 bold">一、就诊规则</dt>
                    <dd class="fontsize2 color-666">
                        <ul>
                            <li>1、浙一互联网医院网络诊间的类型分为专家门诊和专科门诊。</li>
                            <li>2、网络诊间就诊服务时间为：5月-9月上午8点-12点 下午14点-17点30分；10月-4月上午8点-12点下午13点30分-17点。专科门诊每周7天无休。</li>
                            <li>3、专家门诊可提前7天预约；预约成功后，在预约日期前一天16点之前可以取消预约；问诊前请提前完成支付，上午号在就诊当日9点前支付，下午号请在就诊当日11点前支付；若存在医生停诊等事项时，您可以拨打客服热线0571-87231515进行退款申请。</li>
                            <li>4、专科门诊为当天实时挂号；支付成功后，不支持退款，请您在当天门诊时间内及时完成在线就诊。</li>
                        </ul>
                    </dd>
                    <dt class="fontsize2 color-333 bold">二、操作流程</dt>
                    <dd class="fontsize2 color-666">
                        <ul>
                            <li>1、首先请确保您是掌上浙一或浙一官网注册用户， 如不是请先注册。</li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .page-serviceterm {
        height: 100vh;
        dt {
            @include cal(margin-bottom, 8px);
        }
        dd {
            margin-left: 0;
            @include cal(margin-bottom, 16px);
        }
    }
</style>


