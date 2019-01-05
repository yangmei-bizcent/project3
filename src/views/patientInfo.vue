<template>
  <div class="page-container patient-info">
    <mt-header fixed title="就诊人信息" v-show="iswxshow">
      <mt-button slot="left" @click="$router.go(-1)" icon="back"></mt-button>
    </mt-header>

    <div class="page-content patient-content" :class="{'marginTop50':iswxshow}">
      <mt-cell title="个人信息">
      </mt-cell>
      <div class="personal-info-wrapper">
        <div class="personal-info">
          <p v-show="personalInfo.patientName">
            <span class="title">姓名</span>
            <span>{{personalInfo.patientName}}</span>
          </p>
          <p>
            <span class="title">{{cardValue}}</span>
            <span>{{personalInfo.idCard}}</span>
          </p>
          <p v-show="personalInfo.nationValue">
            <span class="title">民族</span>
            <span>{{personalInfo.nationValue}}</span>
          </p>
          <p v-show="personalInfo.phoneNumber">
            <span class="title">手机号</span>
            <span>{{personalInfo.phoneNumber}}</span>
          </p>
          <!-- <p>
            <span class="title">详细地址</span>
            <span>{{personalInfo.address}}</span>
          </p> -->
        </div>
      </div>

      <div class="hospital-area" v-show="personalInfo.healthCardNumber">
        <p>
          <span class="title">医保卡</span>
          <span>{{personalInfo.healthCardNumber}}</span>
        </p>
        <!-- <p>
          <span class="title">院区</span>
          <span>{{personalInfo.platformHospitalName}}</span>
        </p> -->
      </div>

      <mt-cell v-if="personalInfo.isDefault !=0?true : false" class="default-patient" title="设为默认就诊人">
        <mt-switch v-model="personalInfo.defaultPatient" @change="setDefault(personalInfo)"></mt-switch>
      </mt-cell>

      <div class="delete">
        <mt-button plain type="danger" :disabled="deleteIsDisabled?true:false" size="large" @click.native="deletePatient">删除</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
