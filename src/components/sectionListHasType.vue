<template>
    <div class="sectionListHasType">
        <div v-for="(item, index) in sectionList" :key="index">
            <div @click="clickSection(index)">
                <mt-cell :title="item.deptName" :class="'cell'+index" is-link value=""></mt-cell>
            </div>
            <div class="sub-cell displayNone" :class="'subcell'+index">
                <mt-cell title="普通" to="/1-6-1" is-link value=""></mt-cell>
                <mt-cell title="专家" to="/1-6-1" is-link value=""></mt-cell>
            </div>
        </div>
    </div>
</template>

<script>
import { Cell } from 'mint-ui';
import { mapGetters,mapActions } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    props: ['sectionList'],
    components: {
        Cell
    },
    computed: {
        ...mapGetters({
            selectDept: 'selectDept'
        })
    },
    mounted() {
        
    },
    methods: {
        ...mapActions(['set_selectDept']),
        clickSection(index) {
            var display = document.getElementsByClassName('subcell'+index)[0].style.display;
            switch(display) {
                case 'block':
                    document.getElementsByClassName('subcell'+index)[0].style.display = 'none';
                    document.getElementsByClassName('cell'+index)[0].style.color = 'inherit';
                    break;
                case 'none':
                    document.getElementsByClassName('subcell'+index)[0].style.display = 'block';
                    document.getElementsByClassName('cell'+index)[0].style.color = '#1c98fc';
                    break;
                default:
                    document.getElementsByClassName('subcell'+index)[0].style.display = 'block';
                    document.getElementsByClassName('cell'+index)[0].style.color = '#1c98fc';
                    break;
            }
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/base_common.scss';
    .sectionListHasType {
        .mint-cell-wrapper {
            @include font-dpr(14px);
        }
        .mint-cell:last-child {
            background-image: none;
        }
        .sub-cell {
            .mint-cell {
                @include cal(min-height, 35px);
                background-color: #fafafa;
            }
            .mint-cell-wrapper {
                color: #8f8f8f;
                @include font-dpr(12px);
            }
        }
    }
</style>


