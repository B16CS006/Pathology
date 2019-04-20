<template>
  <v-container fluid>
    <template v-if="currentUser !== null && isValidUser">
      <v-btn @click="uploadUserText">Upload User Text</v-btn>
      <v-layout column>
        <v-btn @click="downloadAllText">Download All Text</v-btn>
        <v-btn @click="downloadText">Download Text</v-btn>
        <v-btn @click="uploadData">Upload Data</v-btn>
        <v-btn @click="resetCount">Reset Count</v-btn>
        count : {{ dataCount }} ,
        uploadedDescription : {{ uploadedDescription }}
      </v-layout>
      <v-btn @click="uploadImages">Upload Images</v-btn>
      <v-btn @click="pick">something</v-btn>
      <input style="display: none" ref="filename" type="file">
    </template>
    <p v-else>You are not permitted to view this page.</p>
  </v-container>
</template>

<script>
import { database } from "firebase";
import userText from "@/assets/pathology.json";

export default {
  data() {
    return {
      data: null,
      validUsers: [],
      uploadedDescription: 0
    };
  },
  methods: {
    getValidUsers() {
      database()
        .ref("Helper/ValidUsers")
        .once("value")
        .then(data => {
          if (data.val() !== null) {
            this.validUsers = data.val().split(",");
          }
        });
    },
    resetCount() {
      this.data = null;
      this.uploadedDescription = 0;
    },
    uploadUserText() {
      //upload pathology.json file content on firebase
      database()
        .ref("UserText")
        .update(userText)
        .then(() => {
          // console.log("sucess");
        });
    },
    downloadAllText() {
      database()
        .ref("UserText")
        // .limitToLast(500)
        .once("value")
        .then(data => {
          this.data = {};
          for (let element in data.val()) {
            let temp = { description: data.val()[element] };
            this.data[element] = temp;
          }
          // console.log("donwload success",Object.keys(data.val()).length, Object.keys(this.data).length);
        });
    },
    downloadText() {
      database()
        .ref("UserText")
        .limitToLast(500)
        .once("value")
        .then(data => {
          this.data = {};
          for (let element in data.val()) {
            let temp = { description: data.val()[element] };
            this.data[element] = temp;
          }
          // console.log("donwload success",Object.keys(data.val()).length, Object.keys(this.data).length);
        });
    },
    uploadData() {
      //upload pathology.json file content on firebase

      if (this.data === null) {
        return;
      }

      this.uploadedDescription = 0;

      for (const _data in this.data) {
        database()
          .ref("Pictures")
          .child(_data)
          .child("description")
          .set(this.data[_data].description)
          .then(() => {
            database()
              .ref("UserText")
              .child(_data)
              .set(null)
              .then(() => {
                this.uploadedDescription += 1;
              });
          });
      }

      // database().ref('AutoUpdate/Picture').update(this.data).then(()=>{
      //   // console.log('Successful')
      // })

      // database()
      //   .ref("Pictures")
      //   .update(this.data)
      //   .then(() => {
      //     console.log("sucess");
      //   });
    },
    uploadImages() {
      // upload all images which are in userText
      // let files = Object.keys(userText)
      // for(file of files){
      // }
    },
    pick() {
      this.$refs.filename.click();
    }
    // picked(event){
    //   // const files = event.target.files
    //   // let filename = files[0].name

    //   // const fileReader = new FileReader()
    //   // fileReader.readAsDataURL(files[0])
    //   // console.log(files)
    // }
  },
  computed: {
    dataCount() {
      if (this.data === null || this.data === undefined) return 0;
      return Object.keys(this.data).length;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isValidUser() {
      return this.validUsers.includes(this.currentUser.uid);
    }
  },
  created() {
    this.getValidUsers();
  }
};
</script>
