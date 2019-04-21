<template>
  <div class="pa-3">
    <h1 class="subheading grey--text">Home</h1>
    <v-container fluid>
      <Pictures v-if="pictures"></Pictures>
    </v-container>
  </div>
</template>

<script>
import Pictures from "@/components/pathology/Pictures.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    pictures() {
      return this.$store.getters.pictures;
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
