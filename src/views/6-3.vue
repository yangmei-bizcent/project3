<template>
    <section class="DiagnosticResults">
        <header class="clearfix">
            <span>医生诊断结果已出</span>
            <img src="../assets/img/DiagnosticResults_img.png" >
        </header>
        <ul>
            <li>
                <div class="title"><i></i><span>医嘱</span></div>
                <p class="content">脊柱侧弯处肌肉会一高一低，需要做特定的体操来锻炼肌肉，体操有飞燕等。还有吊单杠这是最安全的，其他的容易在力度上掌握不好，发生肌肉拉伤，这个可以到医院拉牵引。</p>
            </li>
            <li>
                <div class="title"><i></i><span>诊断结果</span></div>
                <p class="content">中度脊柱侧弯</p>
            </li>
        </ul>

    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.DiagnosticResults{
    header{
        width:100%;
        height: 110px;
        padding: 6px 26px;
        background-image: linear-gradient(-270deg, #61B8FF 0%, #5488FB 100%);
        line-height: 110px;
        span{float: left;color: #fff;font-size: 18px;}
        img{float: right;width:108px;height: 99px;margin-right: 9px;}
    }
    ul{
        li{
            background: #fff;
            margin-bottom: 8px;
            padding: 16px 14px;
            .title{
                text-align: left;
                i{
                    display: inline-block;
                    width:3px;
                    height: 15px;
                    background: #1C97FC;
                    border-radius: 100px;
                     margin-right: 8px;
                }
                span{
                    display: inline-block;
                    font-size: 17px;
                    color: #111111;
                    font-weight: bold;
                }
            }
            .content{
                font-size: 15px;
                color: #666666;
                letter-spacing: 0.2px;
            }
        }
    }
}
</style>
