<template>
	<div class="securityCode">
		<div class="box">
			<h5>请输入图形验证码</h5>
			<i class="close" @click="OnClose"></i>
			<div class="yzmtu" @click="OnRefresh">
				<img :src="imgUrl"/>
                <!-- <img src="../assets/img/appointtype1.png"/> -->
				<i></i>
			</div>
			<label :for="`code-${uuid}`">
				<ul class="block-container yzmlist">
                    <li v-for="(item, index) in codeLength" :key="index">
                        <i>{{inputImgCode.substring(index, index+1) || '-'}}</i>
                    </li>
			    </ul>
			</label>
		</div>
		<input 
            type="tel"
            ref="input" 
            class="input-code" 
            @keyup="handleInput($event)" 
		 	v-model="inputImgCode" 
            :id="`code-${uuid}`" 
            :name="`code-${uuid}`" 
		 	:maxlength="codeLength" 
            autofocus="autofocus"
            autocorrect="off" 
            autocomplete="off" 
            autocapitalize="off">
	</div>
</template>

<script>
export default {
    data() {
        return {
            inputImgCode: '',
            codeLength: 4,
        }
    },
    name:'securityCode',
    props: ['imgUrl'],
    computed: {
        uuid () {
            return Math.random().toString(36).substring(3, 8);
        }
    },
    mounted() {
        this.inputImgCode = '';
        this.getFocus();
    },
    methods: {
        getFocus(){
            this.$refs['input'].focus();
        },
        OnClose(){
            this.inputImgCode="";
            this.$emit('FunClose');
        },
        OnRefresh(){
            this.inputImgCode="";
            this.$refs.input.focus();
            this.$emit('FunRefresh');
        },
        hideKeyboard () {
            document.activeElement.blur(); 
            this.$refs.input.blur();
        },
        handleSubmit () {
            this.$emit('input', { inputImgCode: this.inputImgCode });
        },
        handleInput (e) {
            let vm=this;
            if (e.target.value.length == vm.codeLength) {
                setTimeout(function() {
                    vm.hideKeyboard();
                    vm.handleSubmit();
                },1000) 
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    /*验证码*/
    .securityCode{
        width:100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#99000000', endColorstr='#99000000');background:rgba(0,0,0,0.6);
        z-index: 99;
        .box{
            position: absolute;
            left:50%;
            top: 50%;
            @include cal(margin-left, -145px);
            @include cal(margin-top, -180px);
            @include cal(width, 290px);
            @include cal(height, 264px);
            background: #fff;
            z-index: 1;
            border-radius: 8px;
            overflow: hidden;
            text-align: center;
            h5{
                width:100%;
                @include cal(height, 64px);
                @include cal(line-height, 64px);
                @include font-dpr(16px);
                color: #333333;
                font-family: PingFangSC-Medium;
            }
            .close{
                position: absolute;
                right: 12px;
                top:12px;
                width:20px;
                height: 20px;
                z-index: 2;
                background: url("../assets/img/yzmcloseicon.png") center center no-repeat;
                background-size: 14px 14px;
            }
            .yzmtu{
                @include cal(width, 248px);
                @include cal(height, 58px);
                margin: auto;
                @include cal(margin-top, 16px);
                @include cal(margin-bottom, 24px);
                background: #F6F6F6;
                img{
                    float: left;
                    @include cal(width, 189px);
                    height: 100%;
                }
                img[src='']{
                    visibility: hidden;
                }
                i{
                    float: left;
                    @include cal(width, 58px);
                    height: 100%;
                    background: url('../assets/img/yzmshuax_icon.png') center center no-repeat;
                    background-size: 26px 26px;
                }
            }
            .yzmlist{
                padding: 0;
                @include cal(padding-left, 20px);
                @include cal(padding-right, 20px);
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                
                overflow: hidden;
                li{
                    float: left;
                    @include cal(width, 56px);
                    @include cal(height, 56px);
                    @include cal(line-height, 56px);
                    background: #F6F6F6;
                    border: 1px solid #E2E2E2;
                    border-radius: 4px;
                    @include font-dpr(25px);
                }
                li:not(:last-child){
                    @include cal(margin-right, 5px);
                }
            }
        }
        .input-code {
            position: absolute;
            left: -9999px;
            top: -9999px;
        }
    }
</style>