<template>
  <div class="Contact pa-3">
    <h1 class="subheading grey--text">Contact</h1>
    <v-container class="my-5">
      <v-layout row wrap justify-center v-if="contacts">
        <v-flex xs12 sm6 md4 lg3 v-for="(contact,id) in contacts" :key="id">
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size='150' class="grey lighten-2">
                <img :src="contact.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ contact.name }}</div>
              <div class="grey--text"><v-icon small left>call</v-icon>{{ contact.mobile }}</div>
              <div class="grey--text"><v-icon small left>email</v-icon>{{ contact.email }}</div>
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
  computed:{
    contacts(){
      return this.$store.getters.contacts
    }
  },
  created(){
    this.$store.dispatch('getContacts')
  }
};
</script>
