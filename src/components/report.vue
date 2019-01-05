<template>
    <section class="report" v-if="reportDate.length>0">
        <div v-show="!hospitalSelectPageShow">
            <div class="list">
                <mt-field label="报告单号" placeholder="请输入" v-model="ReportCard"></mt-field>
                <mt-field v-show="reportDate[2].componentValue!=0" label="姓名" placeholder="请输入" v-model="name"></mt-field>
                <mt-field  v-show="reportDate[3].componentValue!=0" label="就诊卡号" placeholder="请输入" v-model="jzCard"></mt-field>
                <mt-field  v-show="reportDate[4].componentValue!=0" label="医保卡号" placeholder="请输入" v-model="ybcard"></mt-field>
                <mt-field  v-show="reportDate[5].componentValue!=0" label="身份证号" placeholder="请输入" v-model="IDCard"></mt-field>
                <mt-field  v-show="reportDate[6].componentValue!=0" label="手机号" placeholder="请输入" v-model="phone"></mt-field>
            </div>
            <div class="cell-wrap" @click="showHospitalSelect" v-show="reportDate[7].componentValue!=0">
                <mt-cell 
                    title="选择院区" 
                    is-link 
                    placeholder="请选择" 
                    class="fontsize2 color-999"
                    :value="platformHospitalName">
                </mt-cell>
            </div>
            <div class="btn">
                <mt-button style="width:100%;" type="primary" size="normal" @click="getReportDetail()">查询</mt-button>
            </div>
        </div>

         <div v-show="hospitalSelectPageShow" class="page-container xzmzyq paddingTop36" >
            <mt-header fixed title="选择院区">
                <mt-button slot="left" @click="goback()" icon="back"></mt-button>
            </mt-header>
            <div class="page-content page-patientlist">
                <div v-if="hospitalsOptions.length>0">
                    <mt-radio
                        v-model="platformHospitalId"
                        :options="hospitalsOptions">
                    </mt-radio>
                    <div class="width100 fixed bottom0 left0 padding10X paddingX15 bgcolor-white">
                        <mt-button class="width100" type="primary" @click="confirmHospitalSelect">确定</mt-button>
                    </div>
                </div>
                <div v-else class="flex-align-justify-column paddingtop70">暂无数据</div>
            </div>
        </div>
        
    </section>
</template>

