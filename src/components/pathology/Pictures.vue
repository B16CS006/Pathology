<template>
  <v-container fluid>
    <!-- {{ pictures.length }} -->
    <!-- {{ updatedPictures.length }}
    {{ featuredPictures.length }} -->
    <v-layout justify-center>
      <v-flex xs12 sm12 md10>
        <v-pagination
          v-model="page"
          :length="totalPage"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          circle
        ></v-pagination>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm12 md10>
        <v-card flat color="grey lighten-4">
          <v-container grid-list-xs fluid>
            <v-layout row wrap justify-space-around>
              <v-flex v-for="(picture) in featuredPictures" :key="picture[0]" xs12 sm6 md3 xl2 d-flex >
                <v-card flat tile class="d-flex" :to="'/picture/' + picture[0]" color="grey lighten-4">
                 <v-img
                  v-if="picture[1].link"
                  :src="picture[1].link"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  ></v-img>
                  <v-btn v-else>{{ picture[0] }}</v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm12 md10>
        <v-pagination
          v-model="page"
          :length="totalPage"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          circle
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 50,
      featuredPictures: null
    };
  },
  beforeMount() {
    this.updateFeaturedPictures();
  },
  computed: {
    pictures() {
      return this.$store.getters.pictures;
    },
    updatedPictures() {
      return this.$store.getters.updatedPictures;
    },
    totalPage() {
      return Math.ceil(this.pictures.length / this.pageSize);
    }
  },
  methods: {
    updateFeaturedPictures() {
      this.featuredPictures = this.pictures.slice(
        this.pageSize * (this.page - 1),
        this.page * this.pageSize
      );
      if (this.featuredPictures.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    }
  },
  watch: {
    page() {
      this.updateFeaturedPictures();
    }
  }
};
</script>
