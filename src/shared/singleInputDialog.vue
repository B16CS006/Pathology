<template>
  <v-dialog width max-width="400" v-model="show">
    <v-card>
      <v-card-title class="teal white--text title">Edit</v-card-title>
      <v-card-text>
            <v-text-field autofocus :label="title" v-model="input" type="text" ></v-text-field>
      </v-card-text>
      <v-card-actions>
          <v-spacer/>
        <v-btn color="orange" flat @click="show = false"><v-icon>cancel</v-icon></v-btn>
        <v-btn color="green" flat @click="done" :disabled="clickedDone"><v-icon>done</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["visible","title","value"],
  data() {
    return {
      input: "",
      clickedDone:false
    };
  },
  methods:{
      done(){
          this.clickedDone = true
          this.$emit('update',this.input)
      }
  },
  watch:{
      visible(){
          if(this.visible){
              this.input = this.value
              this.clickedDone=false
          }
      }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close",this.input);
        }
      }
    }
  }
};
</script>

