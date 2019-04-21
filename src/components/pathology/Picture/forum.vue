<template>
  <v-container fluid v-if="currentUser">
    <v-layout row wrap v-if="details === 'loading'">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <template v-else>
      <v-layout row wrap class="teal lighten-3">
        <v-flex class="subheading pa-2">Forum</v-flex>
        <v-btn fab small flat @click="createNewThreadDialog = true">
          <v-icon>add</v-icon>
          <single-input-dialog
            :visible="createNewThreadDialog"
            value
            title="Enter here"
            @close="createNewThreadDailog = false"
            @update="create"
          />
        </v-btn>
      </v-layout>
      <v-list v-if="details  && users">
        <v-list-group
          v-model="detail.active"
          no-action
          v-for="(detail, key, i) in details"
          :key="i"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ detail.message }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ userName(detail.by) }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>

               <v-btn fab small flat @click="replyDialog = true">
                <v-icon>add</v-icon>
                <single-input-dialog
                  :visible="replyDialog"
                  value
                  title="Enter here"
                  @close="replyDialog = false"
                  @update="reply({message: $event, key: key})"
                /></v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
          <v-divider/>
          <v-list-tile v-for="(reply, j) in detail.replies" :key="j">
            <v-list-tile-content>
              <v-list-tile-title>{{ reply.message }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ userName(reply.by) }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </template>
  </v-container>
</template>

<script>
import { database } from "firebase";

export default {
  props: ["pictureId"],
  data() {
    return {
      panel: [],
      users: null,
      details: null,
      createNewThreadDialog: false,
      replyDialog: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
        ? this.$store.getters.currentUser.uid
          ? this.$store.getters.currentUser.uid
          : null
        : null;
    }
  },
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
    // email(uid) {
    //   return this.users
    //     ? this.users[uid]
    //       ? this.users[uid].email
    //         ? this.users[uid].email
    //         : uid
    //       : uid
    //     : uid;
    // },
    getAllUsers() {
      if (!this.currentUser) {
        return;
      }
      database()
        .ref("Users")
        .once("value")
        .then(data => {
          this.users = data.val();
        })
        .catch(error => {
          // console.log(error, "while getting users");
        });
    },
    getForum() {
      database()
        .ref("Forum")
        .child(this.pictureId)
        .once("value")
        .then(data => {
          this.details = data.val();
          console.log(this.details);
        });
    },
    create(event) {
      database()
        .ref("Forum")
        .child(this.pictureId)
        .push({ message: event, by: this.currentUser })
        .then(() => {
          this.createNewThreadDialog = false;
          this.getForum();
        })
        .catch(error => {
          this.createNewThreadDialog = false;
          console.log(error);
        });
    },
    reply(event) {
        console.log(event.key);
        // return
        
      database()
        .ref("Forum")
        .child(this.pictureId)
        .child(event.key)
        .child("replies")
        .push({ by: this.currentUser, message: event.message })
        .then(() => {
          this.replyDialog = false;
          this.getForum();
        })
        .catch(error => {
          this.replyDialog = false;
        });
    }
  },
  created() {
    console.log(this.pictureId);
    this.getAllUsers();
    this.getForum();
  }
};
</script>
