<template>
  <div class="Contact pa-3">
    <h1 class="subheading grey--text">Profile</h1>
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size='150' class="grey lighten-2">
                <img src="http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ currentUser.name }}</div>
              <div class="grey--text">{{ currentUser.role }}</div>
              <div class="grey--text"><v-icon small left>email</v-icon>{{ currentUser.email }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed:{
    currentUser(){
        return this.$store.getters.currentUser ? this.$store.getters.currentUser : {}
    }
  }
};
</script>