import { Header,utton, Indicator, Toast } from 'mint-ui'
import { appointmentget, appointmentpost, appointmentdelete, appointmentConfig } from '@/service/config.js'
import axios from "axios"
import { apiurl } from '@/service/api.js';
export default {
  data() {
    return {
      personalInfo: {},
      currTime: '',
      createdTime: '',
      deleteIsDisabled: true,
      validNum:'hiddenValidNum',
      cardValue:""
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      userinfo: 'userinfo',xBusinessId:'xBusinessId',iswxshow:'iswxshow'
    })
  },
  mounted() {
    this.getPatientInfo();
  },
  methods: {
    goToPrev() {
      this.$router.push({
        path: "/4-1-1"
      });
    },
    getPageConfig() {
      axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId="+this.$route.query.ucUiFlowId+"&stepId=bindPatientVisit",appointmentConfig).then((res)=>{
      //  axios.get(apiurl.getViewUiconfigList+"?ucUiFlowId=fcd00a9f-451d-4662-8205-b050ddc994ff&stepId=bindPatientVisit",appointmentConfig).then((res)=>{
        if(res.data){
          // console.log('就诊人详情配置项',res.data);
          let deleteBtnConfig = res.data.filter((item) => {
            return item.ucUiConfigId == 'c26f3f06-b6e4-11e6-bca2-0050569b08a8'
          });
          let timeValue = JSON.parse(deleteBtnConfig[0].componentDesc).value;
          let unit = JSON.parse(deleteBtnConfig[0].componentDesc).unit;
          let judgeTime = this.dateAdd(new Date(this.createdTime).getTime(), timeValue, unit);
          console.log(judgeTime, new Date(this.currTime).getTime());
          if(judgeTime > new Date(this.currTime).getTime()) {
            console.log('禁用');
            this.deleteIsDisabled = true;
          }else {
            console.log('可用');
            this.deleteIsDisabled = false;
          }
        }
      });
    },
    dateAdd(startTime, addTimeVal, addTimeUnit) {
      switch(addTimeUnit) {
        case 'hh':
            startTime = startTime + 1000*60*60*parseInt(addTimeVal);
            break;
        case 'dd':
            startTime = startTime + 1000*60*60*24*parseInt(addTimeVal);
            break;
        case 'MM':
            startTime = startTime + 1000*60*60*24*30*parseInt(addTimeVal);
            break;
      }
      return startTime;
    },
    deletePatient() {
      let query = this.$route.query;
      MessageBox.confirm('确定删除?', '').then(action => {
        appointmentdelete(apiurl.DeletePatient + "?patientVisitId="+query.pvPatientVisitId).then(() =>{
        Toast('删除成功');
        this.$router.push('/4-1-1')
        })
        
      });
    },
    getPatientInfo() {
      var self = this;
      let query = this.$route.query;
      Indicator.open({
        text: '就诊人信息加载中...',
        spinnerType: 'fading-circle'
      });
      appointmentget(apiurl.GetPatientInfo + '?pvPatientVisitId=' + query.pvPatientVisitId+'&validNum='+this.validNum)
      // appointmentget(apiurl.GetPatientInfo + '?pvPatientVisitId=fd80e00c-75c8-4a70-af4c-3470fb4b9c64')
      .then(function (response) {
          Indicator.close();
          if(response.status == 200) {
              self.personalInfo = response.data;
              if(response.data.idCardType==1){
                if(response.data.isGuardian==0){
                  self.cardValue="身份证-本人";
                }else{
                  self.cardValue="身份证-监护人";
                }
              }else if(response.data.idCardType==2){
                  self.cardValue="军官证";
              }else if(response.data.idCardType==3){
                  self.cardValue="护照";
              }else if(response.data.idCardType==4){
                  self.cardValue="华侨卡";
              }
              // console.log('就诊人信息数据：', self.personalInfo);
              self.currTime = self.personalInfo.currentTime;
              self.createdTime = self.personalInfo.createdon;
              self.getPageConfig();
          }
      })
      .catch(function (error) {
          Indicator.close();
          console.log(error);
      });
    },
    setDefault(personalInfo){
      console.log('set default')
      Indicator.open({
        text: '就诊人设置加载中...',
        spinnerType: 'fading-circle'
      });
      let flowid =  this.xBusinessId ;
      // let flowid = 'e49f5778-12b5-11e7-aceb-507b9d24b9d1';
      let patientBindInfo = {
        patientName: personalInfo.patientName,
        idCard: personalInfo.idCard,
        phoneNumber: personalInfo.phoneNumber,
        healthCardNumber: personalInfo.healthCardNumber,
        pvPatientVisitId: personalInfo.pvPatientVisitId,
        isDefault: '0',
        scyUserId: this.userinfo.scyUserId,
      }
      appointmentpost(apiurl.updatePatientInfo + '?ucUiFlowId=' + flowid+"&editType=bind", patientBindInfo).then((response)=>{
        console.log(response.data)
        this.$router.push('/4-1-1')
      })

    },
  },
};
</script>

<style lang='scss' scoped>
.marginTop50{
  margin-top:50px;
}

.personal-info-wrapper {
  padding: 0 10px 16px 10px;
  background-color: #ffffff;
}

.personal-info {
  border-top: 1px solid #e2e2e2;
}

.personal-info,
.hospital-area {
  p {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    letter-spacing: 0.2px;
    span.title {
      color: #666666;
    }
  }
}

.hospital-area {
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 12px;
  height: 43px;
  padding: 0 10px;
  background-color: #ffffff;
  p {
    margin: 0;
    line-height: 43px;
  }
}

.delete {
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
}
</style>
<style lang="scss">
.patient-info {
  .personal-info {
    .mint-cell-text {
      font-family: PingFang-SC-Bold;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0.2px;
    }
  }

  .default-patient {
    .mint-cell-text {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #666666;
      letter-spacing: 0.2px;
    }
  }

  .delete {
    .mint-button--danger {
      width: 335px;
      height: 46px;
    }
  }
}

.mint-msgbox {
  border-radius: 8px;
  .mint-msgbox-message {
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    color: #333333;
  }
}
</style>
