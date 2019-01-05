<template>
  <div class="dynamicIndex">
    <div class="funcList" v-for="l in dynamicInfoList.list">
      <div v-if="l.type=='S1'" class="dyGroups dyGroups-S1">
        <ul>
          <li @click="openDynamic(l.funcUrl)">
            <img :src="l.funcPic" />
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S2'" class="dyGroups dyGroups-S2">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)">
            <img :src="dItem.funcPic" />
            <p>{{dItem.funcName}}</p>
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S3'" class="dyGroups dyGroups-S3">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)" :class="{'dyGroups-S3-full': dIndex == 0, 'dyGroups-S3-half': dIndex !=0}">
            <img :src="dItem.funcPic" />
            <p v-if="dIndex!= 0">{{dItem.funcName}}</p>
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S4'" class="dyGroups dyGroups-S4">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)" :class="{'content-S4-left': dIndex == 0,'content-S4-top': dIndex == 1,'content-S4-bottom': dIndex == 2}">
            <img :src="dItem.funcPic" />
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S5'" class="dyGroups dyGroups-S5">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)" :class="{'content-S5-left': dIndex == 0  ,'content-S5-right': dIndex != 0}">
            <img :src="dItem.funcPic" />
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S6'" class="dyGroups dyGroups-S6">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)" :class="{'content-S6-left': dIndex == 0  ,'content-S6-right': dIndex != 0}">
            <img :src="dItem.funcPic" />
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S7'" class="dyGroups dyGroups-S7">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)">
            <img :src="dItem.funcPic" />
            <p>{{dItem.funcName}}</p>
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S8'" class="dyGroups dyGroups-S8">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)">
            <img :src="dItem.funcPic" />
            <p>{{dItem.funcName}}</p>
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S9'" class="dyGroups dyGroups-S9">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)" :class="{'dyGroups-S9-full': dIndex == 0, 'dyGroups-S9-half': dIndex !=0}">
            <p>{{dItem.funcName}}</p>
            <span>{{dItem.funcName}}</span>
            <span v-if="dIndex==0">{{dItem.description}}</span>
            <img :src="dItem.funcPic" />
          </li>
        </ul>
      </div>
      <div v-if="l.type=='S10'" class="dyGroups dyGroups-S10">
        <ul>
          <li v-for="(dItem, dIndex) in l.detail_list" @click="openDynamic(dItem.funcUrl)">
            <img :src="dItem.funcPic" />
          </li>
        </ul>
      </div>
    </div>
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
        selectDept: 'selectDept'
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
      ...mapActions(['set_hospitalId']),
      openDynamic(url) {
        console.log(url);
        let vm=this;
        if (url) {
            // window.location.href = url;
            window.open(url)
            vm.$router.go(0);               
        } else {
          Toast({
            message: '该链接为无效链接，请检查',
            duration: 1000
          });
        }
      }
    },
  };

</script>

<style lang="scss">
  @import '@/assets/sass/dynamic.scss';

</style>
