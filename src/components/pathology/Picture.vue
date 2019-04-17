<template>
  <v-container fluid>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <template v-else>
      <template v-if="picture">
        <v-layout row wrap justify-center>
          <v-tooltip right>
            <v-chip
              class="headline font-weight-light teal lighten-3 text-capitalize pa-1"
              slot="activator"
            >{{ picture[2] }}</v-chip>
            <span class="font-italic">Twitter Id : {{ picture[0] }}</span>
          </v-tooltip>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md6>
            <info block v-bind:picture="picture"></info>
          </v-flex>
          <v-flex xs12 md6 v-if="userIsAuthenticated">
            <review v-bind:details="pictureDetails" v-bind:pictureId="picture[0]" v-on:syncDetails="getDetails"/>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12>
            <AllReviews v-bind:details="pictureDetails"/>
          </v-flex>
        </v-layout>
      </template>
      <p v-else>{{pictureId}} : No such Image found</p>
    </template>
  </v-container>
</template>

<script>
import PictureReview from "./Picture/Review.vue";
import PictureInfo from "./Picture/Info.vue";
import AllReviews from "./Picture/AllReviews.vue";
import { database } from "firebase";

export default {
  props: ["pictureId"],
  data() {
    return {
      pictureDetails: "loading"
    };
  },
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.currentUser;
    },
    picture() {
      return this.$store.getters.picture(this.pictureId);
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    getDetails() {
      database()
        .ref("PictureDetails/" + this.pictureId)
        .once("value")
        .then(data => {
          this.pictureDetails = data.val();
        })
        .catch(error => {
          this.pictureDetails = null;
          console.log("picture while downloading details: ", error);
        });
    }
  },
  beforeMount(){
    this.getDetails()
  },
  watch:{
    picture(){
      this.getDetails()
    }
  },
  components: {
    review: PictureReview,
    info: PictureInfo,
    AllReviews
  }
};
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
