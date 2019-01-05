<template>
    <section class="patientsList">
        <ul class="patients_ul" v-if="patientsList.length>0">
            <li class="patients_list" v-for="(item,index) in patientsList" :key="index">
                <div class="top">
                    <label>{{item.patientName}}</label>
                    <i>/</i>
                    <span>{{item.genderValue}}</span>
                    <span>{{item.age}}岁</span>
                </div>
                <div class="bottom">
                    <ul class="left">
                        <li>
                            <label>身份证</label>
                            <span>{{item.idCard.substring(0, item.idCard.length-4)+'****'}}</span>
                        </li>
                        <li>
                            <label v-show="item.cardNumber">医保卡</label>
                            <span>{{item.cardNumber}}</span>
                        </li>
                         <li v-show="item.branchId">
                            <label>院区</label>
                            <span>{{item.branchId}}</span>
                        </li>
                    </ul>
                    <div class="right" @click="queryBtn(item)">
                        <span>查询</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="noDate" v-else>
            暂无就诊人
        </div>
    </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
export default {
    data(){
        return{
            
        }
    },
    props:['patientsList'],
     computed: {
       
    },
     components: {
       
    },
    mounted() {
        
    },
    methods: {
        ...mapActions(['set_jzrinfo']),
        queryBtn(item){
            this.set_jzrinfo(item);
            this.$router.push({name:'reportList'})
        },
    },
}
</script>

<style lang="scss" scoped>
    .patientsList{
        .noDate{
            text-align: center;
            color: #ccc;
        margin-top:20px;
        }
        .patients_ul{
            .patients_list:nth-child(odd){
                border-left: 4px solid #1C97FC;
            }
            .patients_list:nth-child(even){
                border-left: 4px solid #16B797;
            }
           
            .patients_list{
                background: #fff;
                padding:16px 14px 16px 18px;
                margin-top: 12px;
                .top{
                    color: #333333;
                    margin-bottom: 16px;
                    label{
                        font-size: 18px;
                    }
                    span{
                        font-size: 15px;
                    }
                    i{
                        font-style: normal;
                    }
                }
                .bottom{
                    overflow: hidden;
                   
                    .left{
                        float: left;
                        width:80%;
                        li{
                            margin-bottom:6px;
                            font-size: 16px;
                            color: #666666;
                            overflow: hidden;
                            label{
                                float: left;
                                width:30%;
                            }
                            span{
                                float: right;
                                width:70%;
                                word-wrap: break-word;
                            }
                        }
                        
                    }
                    .right{
                        float: right;
                        width:20%;
                        text-align: right;
                        span{
                            display: inline-block;
                            padding:4px 10px;
                            border:1px solid #1C97FC;
                            font-size: 14px;
                            color: #1C97FC;
                            border-radius: 4px;
                        }
                    }
                }
            }
            
        }
    }
</style>

