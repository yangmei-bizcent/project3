<template>
    <section>
        <div class="selectList">
            <div class="dialg" @click="cancelFun" v-show="ListShow"></div>
            <div class="content">
                <header @click="Onclick">
                    <span>筛选就诊人</span>
                    <i></i>
                </header>
                <ul class="list" v-show="ListShow">
                    <li v-for="(item,index) in userList" :key="index" @click="ONselect(index,item.pvPatientVisitId)"><span>{{item.patientName}}</span><i v-show="selectIndex==index"></i></li>
                </ul>
            </div>
        </div>
        
    </section>
</template>

<script>
export default {
    data(){
        return{
            ListShow:false,
            selectIndex:0,
        }
    },
    props:['userList'],
    methods:{
        Onclick(){
            this.ListShow=!this.ListShow;
        },
        ONselect(index,id){
            if(index!=this.selectIndex){
                this.selectIndex=index;
                this.$emit("getJZJYlist",id);
            }
            this.ListShow=false;
            
        },
        cancelFun(){
            this.ListShow=false;
        }
    }
}
</script>

<style lang="scss"  scoped>
    .selectList{
        position: absolute;
        left:0;
        top:0;
        z-index: 9999;
        width:100%;
        .content{
            position: absolute;
            width:100%;
            z-index: 2;
        }
        .dialg{
            position: fixed;
            width:100%;
            height: 100%;
            background: rgba(0,0,0,0.50);
            z-index: 1;
        }
        header{
            background: #FFF0E6;
            height: 38px;
            width:100%;
            text-align: center;
            line-height: 38px;
            font-size: 14px;
            color: #FF7B35;
            span,i{display: inline-block;}
            i{
                width:0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid #FF8646; 
                margin-left: 5px;
            }
        }
        .list{
            width: 100%;
            max-height: 200px;
            overflow-y:auto;
            background: #fff;
            padding-left: 14px;
             -webkit-overflow-scrolling: touch;
            li{
                position: relative;
                width:100%;
                height: 49px;
                font-size: 16px;
                color: #333333;
                line-height: 49px;
                span{display: inline-block;}
                span{
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    height: 100%;
                }
                i{
                    position: absolute;
                    right: 30px;
                    top:25px;
                  display: inline-block; width: 10px;height:2px; background: #FF7B35;;;line-height: 0;font-size:0;vertical-align: middle;-webkit-transform: rotate(45deg);
                }
                i:after{content:'/';display:block;width: 20px;height:2px; background: #FF7B35;;;-webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);}
            }
            li:not(:last-child){
                border-bottom: 1px solid #E2E2E2;
            }
        }
    }
</style>

