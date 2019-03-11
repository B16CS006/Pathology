<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 offset-sm1>
        <form @submit.prevent="onSignup">
          <v-container>
            <v-flex xs12>
              <v-text-field name="tissue" label="Tissue" id="tissue" v-model="tissue" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field name="cause" label="Cause" id="cause" v-model="cause" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field name="special" label="Special" id="special" v-model="special" type="text"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field name="comment" label="Comment" id="comment" v-model="comment" type="text"></v-text-field>
            </v-flex>
            <v-checkbox label="Is Useful" id="useful" v-model="useful"/>
          <v-layout row justify-center>
            <v-btn mx-2 color="teal lighten-3" depressed>Reset</v-btn>
            <v-btn mx-2 color="teal lighten-3" depressed>Save</v-btn>
          </v-layout>
          </v-container>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      tissue: null,
      cause: null,
      special: null,
      comment: null,
      useful: false
    };
  }
};
</script>

<style>
</style>
