<template>
  <div class="Contact pa-3">
    <h1 class="subheading grey--text">Contact</h1>
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.id">
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size='100' class="grey lighten-2">
                <img src="../assets/logo.png">
                <!-- <img :src="person.avatar"> -->
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.mobileNumber }}</div>
              <div class="grey--text">{{ person.email }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          id: 1,
          name: "Chetan Prakash Meena",
          mobileNumber: "+91-7727931260",
          email: "meena.13@iitj.ac.in",
          avatar: "../assets/logo.png"
        },
        {
          id: 2,
          name: "Ashutosh Yadav",
          mobileNumber: "+91-7727931260",
          email: "yadav.5@iitj.ac.in",
          avatar: "../assets/logo.png"
        }
      ]
    };
  },
};
</script>
