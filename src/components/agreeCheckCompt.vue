<template>
    <div class="agreeCheckBox fontsize-2" @click="switchCheck">
        <span class="mint-checkbox">
            <input class="mint-checkbox-input displayNone" :checked="isChecked" type="checkbox"> 
            <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label">
            我同意<span class="color-1c98fc" @click="toAgree">《用户服务协议》</span>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['isChecked'],
    methods: {
        switchCheck() {
            this.$emit('switchCheck');
        },
        toAgree() {
            this.$emit('toAgreePage');
        },
    },
}
</script>

<style lang="scss">
    .agreeCheckBox {
        .mint-checkbox-input:checked + .mint-checkbox-core {
            background-color: #26a2ff;
            border-color: #26a2ff;
        }
        .mint-checkbox-core {
            display: inline-block;
            background-color: #fff;
            border-radius: 100%;
            border: 1px solid #ccc;
            position: relative;
            width: 15px;
            height: 15px;
            vertical-align: middle;
        }
        .mint-checkbox-input:checked + .mint-checkbox-core::after {
            border-color: #fff;
            -webkit-transform: rotate(45deg) scale(1);
            transform: rotate(45deg) scale(1);
        }
        .mint-checkbox-core::after {
            border: 1px solid transparent;
            border-left: 0;
            border-top: 0;
            content: " ";
            top: 2px;
            left: 5px;
            position: absolute;
            width: 3px;
            height: 6px;
            -webkit-transform: rotate(45deg) scale(0);
            transform: rotate(45deg) scale(0);
            -webkit-transition: -webkit-transform .2s;
            transition: -webkit-transform .2s;
            transition: transform .2s;
            transition: transform .2s,-webkit-transform .2s;
        }
    }
</style>


