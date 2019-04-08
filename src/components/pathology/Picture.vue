<template>
  <v-container fluid>
    <template v-if="picture">
      <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular indeterminate :width="7" :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
      <template v-else>
        <v-layout row wrap justify-center>
          <v-tooltip right>
            <v-chip
              class="headline font-weight-light teal lighten-3 text-capitalize pa-1"
              slot="activator"
            >{{ picture.id }}</v-chip>
            <span class="font-italic">Name/Id => Twitter</span>
          </v-tooltip>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 md6>
            <info block></info>
          </v-flex>
          <v-flex xs12 md6 v-if="userIsAuthenticated">
            <review/>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12>
            <AllReviews/>
          </v-flex>
        </v-layout>
      </template>
    </template>
    <v-layout row wrap v-else>Error : {{databaseError.message}}</v-layout>
  </v-container>
</template>

<script>
import PictureReview from "./Picture/Review.vue";
import PictureInfo from "./Picture/Info.vue";
import AllReviews from './Picture/AllReviews.vue';

export default {
  props: ["pictureId"],
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.currentUser;
    },
    picture() {
      return this.$store.getters.picture;
    },
    loading() {
      return this.$store.getters.loading;
    },
    databaseError() {
      return this.$store.getters.databaseError;
    }
  },
  methods: {
    updatePictureId() {
      this.$store.dispatch("updatePicture", this.pictureId);
      this.$store.dispatch("getPicture", this.pictureId);
    }
  },
  created() {
    this.updatePictureId();
  },
  watch: {
    pictureId() {
      this.updatePictureId();
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
