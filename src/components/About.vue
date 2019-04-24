<template>
  <div class="pa-3">
    <h1 class="subheading grey--text">About</h1>
    <v-container fluid>
      <span v-html="about"></span>
    </v-container>
  </div>
</template>


<script>
import { database } from "firebase";
export default {
  data() {
    return {
      about: "<h2>About</h2>"
    };
  },
  watch: {
    about() {
      if (this.about === undefined || this.about === null) {
        this.about = "<h2>About</h2>";
      }
    }
  },
  beforeMount() {
    database()
      .ref("About/HTML")
      .once("value")
      .then(data => {
        this.about = data.val();
      });
  }
};
</script>