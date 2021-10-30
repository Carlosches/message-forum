 <template>
  <div>
    <v-card>
      <v-navigation-drawer expand-on-hover fixed permanent  >
        <v-list>
          <v-list-item class="px-2" link @click="goToProfile()">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item @click="goToUsers()">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-android-messages</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mensajes</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-comment-account-outline </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mis mensajes</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>


<script>
export default {
    name:'NavBar',
    data(){
        return {

        }
    },
    methods:{
        goToUsers(){
            this.$router.push('/users');
        },
        goToProfile(){
            this.$router.push('/profile')
        }
    }
}
</script>
