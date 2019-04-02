<template>
    <v-container fluid>
        <v-layout row>
        <h1>Home</h1>
        </v-layout>
        <v-layout row>
            <v-btn @click="openPicture(1000399983051341824)">Picture</v-btn>
        <!-- <app-picture></app-picture> -->
        </v-layout>
    </v-container>
</template>

<script>
// import Picture from '@/components/pathology/Picture.vue'

export default {
    name: 'home',
    data(){
        return{
        }
    },
    components:{
        // 'app-picture': Picture
    },
    methods:{
        openPicture(id){
            this.$router.push('/picture/' + id)
        }
    }
    
}
</script>

<style lang="stylus" scoped>

</style>
