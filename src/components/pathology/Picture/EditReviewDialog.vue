<template>
  <v-dialog width="600px" v-model="editDialog">
    <v-btn fab flat slot="activator"><v-icon>edit</v-icon></v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Details</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-textarea
                auto-grow
                rows="1"
                name="tissue"
                label="Tissue"
                id="tissue"
                v-model="tissue"
                type="text"
              ></v-textarea>
              <v-textarea
                auto-grow
                rows="1"
                name="cause"
                label="Cause"
                id="cause"
                v-model="cause"
                type="text"
              ></v-textarea>
              <v-textarea
                auto-grow
                rows="1"
                name="special"
                label="Special"
                id="special"
                v-model="special"
                type="text"
              ></v-textarea>
              <v-textarea
                auto-grow
                rows="1"
                name="comment"
                label="Comment"
                id="comment"
                v-model="comment"
                type="text"
              ></v-textarea>
              <v-checkbox label="Is Useful" id="useful" v-model="useful"/>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn color="orange" flat @click="editDialog = false">Close</v-btn>
              <v-btn color="green" flat @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['details'],
  data(){
    return{
      editDialog:false,
      tissue: this.details.tissue,
      cause: this.details.cause,
      special: this.details.special,
      comment: this.details.comment,
      useful: this.details.useful,
    }
  },
  methods:{
    onSaveChanges(){
      
      this.$store.dispatch('updatePictureDetails',{
        tissue: this.tissue? this.tissue: '',
        cause: this.cause? this.cause: '',
        special: this.special? this.special: '',
        comment: this.comment? this.comment: '',
        useful: this.useful? this.useful: false})
      this.editDialog = false
    }
  }
}
</script>
