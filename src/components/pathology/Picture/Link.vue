<template>
<v-container>
    <div>{{ info }}</div>
    <v-btn @click="testUploadFirebaseDatabase">Update</v-btn>
    <div v-for="user in users" :key="user['.key']"> {{ user }}</div>
</v-container>
</template>

<script>
import { db } from '@/firebase.js'
import userText from '@/assets/user_text.json'

export default {
  data() {
    return {
      user : 'chetan',
      info: "info about pathology",
      users: ['asdf','asdf']
    };
  },
  firebase:{
    users: db.ref().child('Users')
  },
  methods: {
    testUploadFirebaseDatabase(){
      // db.ref().child('info').push({info:this.info, edit : false});
      // this.$store.dispatch('getPicture',"261582128888807424")

      // db.ref().child('UserText').set(userText);
      // user_text = JSON.stringify(userText);
      // db.ref().child('gaurav').set(user_text);
    },
    getFiles(){
      const path = require('path')
      const fs = require('fs');
      // fs.readdir(path.join(__dirname, '../../../assests'), (err, items) => {
      //   if (err) { console.log(err) }
      //   console.log(items)
      // })
    }
  },
  created(){
    // this.$http.get('https://photoslibrary.googleapis.com/v1/albums').then(response => (this.info = response))

  }
  // mounted(){
  //     axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(response => (this.info = response))
  // }
};
</script>
