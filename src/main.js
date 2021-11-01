import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import store from './store';

const firebaseConfig = {
  apiKey: "AIzaSyDZzmEjDwZ1t8d9raoaZwcsFHaTgPa9OTg",
  authDomain: "forum-messages.firebaseapp.com",
  projectId: "forum-messages",
  storageBucket: "forum-messages.appspot.com",
  messagingSenderId: "260849602781",
  appId: "1:260849602781:web:7fb2128e5f7c626f744b34",
  measurementId: "G-2WFLTE9K6C"
}

initializeApp(firebaseConfig);
getAuth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
