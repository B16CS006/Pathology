<template>
  <v-container>
    <v-card color="grey lighten-4 mt-3" flat>
      <v-toolbar flat color="grey lighten-3">
        <v-toolbar-title>
          <span class="title font-weight-light">Details</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <edit-review-dialog></edit-review-dialog>
      </v-toolbar>
      <v-list two-line class="grey lighten-4 ml-2">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Tissue</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.tissue}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Cause</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.cause}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Special</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.special}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Comment</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.comment}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-card>
  </v-container>
</template>


<script>
import EditReviewDialog from './EditReviewDialog.vue'

export default {
  components:{
    EditReviewDialog
  },
  computed:{
    currentUser(){
      return this.$store.getters.currentUser
    },
    details(){
      return this.$store.getters.picture.details
    },
    myDetails(){
      return this.$store.getters.picture.details? this.$store.getters.picture.details[this.currentUser.uid] ? this.$store.getters.picture.details[this.currentUser.uid] : {} : {}
    }
  }
};
</script>

<style>
</style>
