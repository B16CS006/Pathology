<template>
<v-container>
  <!-- <v-dialog max-width="500"> -->
    <!-- <v-btn flat slot="activator">Sign In</v-btn> -->
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text='error.message'></app-alert>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-title class="teal white--text">
        <h2>Sign In</h2>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="onSignIn">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="signinemail"
                label="E-mail"
                id="signinemail"
                v-model="signinemail"
                type="email"
                prepend-icon="email"
                :rules="emailRule"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="signinpassword"
                label="Passowrd"
                id="signinpassword"
                v-model="signinpassword"
                type="password"
                prepend-icon="vpn_key"
                :rules="inputRule"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
              <v-btn flat color="warning" type="reset">Reset</v-btn>
              <v-btn flat color="success" type="submit">Sign In</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  <!-- </v-dialog> -->
</v-container>
</template>

<script>
import Mixins from '../validationMixins.js'

export default {
  data() {
    return {
      signinemail: "",
      signinpassword: "",
    };
  },
  computed:{
    currentUser(){
      return this.$store.getters.currentUser
    },
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    currentUser(value){
      if(value !== null && value !== undefined){
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn() {
      if (this.$refs.form.validate()) {
        const payload ={
          email: this.signinemail,
          password: this.signinpassword,
        }
        this.$store.dispatch('signIn',payload)
        console.log(payload)
      }
    },
    onDismissed(){
      console.log('dismissed')
    }
  },
  mixins:[Mixins]
};
</script>

