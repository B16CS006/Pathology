<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm12 md10>
        <v-card flat>
          <v-container grid-list-xs fluid>
            <v-layout row wrap>
              <v-flex v-for="picture in pictures" :key="picture" xs6 sm4 md3 d-flex>
                <v-card flat tile class="d-flex" :to="'/picture/' + picture">
                  <!-- <v-img
                    :src="picture.link"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                  </v-img> -->
                  <v-btn>{{ picture }}</v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
      pictures(){
          return this.$store.getters.featuredPictures
      }
  },
  methods:{
  }
};
</script>
