<template>
    <section class="reportTable">
        <header>
            <span v-for="(item,index) in reportTable.title" :key="index">{{item}}</span>
        </header>
        <ul>
            <li v-for="(item,index) in reportTable.list" :key="index">
                <div class="span_list" v-for="(item2,index2) in item" :key="index2" >
                    <span>{{item2.name}}</span>
                    <span :class="{orange:item2.type=='L'||item2.type=='H'|| item2.type=='F' ||item2.type=='M'}"><i v-show="item2.type=='L'||item2.type=='H' || item2.type=='M' ||item2.type=='F'">{{item2.type=='H'?'↑':item2.type=="L"?'↓':item2.type=='F'?'+':item2.type=='M'?'-':''}}</i>{{item2.result}}</span>
                    <span >{{item2.default}}</span>
                </div>
                
            </li>
        </ul>
        <div class="tips" v-if="reportTable.tips">
            <span>注: {{reportTable.tips}}</span>
        </div>
    </section>
</template>

<script>
export default {
    data(){ 
        return{
           
        }
    },
    props:['reportTable'],
    created(){
        
    },
    methods:{
       
    }
}
</script>

<style lang="scss" scoped>
    .reportTable{
        .tips{
            padding-left: 14px;
            background: #fff;
            font-size: 14px;
            color: #999999;
            margin-bottom: 8px;
            span{
                display:block;
                padding:12px 0;
                border-top: 1px solid #E2E2E2;
            }
        }
        header{
            height: 40px;
            line-height: 40px;
            background: #FAFAFA;
            display:flex;
            display:-webkit-flex;
            padding-left:14px;
            span{
                flex-grow:1;
                word-break: break-all;
                font-size: 14px;
                color: #666666;
                flex-basis: 0%;
            }
            span:first-child{
                 flex-grow:1.5;
            }
        }
        ul{
            background: #FFFFFF;
            padding-left:14px;
           
            li{
                padding:12px 0px;
               
                .span_list{
                     display:flex;
                }
                span{
                    flex-grow:1;
                    word-break: break-all;
                    justify-content:flex-start;
                    flex-basis: 0%;
                    i{
                        font-style: normal;
                        margin-right: 2px;
                    }
                }
                span:first-child{
                    flex-grow:1.5;
                }
                .orange{
                    color: #FF4200;
                }
                
            }
            li:not(:last-child){
                border-bottom: 1px dashed #E2E2E2;
            }
            
        }
    }
</style>

