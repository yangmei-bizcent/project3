<template>
        <div class="dlgCompt mint-msgbox-wrapper" style="position: absolute; z-index: 2003;">
            <div class="mint-msgbox" style="">
                <div class="mint-msgbox-header">
                    <div class="mint-msgbox-title">提示</div>
                </div> 
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-message">操作成功!</div> 
                    <div class="mint-msgbox-input" style="display: none;">
                        <input placeholder="" type="text"> 
                        <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel" style="display: none;">取消</button> 
                    <button class="mint-msgbox-btn mint-msgbox-confirm ">确定</button>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .dlgCompt {
        .v-modal {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: .5;
            background: #000;
        }
        .mint-msgbox {
            position: fixed;
            top: 50%;
            left: 50%;
            -webkit-transform: translate3d(-50%,-50%,0);
            transform: translate3d(-50%,-50%,0);
            background-color: #fff;
            width: 85%;
            border-radius: 3px;
            font-size: 16px;
            -webkit-user-select: none;
            overflow: hidden;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-transition: .2s;
            transition: .2s;
        }
        .mint-msgbox-header {
            padding: 15px 0 0;
        }
        .mint-msgbox-title {
            text-align: center;
            padding-left: 0;
            margin-bottom: 0;
            font-size: 16px;
            font-weight: 700;
            color: #333;
        }
        .mint-msgbox-content {
            padding: 10px 20px 15px;
            border-bottom: 1px solid #ddd;
            min-height: 36px;
            position: relative;
        }
        .mint-msgbox-message {
            color: #999;
            margin: 0;
            text-align: center;
            line-height: 36px;
        }
        .mint-msgbox-input {
            padding-top: 15px;
        }
        .mint-msgbox-input input {
            border: 1px solid #dedede;
            border-radius: 5px;
            padding: 4px 5px;
            width: 100%;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
        }
        .mint-msgbox-btns {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 40px;
            line-height: 40px;
        }
        .mint-msgbox-cancel {
            width: 50%;
            border-right: 1px solid #ddd;
        }
        .mint-msgbox-btn {
            line-height: 35px;
            display: block;
            background-color: #fff;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin: 0;
            border: 0;
        }
        .mint-msgbox-confirm {
            color: #26a2ff;
            width: 50%;
        }

    }
</style>


