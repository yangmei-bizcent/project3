<template>
  <div class="payConfirm payNow">
    <mt-header fixed title="预约信息" v-show="iswxshow">
      <mt-button slot="left" @click="goToPrev" icon="back"></mt-button>
      <mt-button slot="right" @click="finishAppoint">
        <span class="color-1c98fc">关闭</span>
      </mt-button>
    </mt-header>
    <div class="docInfo" :class="{'margintop40':iswxshow}">
      <div class="diBg"><img src="../assets/img/payLogo.png"></div>
      <div class="docInfoContent">
        <div class="docName">
          <div class="docLogo"><img src="../assets/img/payLogo.png"></div>
          王励勤<span>医生</span>
        </div>
        <div class="registerInfo">
          <div class="registerInfoLi">
            <label>商品名称</label>
            <p>充值缴费</p>
          </div>
          <div class="registerInfoLi">
            <label>收款方</label>
            <p>浙江大学医学院附属妇产科医院</p>
          </div>
          <div class="registerInfoLi">
            <label>订单编号</label>
            <p>19328912732193</p>
          </div>
          <div class="registerInfoLi">
            <label>备注</label>
            <p>普通挂号费10元、院前急救费120元、层流洁净病房床位费3700元、ICU单元…</p>
          </div>
        </div>
        <div class="checkOrderInfo">查看预约须知<u></u></div>
        <div class="orderInfo">查看预约须知查看预约须知查看预约须知查看预约须知</div>
        <div class="dicBg"></div>
      </div>
      <div class="orderChange">
        <div class="orderChangeLi">
          <label>商品名称</label>
          <p>充值缴费</p>
        </div>
        <div class="orderChangeLi">
          <label>收款方</label>
          <p>浙江大学医学院附属妇产科医院</p>
        </div>
        <div class="orderChangeLi">
          <label>订单编号</label>
          <p>19328912732193</p>
        </div>
        <div class="orderChangeLi">
          <label>备注</label>
          <p>普通挂号费10元、院前急救费120元、层流洁净病房床位费3700元、ICU单元…</p>
        </div>
      </div>
    </div>
    <div class="payBtn">付款金额￥20<u>预约并支付</u></div>
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
      finishAppoint() {
        this.procInst.end(); // 流程结束
        Toast('预约完成');
        setTimeout(() => {
          WeixinJSBridge.call('closeWindow');
        }, 500)
        // this.$router.push({
        //     path: '/',
        //     query: {
        //         xBusinessId: !localStorage.getItem('xBusinessId') ? this.xBusinessId : localStorage.getItem('xBusinessId')
        //     }
        // })
      },
    },
  };

</script>

<style lang="scss">
  @import '@/assets/sass/pay.scss';

</style>
