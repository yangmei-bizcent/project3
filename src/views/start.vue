<template>
    <mt-button class="fixed top0 width100 zIndex0" type="primary" @click="startAppoint">开始预约挂号</mt-button>
</template>

<script>
export default {
    methods: {
        startAppoint(){
            this.flowEngine.start((err, state)=>{
                this.$router.push({
                    path: '/'+state.key
                })
            })
        }
    },
}
</script>

<style lang="scss">

</style>


