<template>
    <section class="reportSection">
        <header>
            <i></i>
            <h4>{{repSecDate.title}}</h4>
        </header>
        <p>{{repSecDate.content}}</p>
    </section>
</template>

<script>
export default {
    data(){
        return{
           
        }
    },
    props:{
        repSecDate:{
            type:Object,
            default:function(){
                return{
                    title:'标题',
                    content:'内容' 
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
    .reportSection{
        background: #fff;
        padding:16px 14px;
        header{
            i{
                display: inline-block;
                width:3px;
                height: 16px;
                background: #0FA2E3;
                border-radius: 100px;
                vertical-align: middle;
                margin-top:-4px;
                margin-right: 8px;
            }
            h4{
                display: inline-block;
                font-size: 17px;
                color: #111111;
            }
        }
        p{
            font-size: 15px;
            color: #666666;
            line-height: 22px;
            margin-bottom: 0px;
            margin-top:8px;
        }
    }
</style>

