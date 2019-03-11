<template>
    <v-container fluid>
        <v-layout row>
        <h1>Home</h1>
        </v-layout>
        <v-layout row>
        <!-- <app-container></app-container> -->
        <app-picture></app-picture>
        </v-layout>
    </v-container>
</template>

<script>
// import Container from '@/components/pathology/Container.vue'
import Picture from '@/components/pathology/Picture.vue'

export default {
    name: 'home',
    components:{
        // 'app-container': Container,
        'app-picture': Picture
    }
    
}
</script>

<style lang="stylus" scoped>

</style>
