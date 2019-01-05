<template>
    <header class="reportHeader">
        <div class="top">
            <h3>{{reportHeader.userInfo.reportName}}</h3>
            <div class="user_info">
                <label>{{reportHeader.userInfo.patientName}}</label>
                <span class="line">|</span>
                <span >{{reportHeader.userInfo.sexValue}}</span>
                <span >{{reportHeader.userInfo.age}}</span>
                <span class="line">|</span>
                <i>{{reportHeader.userInfo.assayDate}}</i>
            </div>
            <div class="ks_info">
                <span class="info">{{reportHeader.userInfo.deptName}}</span>
                <span class="line">|</span>
                <span class="info">{{reportHeader.userInfo.doctName}}</span>
            </div>
        </div>
        <div class="bottom">
            <label>病历号:</label><span>{{reportHeader.userInfo.medicalNo}}</span>
        </div>
    </header>
</template>

<script>
export default {
    data(){
        return{
           
        }
    },
    props:{
        reportHeader:{
            type:Object,
            default:function(){
                return{
                    userInfo:{
                        reportName:'检查名称',
                        patientName:'姓名',
                        sexValue:'性别',
                        age:'年龄',
                        assayDate:'日期',
                        deptName:'科室',
                        doctName:'医生名字',
                        medicalNo:'病历号'
                    }
                }
            }
        }
        
    },
    created(){
        
    },
    methods:{
       
    }
}
</script>

<style lang="scss" scoped>
    .reportHeader{
        background: #1F90F2;
        
        color: #FFFFFF;
        .top{
            padding:16px 10px 12px 15px;
            border-bottom:1px solid rgba(255, 255,255, 0.2);
            
        }
        h3{
            font-size: 20px;
            
        }
        .line{
            opacity: 0.25;
            margin:0 6px;
        }
        .user_info{
            font-size: 15px;
            margin: 8px 0;
            label{

            }
            
            i{
                font-style: normal;
                opacity: 0.7;
            }
            
        }
        .ks_info{
                font-size: 14px;
                color: #FFFFFF;
               .info{
                    opacity: 0.6;
               }
            }
            .bottom{
                padding:12px 14px;
                
                color: #FFFFFF;
                opacity: 0.6;
                label{
                    font-size: 14px;
                    display: inline-block;
                    width:20%;
                    vertical-align: top;
                }
                span{
                    font-size: 14px;
                   display: inline-block; 
                    width:80%;
                    word-wrap:break-word;
                }
            }
    }
</style>