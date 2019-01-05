<template>
    <div class="doctorCard flex-align-justify  fontsize0">
        <div class="width100 flex-align-start paddingX15 padding15X">
            <table>
                <tr>
                    <td>
                        <div>
                            <span class="color-8f8f8f">科室介绍</span>
                            <div @click="collpseIntro" class="floatRight color-1c98fc">简介<i v-show="ifcollpse" class="icon-arrow up"></i><i v-show="!ifcollpse" class="icon-arrow down"></i></div>
                        </div>
                       
                    </td>
                </tr>
                <transition name="slide">
                    <tr v-show="!ifcollpse">
                        <td colspan="2">
                            <div class="margintop10 lineheight20 fontsize-2 color-8f8f8f"> {{ departmentDate }}</div>
                        </td>
                    </tr>
                </transition>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            ifcollpse: true,
        }
    },
    props: ['departmentDate'],
    components: {
        
    },
    mounted() {
        
    },
    methods: {
        setShow(){
            this.ifcollpse=false;
        },
        collpseIntro() {
            this.ifcollpse = !this.ifcollpse;
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .doctorCard {
        background-color: #fff;
        table {
            width: 100%;
        }
        .width60 {
            @include cal(width, 60px);
        }
        .doctorPhoto {
            @include cal(width, 60px);
            @include cal(height, 60px);
        }
        .icon-arrow {
            @include cal(width, 10px);
            @include cal(height, 6px);
            background: url('../assets/img/arrow_downup.png') no-repeat;
            background-size: 10px 13px;
            position: relative;
            bottom: 2px;
            margin-left: 5px;
        }
        .up {
            background-position: 0 -7px;
        }
        .down {
            background-position: 0 0;
        }
        .slide-enter,
        .slide-leave-to {
            opacity: 0;
        }
        .slide-enter-to,
        .slide-leave {
            opacity: 1;
        }
        .slide-enter-active {
            transition: opacity 0.3s ease;
        }
        .slide-leave-active {
            transition: none;
        }
    }
</style>


