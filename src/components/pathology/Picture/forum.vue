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
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="(detail, key, i) in details"
          :key="i">
          <template v-slot:header>
            <v-layout row align-center>
                <v-avatar size="38" class="mr-2"><img :src="avatar(detail.by)"></v-avatar>
                <span><strong>{{ userName(detail.by) }} - </strong>{{ detail.message }}</span>
              <v-spacer/>
              <v-btn fab small flat ripple @click.native.stop="reply(key)">
                  <v-icon>reply</v-icon>
                  <single-input-dialog
                    :visible="replyDialog"
                    v-model="detail.dialog"
                    title="Enter here"
                    @close="replyDialog = false"
                    @update="sendReply"
                  />
                </v-btn>
            </v-layout>
          </template>
          <v-card >
            <v-layout class="ml-5" row align-center v-for="(reply, j) in detail.replies" :key="j">
              <v-avatar size="35" class="ml-4"><img :src="avatar(reply.by)"></v-avatar>
              <v-card-text><strong>{{ userName(reply.by) }} - </strong>{{ reply.message }}</v-card-text>
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
  props: ["pictureId"],
  data() {
    return {
      users: null,
      details: null,
      createNewThreadDialog: false,
      replyDialog: false,
      sendReplyTo: null
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
    avatar(uid) {
      return this.users
        ? this.users[uid]
          ? this.users[uid].avatar
            ? this.users[uid].avatar
            : null
          : null
        : null
    },
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
          console.log(error, "while getting users");
        });
    },
    getForum() {
      database()
        .ref("Forum")
        .child(this.pictureId)
        .once("value")
        .then(data => {
          this.details = data.val();
          // console.log(this.details);
        }).catch(error => {
          console.log(error)
        })
    },
    create(event) {
      if (event && event.length > 0) {
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
      }
    },
    sendReply(event) {
      database()
        .ref("Forum")
        .child(this.pictureId)
        .child(this.sendReplyTo)
        .child("replies")
        .push({ by: this.currentUser, message: event })
        .then(() => {
          this.replyDialog = false;
          this.sendReplyTo = null
          this.getForum();
        })
        .catch(error => {
          this.replyDialog = false
          this.sendReplyTo = null
          console.log(error)
        });
    },
    reply(key){
      this.sendReplyTo = key
      this.replyDialog = true
    }
  },
  watch: {
    pictureId() {
      this.getForum();
    }
  },
  created() {
    this.getAllUsers();
    this.getForum();
  }
};
</script>
