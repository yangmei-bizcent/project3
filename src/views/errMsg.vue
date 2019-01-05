<template>
    <section class="errMsg">
        <h3>ERROR！</h3>
        <p>Tips:{{errMsg}}</p>
    </section>
</template>

<script>
export default {
    data(){
        return{
           errMsg:""
        }
    },
    created(){
        let msg=new this.UrlSearch(); //实例化
       this.errMsg= decodeURIComponent(msg.errMsg);
    },
    methods:{
       UrlSearch() {
            let name, value;
            let str = location.href; //取得整个地址栏
            let num = str.indexOf("?")
            str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
            let arr = str.split("&"); //各个参数放到数组里
            for(let i = 0; i < arr.length; i++) {
                num = arr[i].indexOf("=");
                if(num > 0) {
                    name = arr[i].substring(0, num);
                    value = arr[i].substr(num + 1);
                    this[name] = value;
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .errMsg{
        padding:20px;
        color:red;
        h3{ 
            font-size: 16px;
        }
        p{
            margin:5px 0 0 0;
            padding-left:20px;
            font-size: 14px;
        }
    }
</style>

