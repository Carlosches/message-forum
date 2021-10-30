<template>
  <v-app>
    <NavBar v-if="this.upgradeExceptionRoutes.indexOf($route.name) === -1" class="mr-n10"/>
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components:{NavBar},
  data(){
    return{
      upgradeExceptionRoutes: [
        'login',
      ] 
    }
  }
};
</script>
