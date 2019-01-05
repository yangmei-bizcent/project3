<template>
  <div class="payConfirm">
    <mt-header fixed title="订单明细" v-show="iswxshow">
      <mt-button slot="left" @click="goToPrev" icon="back"></mt-button>
    </mt-header>
    <div class="payContent" :class="{'margintop40':iswxshow}">
      <div class="payLogo"><img src="../assets/img/payLogo.png"></div>
      <p><span>￥</span>120</p>
      <div class="payInfo">
        <div class="payInfoLi">
          <label>商品名称</label>
          <p>充值缴费</p>
        </div>
        <div class="payInfoLi">
          <label>收款方</label>
          <p>浙江大学医学院附属妇产科医院</p>
        </div>
        <div class="payInfoLi">
          <label>订单编号</label>
          <p>19328912732193</p>
        </div>
        <div class="payInfoLi">
          <label>备注</label>
          <p>普通挂号费10元、院前急救费120元、层流洁净病房床位费3700元、ICU单元…</p>
        </div>
      </div>
    </div>
    <div class="payBtn">去支付</div>
  </div>
</template>

<script>
  import NoData from '../components/noData'
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import {
    mapGetters,
    mapActions,
    mapState
  } from 'vuex'
  import {
    appointmentget
  } from '@/service/config.js'
  import {
    apiurl
  } from '@/service/api.js';
  export default {
    computed: {
      ...mapState({
        dynamicInfoList: state => state.dynamic.dynamicList
      }),
      ...mapGetters({
        selectDept: 'selectDept',
        xBusinessId: 'xBusinessId',
        userinfodata: 'userinfodata',
        iswxshow: 'iswxshow'
      }),
    },
    data() {
      return {};
    },
    components: {
      Indicator
    },
    created() {
      this.platformHospitalId = this.$route.query.platformHospitalId;
    },
    async mounted() {
      await this.$store.dispatch({
        type: 'dynamicFuncList',
        phId: this.platformHospitalId,
        styleType: '08',
        clientMobileType: '3'
      })
    },
    methods: {
      goToPrev() {
        this.procInst.preState((state) => {
          this.$router.push({
            path: '/' + state['@id'].substring(2)
          })
        })
      },
    },
  };

</script>

<style lang="scss">
  @import '@/assets/sass/pay.scss';

</style>
