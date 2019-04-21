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
      <v-list>
        <v-list-group
          v-model="panel[i]"
          no-action
          v-for="(detail, key, i) in details"
          :key="i"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-avatar>
              <img :src="avatar(key)">
            </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="text-capitalize">{{ userName(key) }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ email(key) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-divider/>
          <v-container fluid>
          <v-layout row wrap justify-center>
            <v-flex v-for="(value, title, j) in detail" :key="j" xs12 sm6 md6 lg4 xl4>
              <div
                class="text-capitalize subheading font-weight-bold pa-1 grey lighten-3"
              >{{title}}:</div>
              <div class="pa-2 grey lighten-5">{{value}}</div>
            </v-flex>
          </v-layout>
          </v-container>
        </v-list-group>
      </v-list>
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
    avatar(uid){
      const link = "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg"
      return this.users
        ? this.users[uid]
          ? this.users[uid].avatar
            ? this.users[uid].avatar
            : link
          : link
        : link
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
