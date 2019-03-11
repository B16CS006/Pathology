<template>
  <v-dialog max-width="500">
    <v-btn flat slot="activator">Sign In</v-btn>
    <v-card>
      <v-card-title class="teal white--text">
        <h2>Sign In</h2>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="onSignin">
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
              <v-btn flat color="warning" type="validate">Cancel</v-btn>
              <v-btn flat color="success" type="submit">Sign In</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
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
  methods: {
    onSignin() {
      if (this.$refs.form.validate()) {
        console.log({
          email: this.signinemail,
          password: this.signinpassword,
        });
      }
    }
  },
  mixins:[Mixins]
};
</script>

