<template>
  <v-container fluid v-if="details  && users">
    <v-layout row wrap v-if="details === 'loading'">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <template v-else>
      <v-layout row wrap>
        <v-flex class="teal lighten-3 subheading pa-2">Reviews</v-flex>
      </v-layout>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(detail, key, i) in details" :key="i">
          <template v-slot:header>
            <v-layout row align-center>
              <v-avatar size="38" class="mr-2">
                <img :src="avatar(key)">
              </v-avatar>
              <span>
                <strong>{{ userName(key) }}</strong><br>
                {{ email(key) }}
              </span>
            </v-layout>
          </template>
          <v-card>
            <v-layout row wrap justify-center>
              <v-flex v-for="(value, title, j) in detail" :key="j" xs12 sm6 md6 lg4 xl4>
                <div
                  class="text-capitalize subheading font-weight-bold pa-1 grey lighten-3"
                >{{title}}:</div>
                <div style="word-wrap:break-word" class="pa-2 grey lighten-5">{{value}}</div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
  </v-container>
</template>

<script>
import { database } from "firebase";

export default {
  props: ["details"],
  data() {
    return {
      panel: [],
      users: null
    };
  },
  computed: {},
  methods: {
    userName(uid) {
      return this.users
        ? this.users[uid]
          ? this.users[uid].name
            ? this.users[uid].name
            : this.users[uid].email
            ? this.users[uid].email
            : uid
          : uid
        : uid;
    },
    email(uid) {
      return this.users
        ? this.users[uid]
          ? this.users[uid].email
            ? this.users[uid].email
            : uid
          : uid
        : uid;
    },
    avatar(uid) {
      return this.users
        ? this.users[uid]
          ? this.users[uid].avatar
            ? this.users[uid].avatar
            : null
          : null
        : null;
    },
    getAllUsers() {
      database()
        .ref("Users")
        .once("value")
        .then(data => {
          this.users = data.val();
        })
        .catch(error => {
          // console.log(error, "while getting users");
        });
    }
  },
  created() {
    this.getAllUsers();
  }
};
</script>
