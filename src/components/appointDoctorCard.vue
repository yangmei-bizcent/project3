<template>
    <div class="appointDoctorCard margin15X fontsize0">
        <div class="topLine borderRadius5"></div>
        <div class="card-container bgcolor-white marginX15 paddingX10 paddingbottom5">
            <div class="flex-align flex-align-start padding15X">
                <div class="photo-conainer flex-align">
                    <img :src="appointInfo.doctorPhoto" alt="doctorPhoto" style="display:inline-block;width:100%;heigth:100%;">
                </div>
                <div class="marginleft15 color-333">
                    {{ appointInfo.doctName }}
                    <span class="fontsize-2 color-8f8f8f">医生</span>
                </div>
            </div>
            <div class="dash-line"></div>
            <div class="fontsize-2 padding10X">
                <table>
                    <tr>
                        <td class="color-8f8f8f minwidth60">就诊科室</td>
                        <td class="color-3d3d3d">{{ appointInfo.deptName }}</td>
                    </tr>
                    <tr>
                        <td class="color-8f8f8f">门诊类型</td>
                        <td class="color-3d3d3d">{{ appointInfo.visitType }}</td>
                    </tr>
                    <tr>
                        <td class="color-8f8f8f">就诊时间</td>
                        <td class="color-1c98fc">{{ appointInfo.visitTime }}</td>
                    </tr>
                    <tr>
                        <td class="color-8f8f8f">挂号费用</td>
                        <td class="color-ffae36">&yen;&nbsp;{{ appointInfo.outpatientFee }}</td>
                    </tr>
                </table>
            </div>
            <div class="dash-line"></div>
            <div @click="collpseIntro" class="flex-align-spacebetween fontsize-2 padding10X color-8f8f8f">
                查看预约须知
                <i v-if="ifcollpse" class="icon-arrow up"></i>
                <i v-if="!ifcollpse" class="icon-arrow down"></i>
            </div>
        </div>
        <div class="dotted-line relative"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ifcollpse: true,
        }
    },
    props: ['appointInfo'],
    methods: {
        collpseIntro() {
            this.ifcollpse = !this.ifcollpse;
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/sass/base_common.scss';
    .appointDoctorCard {
        .photo-conainer {
            @include cal(width, 35px);
            @include cal(height, 52px);
            border: 1px solid #f0f0f0;
            border-radius: 2px;
            overflow: hidden;
        }
        .minwidth60 {
            @include cal(min-width, 60px);
        }
        .topLine {
            @include cal(height, 10px);
            @include cal(margin-left, 8px);
            @include cal(margin-right, 8px);
            background: linear-gradient(#969696, #d1d1d1); /* 标准的语法 */
        }
        .card-container {
            @include cal(margin-top, -5px);
            box-shadow: 0 0 4px rgba(0,0,0,0.1);
        }
        .dotted-line {
            height: 0;
            border-top: 6px dotted #f0f3f5;
            top: -3px;
        }
        .dash-line {
            width: 100%;
            height: 0;
            border-top: 1px dashed #ececec;
            transform: scaleZ(0.5);
        }
        .icon-arrow {
            @include cal(width, 10px);
            @include cal(height, 6px);
            background: url('../assets/img/arrow_downup.png') no-repeat;
            background-size: 10px 13px;
            margin-left: 5px;
        }
        .up {
            background-position: 0 -7px;
        }
        .down {
            background-position: 0 0;
        }
    }
</style>


