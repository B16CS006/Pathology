<template>
    <v-container fluid>
        <v-layout row>
        <h1>Home</h1>
        </v-layout>
        <v-layout row>
            <v-btn @click="openPicture(1000399983051341824)">Picture</v-btn>
        </v-layout>
        <Pictures></Pictures>
    </v-container>
</template>

<script>
import Pictures from '@/components/pathology/Pictures.vue'

export default {
    name: 'home',
    data(){
        return{
        }
    },
    components:{Pictures},
    methods:{
        openPicture(id){
            this.$router.push('/picture/' + id)
        }
    }
    
}
</script>

<style lang="stylus" scoped>

</style>
