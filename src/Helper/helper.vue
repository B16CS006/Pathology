<template>
  <v-container fluid>
    <v-btn @click="uploadUserText">Upload User Text</v-btn>
    <v-btn @click="downloadText">Download Text</v-btn>
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
          this.data = data.val();
          console.log("donwload success");
        });
    }
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
