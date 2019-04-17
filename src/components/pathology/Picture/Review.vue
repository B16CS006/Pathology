<template>
  <v-container>
    <v-card color="grey lighten-4 mt-3" flat>
      <v-layout row wrap v-if="details === 'loading'">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular indeterminate :width="7" :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
      <template v-else>
        <v-toolbar flat color="grey lighten-3">
          <v-toolbar-title>
            <span class="title font-weight-light">Details</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <edit-review-dialog v-bind:pictureId="pictureId" v-bind:details="myDetails" v-on:syncDetails="syncDetails($event)"></edit-review-dialog>
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
          <v-list-tile>
            <v-list-tile-content>
               <v-checkbox label="Is Useful" readonly :value="myDetails.useful"/>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </template>
    </v-card>
  </v-container>
</template>


<script>
import EditReviewDialog from "./EditReviewDialog.vue";

export default {
  props: ["details", "pictureId"],
  data() {
    return {};
  },
  components: {
    EditReviewDialog
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    myDetails() {
      return this.details ? this.details[this.currentUser.uid] ? this.details[this.currentUser.uid] : {} : {}
    }
  },
  methods: {
    syncDetails(sync) {
      this.$emit('syncDetails',sync)
    }
  }
};
</script>

<style>
</style>
