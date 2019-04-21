<template>
  <div class="pa-3">
    <h1 class="subheading grey--text">Contact</h1>
    <v-container class="my-5">
      <v-layout row wrap justify-center v-if="contacts">
        <v-flex xs12 sm6 md4 lg3 v-for="(contact,id) in contacts" :key="id">
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="150" class="grey lighten-2">
                <img :src="contact.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ contact.name }}</div>
              <div class="grey--text">
                <v-icon small left>call</v-icon>
                {{ contact.mobile }}
              </div>
              <div class="grey--text">
                <v-icon small left>email</v-icon>
                {{ contact.email }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey" @click="messageDialog = true">
                <v-icon small left>message</v-icon>
                <single-input-dialog
                  :visible="messageDialog"
                  value
                  title="Enter here"
                  @close="messageDialog = false"
                  @update="sendMessage({event: $event, id: id})"
                />
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
import { database } from "firebase";
export default {
  data() {
    return {
      messageDialog: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
        ? this.$store.getters.currentUser.uid
          ? this.$store.getters.currentUser.uid
          : null
        : null;
    },
    contacts() {
      return this.$store.getters.contacts;
    }
  },
  methods: {
    sendMessage(event) {
      this.messageDialog = false;
      if (event.event && event.event.length > 0) {
        if (this.currentUser) {
          database()
            .ref("Message")
            .push({ message: event.event, by: this.currentUser });
        } else {
          window.open("mailto:meena.13@iitj.ac.in");
        }
      }
    }
  },
  created() {
    this.$store.dispatch("getContacts");
  }
};
</script>
