<template>
  <div class="center-div mt-10">
    <v-row>
      <v-card
        v-if="user.loggedIn"
        class="section-card px-5 ml-16"
        width="93vw"
        outlined
      >
        <v-card-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Users</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
export default {
  name: "UsersList",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "name",
        },
        { text: "Apellido", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "No Mensajes", value: "noMessages" },
      ],
      validUntilDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      users: [],
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      this.users = [];
      const db = getFirestore();
      const q = collection(db, "users");
      getDocs(q)
        .then((doc) => {
          doc.docs.forEach((element) => {
            var currentuser = {
              name: element.data().name,
              lastName: element.data().lastName,
              email: element.data().email,
              noMessages: element.data().messages
                ? element.data().messages.length
                : 0,
            };
            this.users.push(currentuser);
          });
        })
        .catch();
      //console.log(this.users);
    },
  },
};
</script>
<style>
.center-div {
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}
</style>