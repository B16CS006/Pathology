<template>
  <!-- <div style="background:black">
    <div><img src='../../../assets/logo.png' alt="logo.png"></div>
    <div><p>{{ info }}</p></div>
  </div>-->
  <v-container fluid mt-4>
    <v-layout justify-space-around>
      <v-card>
        <v-flex>
          <img src="../../../assets/logo.png" alt="logo.png">
        </v-flex>
      </v-card>
    </v-layout>
    <v-layout mt-5 justify-center>
        <v-card >
            <v-flex class="teal lighten-3" pa-2>Twitter Description
            </v-flex>
        <v-flex px-3 pt-2>
          <p>{{ info }}</p>
        </v-flex></v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      info: "Image description by my side"
    };
  }
};
</script>
