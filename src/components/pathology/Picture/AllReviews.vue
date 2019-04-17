<template>
  <v-container fluid v-if="details">
    <v-layout row wrap v-if="details === 'loading'">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular indeterminate :width="7" :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
    <template v-else>
    <v-layout row wrap>
      <v-flex class="teal lighten-3 subheading pa-2">Reviews</v-flex>
    </v-layout>
    <v-expansion-panel v-model="panel">
      <v-expansion-panel-content
        v-for="(detail, key, i) in details"
        :key="i">
        <template v-slot:header>
          <div class="font-weight-medium">{{ key }}</div>
        </template>
        <v-list v-for="(value, title, j) in detail" :key="j">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{value}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </template>
  </v-container>
</template>

<script>
export default {
  props:['details'],
  data(){
    return{
      panel: []
    }
  }
};
</script>
