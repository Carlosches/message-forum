 <template>
  <div>
    <v-card v-if="user.loggedIn">
      <v-navigation-drawer expand-on-hover fixed permanent>
        <v-list>
          <v-list-item class="px-2" link @click="goToProfile()">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/women/85.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                user.loggedIn ? user.data.email : ""
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item @click="goToUsers()">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item @click="goToMessages()">
            <v-list-item-icon>
              <v-icon>mdi-android-messages</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mensajes</v-list-item-title>
          </v-list-item>

          <v-list-item @click="singOutUser()">
            <v-list-item-icon>
              <v-icon>mdi-logout </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "NavBar",
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {};
  },
  methods: {
    goToUsers() {
      this.$router.push("/users");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToMessages() {
      this.$router.push("/messages");
    },
    singOutUser() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>
