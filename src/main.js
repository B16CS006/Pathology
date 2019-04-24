import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import { store } from './store'
import './firebase'
import AlertComponent from './shared/alert.vue'
import SingleInputDialogComponent from './shared/singleInputDialog.vue'

import { auth } from 'firebase'


Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('app-alert',AlertComponent)
Vue.component('single-input-dialog',SingleInputDialogComponent)

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
