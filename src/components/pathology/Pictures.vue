<template>
  <v-container fluid>
    <!-- {{ pictures }}
    {{ updatedPictures }}
    {{ featuredPictures }} -->
    <v-layout justify-center>
      <v-flex xs12 sm12 md10>
        <v-card flat>
          <v-container grid-list-xs fluid>
            <v-layout row wrap>
              <v-flex v-for="(picture) in pictures" :key="picture" xs12 sm6 md4 d-flex>
                <v-card flat tile class="d-flex" :to="'/picture/' + picture">
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
      },
      updatedPictures(){
        return this.$store.getters.updatedPictures
      },
      featuredPictures(){
        return this.$store.getters.featuredPictures
      }
  },
  methods:{
  },
  created(){
    this.$store.dispatch('getPictures')
  }
};
</script>
