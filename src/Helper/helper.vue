<template>
  <v-container fluid>
    <v-btn @click="uploadUserText">Upload User Text</v-btn>
    <v-btn @click="downloadText">Download Text</v-btn>
    <v-btn @click="uploadData">Upload Data</v-btn>
    count : {{ dataCount }}
  </v-container>
</template>

<script>
import { database } from "firebase";
import userText from "@/assets/pathology.json";

export default {
  data() {
    return {
      data: null
    };
  },
  methods: {
    uploadUserText() {
      //upload pathology.json file content on firebase
      database()
        .ref("UserText")
        .update(userText)
        .then(() => {
          console.log("sucess");
        });
    },
    downloadText() {
      database()
        .ref("UserText")
        .once("value")
        .then(data => {
          this.data = {}
          for(let element in data.val()){
            let temp = {description: data.val()[element]}
            this.data[element] = temp
          }
          console.log("donwload success",Object.keys(data.val()).length, Object.keys(this.data).length);
        });
    },
    uploadData() {
      //upload pathology.json file content on firebase
      database()
        .ref("Pictures")
        .update(this.data)
        .then(() => {
          console.log("sucess");
        });
    },
  },
  computed: {
    dataCount() {
      if (this.data === null || this.data === undefined)
        return 0
      return Object.keys(this.data).length
    }
  }
};
</script>
