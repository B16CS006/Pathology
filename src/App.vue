<template>
  <v-app class="grey lighten-4">
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
    <!-- <app-footer></app-footer> -->
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
// import AppFooter from './components/AppFooter';

export default {
  components:{
    NavBar,
    // 'app-footer': AppFooter
  },
  created(){
    this.$store.dispatch('getPictures')
  }
}
</script>
