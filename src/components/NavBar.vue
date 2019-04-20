<template>
  <nav>
    <v-navigation-drawer clipped fixed app v-model="drawer" class="teal lighten-5">
      <v-list>
        <v-list-tile  router to="/profile">
          <v-list-tile-action>
            <v-icon>tag_faces</v-icon>
          </v-list-tile-action>
          <v-list-tile-content v-if="currentUser">{{ currentUser.name }}</v-list-tile-content>
          <v-list-tile-content v-else>Newbie</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
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

    <v-toolbar app flat dark color="teal" clipped-left absolute>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <!-- <span>{{ title }}</span> -->
        <router-link to="/" tag="span" style="cursor: pointer">{{ title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        clearable
        v-on:keyup.enter="onSubmit"
        v-model="search"
        append-icon="search"
        label="Search"
        solo-inverted
      ></v-text-field>
      <div class="hidden-sm-and-down" v-for="item in toolbarItems" :key="item.title">
        <v-btn v-if="item.icon" flat :to="item.link">
          <span>{{ item.title }}</span>
          <v-icon right>{{ item.icon }}</v-icon>
        </v-btn>
        <v-btn v-else flat :to="item.link">{{ item.title }}</v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onSignOut">
          Logout
          <v-icon right dark>exit_to_app</v-icon>
        </v-btn>
      </div>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn flat icon v-on="on" class="hidden-md-and-up">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list v-for="item in toolbarItems" :key="item.title">
          <v-btn v-if="item.icon" flat :to="item.link">
            <span>{{ item.title }}</span>
            <v-icon right>{{ item.icon }}</v-icon>
          </v-btn>
          <v-btn v-else flat :to="item.link">{{ item.title }}</v-btn>
          <v-btn flat v-if="userIsAuthenticated" @click="onSignOut">
            Logout
            <v-icon right dark>exit_to_app</v-icon>
          </v-btn>
        </v-list>
      </v-menu>
    </v-toolbar>
  </nav>
</template>


<script>
// import Signup from './user/Signup'
// import Signin from './user/Signin'

export default {
  props: {},
  components: {
    // Signup,
    // Signin
  },
  data() {
    return {
      title: "Pathology",
      drawer: false,
      search: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
        ? this.$store.getters.currentUser
        : null;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.currentUser !== null &&
        this.$store.getters.currentUser !== undefined
      );
    },
    items() {
      let items = [
        { title: "Home", icon: "home", link: "/" },
        { title: "Contact", icon: "label", link: "/contact" },
        { title: "About", icon: "question_answer", link: "/about" }
      ];
      return items;
    },
    toolbarItems() {
      let items = [
        { title: "Sign In", link: "/signin", icon: "lock_open" },
        { title: "Sign Up", link: "/signup", icon: "face" }
      ];
      if (this.userIsAuthenticated) {
        items = [
          { title: "Profile", link: "/profile", icon: "person" }
          // { title: "Sign Out", icon: "exit_to_app" }
        ];
      }
      return items;
    }
  },
  methods: {
    onSubmit() {
      const maxLength = this.$store.getters.pictures.length;
      if (this.search === null) {
        return;
      } else if (this.search.toLowerCase() === "random") {
        this.search = Math.floor(Math.random() * maxLength);
      }

      if (parseInt(this.search) < maxLength) {
        let id = parseInt(this.search);
        if (id < 0) id = 0;
        this.$router.push("/picture/" + this.$store.getters.pictures[id][0]);
      } else {
        this.$router.push("/picture/" + this.search);
      }
      this.search = null;
    },
    onSignOut() {
      this.$store.dispatch("signOut");
    }
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
