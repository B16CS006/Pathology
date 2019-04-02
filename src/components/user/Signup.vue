<template>
<v-container>
  <!-- <v-dialog max-width="500"> -->
    <!-- <v-btn flat slot="activator">Sign Up</v-btn> -->
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text='error.message'></app-alert>
      </v-flex>
    </v-layout>
    <v-card>
      <v-card-title class="teal white--text">
        <h2>Sign Up</h2>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="onSignup">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="signupemail"
                label="E-mail"
                id="signupemail"
                v-model="signupemail"
                type="email"
                prepend-icon="email"
                :rules="emailRule"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="signuppassword"
                label="Passowrd"
                id="signuppassword"
                v-model="signuppassword"
                type="password"
                prepend-icon="vpn_key"
                :rules="inputRule"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                prepend-icon="vpn_key"
                :rules="[comparePasswords(signuppassword, confirmPassword)]"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-between>
              <v-btn flat color="warning" type="reset">Reset</v-btn>
              <v-btn flat color="success" type="submit" :disabled="loading" :loading="loading">
                Sign Up
                <span class="custom-loader" slot="loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  <!-- </v-dialog> -->
  </v-container>
  <!-- <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="signupemail"
                      label="E-mail"
                      id="signupemail"
                      v-model="signupemail"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="signuppassword"
                      label="Passowrd"
                      id="signuppassword"
                      v-model="signuppassword"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn type="validate">Reset</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn type="submit">Sign Up</v-btn>
                    </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>-->
</template>

<script>
import Mixins from '../validationMixins.js'

export default {
  data() {
    return {
      signupemail: "",
      signuppassword: "",
      confirmPassword: ""
    };
  },
  computed: {
    currentUser(){
      return this.$store.getters.currentUser
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
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
    onSignup() {
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.signupemail,
          password: this.signuppassword
        }
        this.$store.dispatch('signUp',payload)
        console.log(payload);
      }
    },
    onDismissed(){
      console.log('dismissed')
      this.$store.dispatch('clearError')
    }
  },
  mixins:[Mixins]
};
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>