<script>
import axios from "axios"
import { mapGetters,mapActions } from 'vuex'
import { appointmentpost,appointmentget ,appointmentConfig} from '@/service/config.js'
import {  apiurl } from '@/service/api.js';
import { Indicator, Toast, MessageBox ,Button,Header, Field} from 'mint-ui'
export default {
    data(){
        return{
            ReportCard:"",
            name:'',
            jzCard:"",
            ybcard:'',
            IDCard:'',
            phone:"",
            hospitalSelectPageShow: false,  // 显示院区选择列表
            platformHospitalName:"",
            platformHospitalId:"",
            hospitalsOptions:[],//医院列表

        }
    },
    props:['reportDate'],
     computed: {
       ...mapGetters({ hospitalId: 'hospitalId',userinfo: 'userinfo',xBusinessId:'xBusinessId'})
    },
     components: {
       Field,
       Header, 
       Button,
    },
    mounted() {
        this.getHospitalsData();
    },
    methods: {
        ...mapActions(['set_bgditeminfo']),
        getReportDetail(){//报告单详情
            if( this.isValidate()){
                let data={
                        reportNo:this.ReportCard,
                        patientName:this.name,
                        medicalNo:this.ybcard,
                        branchId:this.platformHospitalId
                    }
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                axios.post(`${apiurl.getReportDetail}${this.xBusinessId}/${this.userinfo.scyUserId}/detail`,data,appointmentConfig).then((res)=>{
                    Indicator.close();
                    if(res.data){
                        this.set_bgditeminfo(res.data);
                        if(res.data.reportType=="INSPECT"){
                            this.$router.push({name:'checkList'})
                        }else if(res.data.reportType=="INSPECTPIC"){
                            this.$router.push({name:'inspectList'})
                        }else if(res.data.reportType=="CHEMICAL"){
                            this.$router.push({name:'microorganism'})
                        }else if(res.data.reportType=="IMAGE"){
                            this.$router.push({name:'imageList'})
                        }
                    }
                    // console.log('获取报告单',res)
                }).catch((err)=>{
                    Indicator.close();
                    console.log(err)
                })
            }
                
        },
         getHospitalsData() {//// 获取院区列表数据
            var self = this;
            appointmentpost(apiurl.GetHospitalList)
            .then(function (response) {
                if(response.status == 200) {
                    response.data.branchList.forEach((item, index)=> {
                        let hosItem = {
                            value: item.branchId,
                            label: item.branchName
                        };
                        self.hospitalsOptions.push(hosItem);
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        isValidate(){
            if(this.ReportCard==""){
                 Toast("请输入报告单号");
                return false;
            }
            if(this.reportDate[2].componentValue!=0){
                if(this.name==""){
                    Toast("请输入姓名");
                    return false;
                }
            }
            if(this.reportDate[3].componentValue!=0){
                if(this.jzCard==""){
                    Toast("请输入就诊卡号");
                    return false;
                }
            }
            if(this.reportDate[4].componentValue!=0){
                if(this.ybcard==""){
                    Toast("请输入医保卡号");
                    return false;
                }
            }
            if(this.reportDate[5].componentValue!=0){
               if(!this.validateIdCard()){
                   return false;
               }
            }
            if(this.reportDate[6].componentValue!=0){
               if( !this.validatePhone()){
                   return false;
               }
            }
             if(this.reportDate[7].componentValue!=0){
                if(this.platformHospitalName==""){
                    Toast("请选择院区");
                    return false;
                }
            }
            return true;
        },
        // 验证手机号
        validatePhone() {
            if(this.phone == '' || !/^1(3[0-9]{1}|4[57]{1}|5[0-9]{1}|8[0-9]{1}|7[0-9]{1}|9[0-9]{1})\d{8}$/.test(this.phone))
            {
                Toast("请输入正确的手机号");
                return false;
            }else{
                return true;
            }
        },
                // 验证身份证
        validateIdCard() { 
            var idCardNoUtil = {
                /*省,直辖市代码表*/
                provinceAndCitys: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
                31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
                45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
                65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

                /*每位加权因子*/
                powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],

                /*第18位校检码*/
                parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],

                /*性别*/
                genders: {male:"男",female:"女"},

                /*校验地址码*/
                checkAddressCode: function(addressCode){
                    var check = /^[1-9]\d{5}$/.test(addressCode);   
                    if(!check) return false;
                    if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
                        return true;
                    }else{
                        return false;
                    }
                },
                /*校验日期码*/
                checkBirthDayCode: function(birDayCode){
                    var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
                    if(!check) return false;
                    var yyyy = parseInt(birDayCode.substring(0,4),10);
                    var mm = parseInt(birDayCode.substring(4,6),10);
                    var dd = parseInt(birDayCode.substring(6),10);
                    var xdata = new Date(yyyy,mm-1,dd);
                    if(xdata > new Date()){
                        return false;//生日不能大于当前日期
                    }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
                        return true;
                    }else{
                        return false;
                    }
                },

                /*计算校检码*/
                getParityBit: function(idCardNo){
                    var id17 = idCardNo.substring(0,17);
                    /*加权 */
                    var power = 0;
                    for(var i=0;i<17;i++){
                    power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
                    }
                    /*取模*/
                    var mod = power % 11;
                    return idCardNoUtil.parityBit[mod];
                },

                /*验证校检码*/
                checkParityBit: function(idCardNo){
                    var parityBit = idCardNo.charAt(17).toUpperCase();
                    if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
                        return true;
                    }else{
                        return false;
                    }
                },
            };
            if(this.IDCard == '') {
                Toast('请输入正确的身份证号');
                this.validateFlag = false;
                return false;
            }else if(this.IDCard.length == 15){
                //校验身份证
                //校验地址码
                //校验日期码
                if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(this.IDCard) || !idCardNoUtil.checkAddressCode(this.IDCard.substring(0,6)) || !idCardNoUtil.checkBirthDayCode('19' + this.IDCard.substring(6,12))) {
                    Toast('请输入正确的身份证号');
                    return false;
                }else{
                     return true;
                }
               
            }else if(this.IDCard.length == 18){
                //校验身份证
                if(!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(this.IDCard) || !idCardNoUtil.checkAddressCode(this.IDCard.substring(0,6)) || !idCardNoUtil.checkBirthDayCode(this.IDCard.substring(6,14)) || !idCardNoUtil.checkParityBit(this.IDCard))  {
                    Toast('请输入正确的身份证号');
                    return false;
                }else{
                    return true;
                }
                
            }
            else {
                Toast('请输入正确的身份证号');
                return false;
            }
        },
        goback(){
            this.hospitalSelectPageShow=false;
            this.$emit("update:isShowYY",true)
        },
        confirmHospitalSelect(){//选择医院
            let self = this;
            self.hospitalsOptions.forEach((item, index)=> {
                if(item.value == self.platformHospitalId) {
                    self.platformHospitalName = item.label;
                    self.hospitalSelectPageShow = false;
                    this.$emit("update:isShowYY",true)
                }
            });
            
        },
        showHospitalSelect(){//显示院区
             this.hospitalSelectPageShow = true;
             this.$emit("update:isShowYY",false)
        }
    },
}
</script>


<style lang="scss" scoped>
   .report{
       .paddingTop36{
           padding-top:36px;
       }
       .li{
           background: #fff;
       }
       .mint-cell-value.is-link{
           width:60%;
       }
       .cell-wrap{
           margin-top:8px;
       }
   }
   
</style>
