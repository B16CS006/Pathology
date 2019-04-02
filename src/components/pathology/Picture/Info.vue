<template>
  <v-container fluid mt-4>
    <v-layout justify-space-around>
      <v-card>
        <img :src="pictureLink" :alt="pictureId" height="350" width="350">
      </v-card>
    </v-layout>
    <v-layout mt-5 justify-center>
      <v-card>
        <v-flex class="teal lighten-3" pa-2>Twitter Description</v-flex>
        <v-flex px-3 pt-2>
          <p>{{ twitterDescription }}</p>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
// import PictureLink from "./Link.vue";
// import { db } from "@/firebase.js";

export default {
  props: ["pictureId"],
  components: {},
  methods: {},
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
    twitterDescription() {
      return this.$store.getters.picture
        ? this.$store.getters.picture.description
        : null;
    },
    pictureLink() {
      return this.$store.getters.picture
        ? this.$store.getters.picture.link
        : null;
    }
  }
};
</script>
