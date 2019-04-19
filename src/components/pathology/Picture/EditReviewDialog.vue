<template>
  <v-dialog width max-width="800px" v-model="editDialog">
    <v-btn fab flat slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container class="teal lighten-5">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="title teal white--text">Edit Details</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              
              <v-textarea auto-grow rows="1" name="patientName" label="Patient Name" id="patientName" v-model="patientName" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="patientAge" label="Patient Age" id="patientAge" v-model="patientAge" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="patientHospital" label="Patient Hospital" id="patientHospital" v-model="patientHospital" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="patientBiopsy" label="Patient Biopsy Number" id="patientBiopsy" v-model="patientBiopsy" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="tissue" label="Tissue" id="tissue" v-model="tissue" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="macroscopicExamination" label="Macroscopic Examination" id="macroscopicExamination" v-model="macroscopicExamination" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="clinicalDiagnosis" label="Clinical Diagnosis" id="clinicalDiagnosis" v-model="clinicalDiagnosis" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="grossFinding" label="Gross Finding" id="grossFinding" v-model="grossFinding" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="report" label="Report" id="report" v-model="report" type="text" ></v-textarea>
              <v-textarea auto-grow rows="1" name="signature" label="Signature" id="signature" v-model="signature" type="text" ></v-textarea>

              <v-checkbox label="Description is useful" id="useful" v-model="useful"/>
              <v-checkbox label="Invalid Image" id="invalidImage" v-model="invalidImage"/>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn color="orange" flat @click="editDialog = false">Close</v-btn>
              <v-btn color="purple" flat @click="syncDetails">Reset</v-btn>
              <v-btn color="green" flat @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { database } from "firebase";

export default {
  props: ["pictureId", "details"],
  data() {
    return {
      editDialog: false,
      patientName: null,
      patientAge: null,
      patientHospital: null,
      patientBiopsy: null,
      tissue: null,
      macroscopicExamination: null,
      clinicalDiagnosis: null,
      grossFinding: null,
      report: null,
      signature: null,
      useful: null,
      invalidImage: null,
    };
  },
  methods: {
    onSaveChanges() {
      const pictureDetails = {
        patientName: this.patientName ? this.patientName.trim() : '',
        patientAge: this.patientAge ? this.patientAge.trim() : '',
        patientHospital: this.patientHospital ? this.patientHospital.trim() : '',
        patientBiopsy: this.patientBiopsy ? this.patientBiopsy.trim() : '',
        tissue: this.tissue ? this.tissue.trim() : '',
        macroscopicExamination: this.macroscopicExamination ? this.macroscopicExamination.trim() : '',
        clinicalDiagnosis: this.clinicalDiagnosis ? this.clinicalDiagnosis.trim() : '',
        grossFinding: this.grossFinding ? this.grossFinding.trim() : '',
        report: this.report ? this.report.trim() : '',
        signature: this.signature ? this.signature.trim() : '',
        useful: this.useful ? this.useful : false,
        invalidImage: this.invalidImage ? this.invalidImage : false,
      };

      const id = this.pictureId
      const uid = this.$store.getters.currentUser.uid

      database()
        .ref( "PictureDetails/" + id + "/" + uid )
        .set(pictureDetails)
        .then(() => {
          this.$emit('syncDetails',true)
          this.editDialog = false
          database().ref('PictureUpdated/' + uid + '/' + id).set(true); // add picture to the user updated list
        })
        .catch(error => {
          // console.log('Error While Uploading the image:',error)
        });
    },
    syncDetails() {
      this.patientName = this.details.patientName
      this.patientAge = this.details.patientAge
      this.patientHospital = this.details.patientHospital
      this.patientBiopsy = this.details.patientBiopsy
      this.tissue = this.details.tissue
      this.macroscopicExamination = this.details.macroscopicExamination
      this.clinicalDiagnosis = this.details.clinicalDiagnosis
      this.grossFinding = this.details.grossFinding
      this.report = this.details.report
      this.signature = this.details.signature
      this.useful = this.details.useful
      this.invalidImage = this.details.invalidImage
    }
  },
  created() {
    this.syncDetails();
  }
};
</script>
