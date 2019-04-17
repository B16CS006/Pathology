<template>
  <div class="Contact pa-3">
    <h1 class="subheading grey--text">Profile</h1>
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size='150' class="grey lighten-2">
                <img :src="currentUser.avatar">
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
