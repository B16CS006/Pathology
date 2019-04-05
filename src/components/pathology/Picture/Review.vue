<template>
  <v-container>
    <v-card color="grey lighten-4 mt-3" flat>
      <v-toolbar flat color="grey lighten-3">
        <v-toolbar-title>
          <span class="title font-weight-light">Details</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="readonly" color="black" icon flat @click="readonly = false"><v-icon>edit</v-icon></v-btn>
        <v-btn v-if="!readonly" color="orange" icon flat @click="onClear"><v-icon>clear</v-icon></v-btn>
        <v-btn v-if="!readonly" color="green" icon flat @click="onDone"><v-icon>done</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-flex offset-sm1>
          <form @submit.prevent="onSubmit">
            <v-flex xs12>
              <v-textarea
                auto-grow
                rows="1"
                :readonly="readonly"
                name="tissue"
                label="Tissue"
                id="tissue"
                v-model="myDetails.tissue"
                type="text"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                auto-grow
                rows="1"
                :readonly="readonly"
                name="cause"
                label="Cause"
                id="cause"
                v-model="myDetails.cause"
                type="text"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                auto-grow
                rows="1"
                :readonly="readonly"
                name="special"
                label="Special"
                id="special"
                v-model="myDetails.special"
                type="text"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                auto-grow
                rows="1"
                :readonly="readonly"
                name="comment"
                label="Comment"
                id="comment"
                v-model="myDetails.comment"
                type="text"
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
            <v-checkbox :readonly="readonly" label="Is Useful" id="useful" v-model="myDetails.useful"/>
            </v-flex>
          </form>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      myDetails: {},
      readonly: true,
      icon: "edit"
    };
  },
  computed:{
    details(){
      return this.$store.getters.pictureDetails
    }
  },
  watch:{
    details(){
      myDetails = "find"
    }
  },
  methods: {
    onClear(){},
    onDone(){}
  }
};
</script>

<style>
</style>
