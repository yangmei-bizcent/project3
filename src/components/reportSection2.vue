<template>
    <section class="reportSection2">
        <header>
            <i></i>
            <h4>{{repSecDate2.germName}}</h4>
        </header>
        <ul>
            <li>
                <label>结果: </label>
                <span>{{repSecDate2.resultDescription}}</span>
            </li>
        </ul>
        <p>{{repSecDate2.cultureResult}}</p>
    </section>
</template>

<script>
export default {
    data(){
        return{
           
        }
    },
    props:['repSecDate2'],
    created(){
        
    },
    methods:{
       
    }
}
</script>

<style lang="scss" scoped>
    .reportSection2{
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
            font-size: 14px;
            color: #666666;
            line-height: 22px;
            margin-bottom: 0px;
        }
        ul{
            margin-top:15px;
            li{
                label{
                    font-size: 14px;
                    color: #666666
                }
                span{
                    font-size: 20px;
                    color: #16B797;
                }
            }
        }
    }
</style>

