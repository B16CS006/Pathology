<template>
  <v-footer height="auto" dark absolute="" v-model="footer" >
    <v-card class="flex" flat tile>
      <v-card-title class="teal subheading">Contact Us on Facebook</v-card-title>
      <v-card-actions class="grey darken-3">
        <div style="margin:auto;">&copy; {{ new Date().getFullYear() }}</div>
        <v-btn dark icon><v-icon size="16px">home</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
      return{
          footer:null
      }
  }
};
</script>

<style lang="stylus" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-right: 20px;
}
</style>
