<template>
  <div v-if="currentUser.uid" class="Contact pa-3">
    <h1 class="subheading grey--text">Profile</h1>
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size='150' class="grey lighten-2">
                <img :src="avatar" @click="avatarInputDialog = true" style="cursor: pointer">
                <single-input-dialog 
                :visible="avatarInputDialog"
                :value="currentUser.avatar"
                title="Enter link for your Avatar:" @close="avatarInputDialog = false"
                @update="updateAvatar"
              />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading" @click="nameInputDialog = true" style="cursor: pointer">{{ currentUser.name }}</div>
              <single-input-dialog 
                :visible="nameInputDialog"
                :value="currentUser.name"
                title="Enter new Name:" @close="nameInputDialog = false"
                @update="updateName"
              />
              <div class="grey--text">{{ currentUser.role }}</div>
              <div class="grey--text"><v-icon small left>email</v-icon>{{ currentUser.email }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    You do not have access to this page
  </div>
</template>

<script>
import { database } from 'firebase'

export default {
  data(){
    return{
      nameInputDialog:false,
      avatarInputDialog:false,
    }
  },
  methods:{
    updateName(event){
      database().ref('Users').child(this.$store.getters.currentUser.uid).child('name').set(event).then(()=>{
        this.nameInputDialog = false
        this.$store.dispatch('getCurrentUser')
      }).catch((error) => {
        console.log("error: ",error)
        this.nameInputDialog = false
      })
    },
    updateAvatar(event){
      database().ref('Users').child(this.$store.getters.currentUser.uid).child('avatar').set(event).then(()=>{
        this.avatarInputDialog = false
        this.$store.dispatch('getCurrentUser')
      }).catch((error) => {
        console.log("error: ",error)
        this.avatarInputDialog = false
      })
    }
  },
  computed:{
    currentUser(){
        return this.$store.getters.currentUser ? this.$store.getters.currentUser : {}
    },
    avatar(){
      return this.currentUser.avatar ? this.currentUser.avatar : "http://images.goodsmile.info/cgm/images/product/20160805/5858/40556/large/af31d8e81b224d2f38f554e5f2b5cd40.jpg"
    }
  }
};
</script>
