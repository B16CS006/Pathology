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

          <div class="subheading font-weight-bold px-1 pt-2">Patient History:</div>
        <v-layout row wrap class="pb-3">
          <v-flex xs12 sm6>
            <div class="subheading px-1" >Name:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.patientName}}</div>
          </v-flex>
          <v-flex xs12 sm6>
            <div class="subheading px-1" >Age:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.patientAge}}</div>
          </v-flex>
          <v-flex xs12 sm6>
            <div class="subheading px-1" >Hospital:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.patientHospital}}</div>
          </v-flex>
          <v-flex xs12 sm6>
            <div class="subheading px-1" >Biopsy:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.patientBiopsy}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="subheading font-weight-bold px-1" >Tissue:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.tissue}}</div>
          </v-flex>
          <v-flex xs12>
            <div class="subheading font-weight-bold px-1" >Macroscopic Examination:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.macroscopicExamination}}</div>
          </v-flex>
          <v-flex xs12>
            <div class="subheading font-weight-bold px-1" >Clinical Diagnosis:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.clinicalDiagnosis}}</div>
          </v-flex>
          <v-flex xs12>
            <div class="subheading font-weight-bold px-1" >Gross Finding:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.grossFinding}}</div>
          </v-flex>
          <v-flex xs12>
            <div class="subheading font-weight-bold px-1" >Report:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.report}}</div>
          </v-flex>   
          <v-flex xs12>
            <div class="subheading font-weight-bold px-1" >Signature:</div>
            <div style="word-wrap:break-word" class="px-2 pb-2">{{myDetails.signature}}</div>
          </v-flex>          
          <v-flex xs12>
            <v-checkbox label="Description is useful" readonly v-model="myDetails.useful"/>
          </v-flex> 
          <v-flex xs12>
            <v-checkbox label="Invalid Image" readonly v-model="myDetails.invalidImage"/>
           </v-flex>
        </v-layout>
        <!-- <v-list two-line class="grey lighten-4 ml-2">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Patient History:</v-list-tile-title>
              <v-list-tile-action-text class="body-1 font-weight-bold"> Name      : {{myDetails.patientName}}</v-list-tile-action-text>
              <v-list-tile-action-text class="body-1 font-weight-bold"> Age       : {{myDetails.patientAge}}</v-list-tile-action-text>
              <v-list-tile-action-text class="body-1 font-weight-bold"> Hospital  : {{myDetails.patientHospital}}</v-list-tile-action-text>
              <v-list-tile-action-text class="body-1 font-weight-bold"> Biopsy_Number : {{myDetails.patientBiopsy}}</v-list-tile-action-text>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Type of Tissue/Specimen</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.tissue}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Macroscopic Examination</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.macroscopicExamination}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Clinical Diagnosis (Suspected)</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.clinicalDiagnosis}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Gross Findings</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.grossFinding}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Interpretation/Histopathology Report</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.report}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Signature</v-list-tile-title>
              <v-list-tile-sub-title>{{myDetails.signature}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
               <v-checkbox label="Description is useful" readonly :value="myDetails.useful"/>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
               <v-checkbox label="Invalid Image" readonly :value="myDetails.invalidImage"/>
            </v-list-tile-content>
          </v-list-tile>
        </v-list> -->
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
