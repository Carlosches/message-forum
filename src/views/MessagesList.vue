<template>
  <div class="center-div mt-10">
    <v-row>
      <v-card
        v-if="user.loggedIn"
        class="section-card px-5 ml-16"
        width="93vw"
        outlined
      >
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Mensajes</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Nuevo mensaje
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-textarea
                          v-model="editedItem.body"
                          label="Ingrese el nuevo mensaje"
                          filled
                          auto-grow
                        ></v-textarea>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >¿Está seguro de eliminar este usuario?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >Sí</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  getDoc,
  doc as docc,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

export default {
  name: "MessagesList",
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Crear nuevo mensaje" : "Editar mensaje";
    },
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.getAllMessages();
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Mensaje",
          align: "start",
          value: "body",
        },
        { text: "Comenzado por", value: "userName" },
        { text: "Última respuesta por", value: "lastResponse" },
        { text: "No Respuestas", value: "noMessages" },
      ],
      editedIndex: -1,
      editedItem: {
        body: "",
        lastName: "",
        email: "",
        validUntil: "",
      },
      defaultItem: {
        name: "",
        lastName: "",
        email: "",
        validUntil: "",
      },
      validUntilDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      users: [],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    getAllMessages() {
      const db = getFirestore();

      const q = query(collection(db, "messages"), where("parent", "==", true));

      getDocs(q)
        .then((doc) => {
          doc.docs.forEach((element) => {
            getDoc(docc(db, "users", element.data().userId))
              .then((userr) => {
                const nombre_usuario =
                  userr.data().name + " " + userr.data().lastName;

                console.log(element.data().replyMessages.length);

                let lastResponseId = "Sin respuestas";

                if (element.data().replyMessages.length > 0) {
                  lastResponseId =
                    element.data().replyMessages[
                      element.data().replyMessages.length - 1
                    ];
                }

                getDoc(docc(db, "messages", lastResponseId))
                  .then((last_message) => {
                    if (last_message.exists()) {
                      const userr2Id = last_message.data().userId;

                      getDoc(docc(db, "users", userr2Id))
                        .then((userr2) => {
                          const message = {
                            body: element.data().body,
                            userName: nombre_usuario,
                            lastResponse:
                              userr2.data().name + " " + userr2.data().lastName,
                            noMessages: element.data().replyMessages.length,
                          };

                          this.users.push(message);
                        })
                        .catch();
                    } else {
                      const message = {
                        body: element.data().body,
                        userName: nombre_usuario,
                        lastResponse: "--",
                        noMessages: element.data().replyMessages.length,
                      };

                      this.users.push(message);
                    }
                  })
                  .catch();
              })
              .catch();
          });
        })
        .catch();
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        //Object.assign(this.desserts[this.editedIndex], this.editedItem);
        console.log("hello");
        const auth = getAuth();
        const db = getFirestore();
        const messageId = uuidv4();
        setDoc(doc(db, "messages", messageId), {
          id: messageId,
          body: this.editedItem.body,
          createdAt: new Timestamp(),
          userId: auth.currentUser.uid,
          replyMessages: [],
        })
          .then(() => {
            console.log("llegue");
            this.$router.push("/messages");
          })
          .catch((error) => {
            this.error = error.message;
          });
      } else {
        console.log("f");
        this.desserts.push(this.editedItem);
      }
      this.close();
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