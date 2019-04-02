<template>
    <!-- <div id="picture">
      <v-layout row><v-flex><h2>{{ pictureID }}</h2></v-flex></v-layout>
      <ul>
        <li><info></info></li>
        <li><review></review></li>
      </ul>
    </div> -->
    <v-container fluid>
      <v-layout row wrap justify-center>
          <v-tooltip right>
            <v-chip class="headline font-weight-light teal lighten-3 text-capitalize pa-1 " slot="activator">{{ pictureID }}</v-chip>
            <span class="font-italic">Name/Id => Twitter</span>
          </v-tooltip>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs12 md6><info block v-bind:pictureId="pictureID"></info></v-flex>
        <v-flex xs12 md6><review/></v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import PictureReview from './Picture/Review.vue'
import PictureInfo from './Picture/Info.vue'

export default {
  data(){
    return{
      pictureID:'1000399983051341824'
    }
  },
  computed:{
  },
  created(){
    this.$store.dispatch('getPicture',this.pictureID)
  },
  components:{
    'review':PictureReview,
    'info': PictureInfo
  }
}
</script>



<style scoped>
#picture {
  width: 100%;
  margin: 40px auto;
  /* background: rebeccapurple; */
  /* /* max-width: 1200px; * */
  padding: 0 20px;
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  /* background: red; */
  flex-grow: 1;
  flex-basis: 400px;
  text-align: center;
  padding: 30px;
  border: 1px solid red;
  margin: 10px;
}
</style>
