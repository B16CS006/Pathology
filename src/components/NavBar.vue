<template>
  <nav>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.mdAndUp" fixed app v-model="drawer" class="teal lighten-5">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>tag_faces</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ user }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list >
        <v-list-tile v-for="item in items" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app flat dark color="teal" :clipped-left="$vuetify.breakpoint.mdAndUp">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <!-- <span>{{ title }}</span> -->
        <router-link to="/" tag="span" style="cursor: pointer">{{ title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <input placeholder="Search" type="text">
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <!-- <Signin></Signin> -->
      <!-- <Signup></Signup> -->
      <v-btn flat to='/signin'>Sign In</v-btn>
      <v-btn flat to='/signup'>Sign Up</v-btn>
      <v-btn flat>
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>


<script>
// import Signup from './user/Signup'
// import Signin from './user/Signin'

export default {
  props: {},
  components:{
    // Signup,
    // Signin
  },
  data() {
    return {
      title: "Pathology",
      drawer: false,
      user: "username",
      items: [
        { title: "Home", icon: "home", link: "/" },
        { title: "Contact", icon: "label", link: "/contact" },
        { title: "About", icon: "question_answer", link: "/about" }
      ]
    };
  }
};
</script>


<style scoped>
input {
  color: rgb(87, 87, 87);
  background: white;
  padding: 8px;
  width: 400px;
  border-radius: 8px;
  font-size: 16px;
  font-style: italic;
}
</style>
