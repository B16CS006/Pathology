<template>
  <v-container fluid>
    <v-layout row>
      <h1>Home</h1>
    </v-layout>
    <Pictures v-if="pictures"></Pictures>
  </v-container>
</template>

<script>
import Pictures from "@/components/pathology/Pictures.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  computed:{
      pictures(){
          return this.$store.getters.pictures
      }
  },
  components: { Pictures },
  methods: {
    openPicture(id) {
      this.$router.push("/picture/" + id);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
