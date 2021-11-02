<template>
  <div class="center-div mt-10">
    <v-row>
      <v-card
        v-if="user.loggedIn"
        class="section-card px-5 ml-16"
        width="93vw"
        outlined
      >
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :expanded.sync="expanded"
          :single-expand="singleExpand"
          show-expand
          @click:row="(item, slot) => expandRow(item, slot)"
        >
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
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Desea eliminar este mensaje?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" v-model="dialog" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <!-- -------------------------------------------------------------------------             -->
          <template v-slot:expanded-item="{ headers }">
            <td :colspan="headers.length">
              <v-data-table
                :headers="subheaders"
                :items="subitems"
                :hide-default-header="true"
                :hide-default-footer="true"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Respuestas</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog2" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Responder
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
                            Cancelar
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save2">
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete2" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Desea eliminar este mensaje?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancelar</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm2"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    v-model="dialog2"
                    @click="editItem2(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem2(item)"> mdi-delete </v-icon>
                </template>
                <template v-slot:no-data>
                  <h2>Este mensaje no tiene respuestas</h2>
                </template>
              </v-data-table>
            </td>
          </template>
          <!-- ------------------------------------------------------------------------------ -->
          <template v-slot:no-data>
            <v-btn color="primary" @click="getAllMessages"> Reset </v-btn>
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
  deleteDoc,
  //orderBy,
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
      expanded: [],
      singleExpand: true,

      dialog: false,
      dialogDelete: false,
      dialog2: false,
      dialogDelete2: false,

      headers: [
        {
          text: "Mensaje",
          align: "start",
          value: "body",
          width: "40%",
        },
        { text: "Comenzado por", value: "userName", width: "20%" },
        { text: "Última respuesta por", value: "lastResponse", width: "20%" },
        { text: "No Respuestas", value: "noMessages", width: "10%" },
        { text: "Acciones", value: "actions", width: "10%" },
        { text: "", value: "data-table-expand", align: " d-none" },
        { text: "Id", value: "id", align: " d-none" },
      ],

      subheaders: [
        {
          text: "Mensaje",
          align: "start",
          value: "body",
        },
        { text: "Por", value: "userName" },
        { text: "Acciones", value: "actions" },
        { text: "Id", value: "id", align: " d-none" },
      ],
      parentMessage: {
        referenceId: "",
        referenceBody: "",
      },

      editedIndex: -1,
      editedItem: {
        id: "",
        body: "",
        userName: "",
        lastResponse: "",
        noMessages: "",
      },
      defaultItem: {
        id: "",
        body: "",
        userName: "",
        lastResponse: "",
        noMessages: "",
      },
      validUntilDate: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      users: [],
      subitems: [],
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

  methods: {
    getAllMessages() {
      this.users = [];
      const db = getFirestore();

      const q = query(collection(db, "messages"), where("parent", "==", true));

      getDocs(q)
        .then((doc) => {
          doc.docs.forEach((element) => {
            getDoc(docc(db, "users", element.data().userId))
              .then((userr) => {
                const nombre_usuario = //"hola";
                  userr.data().name + " " + userr.data().lastName;

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
                            id: element.data().id,
                            body: element.data().body,
                            userName: nombre_usuario,
                            lastResponse:
                              userr2.data().name + " " + userr2.data().lastName,
                            noMessages: element.data().replyMessages.length,
                            posted: element.data().createdAt,
                          };
                          //console.log(message.id);

                          this.users.push(message);
                        })
                        .catch();
                    } else {
                      const message = {
                        id: element.data().id,
                        body: element.data().body,
                        userName: nombre_usuario,
                        lastResponse: "--",
                        noMessages: element.data().replyMessages.length,
                        posted: element.data().createdAt,
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
      //console.log(this.users);
    },

    editItem(item) {
      //console.log("hello");
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = this.users[this.editedIndex];
      this.dialog = true;
    },

    editItem2(item) {
      //console.log("hello");
      this.editedIndex = this.subitems.indexOf(item);
      this.editedItem = this.subitems[this.editedIndex];
      this.dialog2 = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = this.users[this.editedIndex];
      this.dialogDelete = true;
    },

    deleteItem2(item) {
      this.editedIndex = this.subitems.indexOf(item);
      this.editedItem = this.subitems[this.editedIndex];
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
      this.delete();
    },

    deleteItemConfirm2() {
      this.closeDelete();
      this.delete2();
    },

    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.dialogDelete2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    expandRow(item, slot) {
      this.subitems = [];
      this.parentMessage.referenceId = item.id;
      this.parentMessage.referenceBody = item.body;
      //console.log(this.referenceId);

      slot.expand(!slot.isExpanded);

      const db = getFirestore();

      getDoc(doc(db, "messages", item.id)).then((message) => {
        message.data().replyMessages.forEach((submessage) => {
          getDoc(doc(db, "messages", submessage)).then((submessage2) => {
            getDoc(doc(db, "users", submessage2.data().userId)).then(
              (userr2) => {
                const m = {
                  id: submessage2.data().id,
                  body: submessage2.data().body,
                  userName: userr2.data().name + " " + userr2.data().lastName,
                  posted: submessage2.data().createdAt,
                };

                this.subitems.push(m);
              }
            );
          });
        });
      });
    },

    delete() {
      this.users = [];
      const auth = getAuth();
      const db = getFirestore();

      const user_id = auth.currentUser.uid;
      const message_delete = this.editedItem.id;

      getDoc(doc(db, "messages", message_delete)).then((message) => {
        if (
          message.data().replyMessages.length < 1 &&
          user_id == message.data().userId
        ) {
          getDoc(doc(db, "users", user_id)).then((user) => {
            const arr = user.data().messages;
            const index = arr.indexOf(message_delete);
            arr.splice(index, 1);
            setDoc(doc(db, "users", user_id), {
              id: user_id,
              email: user.data().email,
              name: user.data().name,
              lastName: user.data().lastName,
              messages: arr,
            }).then();
          });

          deleteDoc(doc(db, "messages", message.data().id)).then(() => {
            this.getAllMessages();
          });
        } else {
          console.log("negativo");
        }
      });
    },

    delete2() {
      this.subitems = [];
      const auth = getAuth();
      const db = getFirestore();

      const user_id = auth.currentUser.uid;
      const message_delete = this.editedItem.id;

      const parent_message = this.parentMessage.referenceId;
      //const parent_body = this.parentMessage.referenceBody;

      getDoc(doc(db, "messages", message_delete)).then((message) => {
        if (
          message.data().replyMessages.length < 1 &&
          user_id == message.data().userId
        ) {
          getDoc(doc(db, "users", user_id)).then((user) => {
            const arr = user.data().messages;
            const index = arr.indexOf(message_delete);
            arr.splice(index, 1);

            setDoc(doc(db, "users", user_id), {
              id: user_id,
              email: user.data().email,
              name: user.data().name,
              lastName: user.data().lastName,
              messages: arr,
            }).then(() => {
              getDoc(doc(db, "messages", parent_message)).then((pMessage) => {
                const arr = pMessage.data().replyMessages;
                const index = arr.indexOf(message_delete);
                arr.splice(index, 1);

                setDoc(doc(db, "messages", parent_message), {
                  id: parent_message,
                  body: pMessage.data().body,
                  createdAt: pMessage.data().createdAt,
                  userId: pMessage.data().userId,
                  replyMessages: arr,
                  parent: true,
                }).then(() => {
                  deleteDoc(doc(db, "messages", message.data().id)).then(() => {
                    this.getAllMessages();
                  });
                });
              });
            });
          });
        } else {
          console.log("negativo");
        }
      });
    },

    save() {
      this.users = [];

      const auth = getAuth();
      const db = getFirestore();
      const user_id = auth.currentUser.uid;
      let messageId = "";
      let messageBody = "";

      if (this.editedIndex > -1) {
        messageId = this.editedItem.id;
        messageBody = this.editedItem.body;

        getDoc(doc(db, "messages", messageId)).then((message) => {
          if (user_id == message.data().userId) {
            setDoc(doc(db, "messages", messageId), {
              id: messageId,
              body: messageBody,
              createdAt: Timestamp.fromDate(new Date()),
              userId: auth.currentUser.uid,
              replyMessages: message.data().replyMessages,
              parent: true,
            })
              .then(() => {
                this.getAllMessages();
              })
              .catch((error) => {
                this.error = error.message;
              });
          } else {
            console.log("negativo");
          }
        });
      } else {
        messageId = uuidv4();

        setDoc(doc(db, "messages", messageId), {
          id: messageId,
          body: this.editedItem.body,
          createdAt: Timestamp.fromDate(new Date()),
          userId: auth.currentUser.uid,
          replyMessages: [],
          parent: true,
        })
          .then(() => {
            //this.$router.push("/messages");
            //this.getAllMessages();
          })
          .catch((error) => {
            this.error = error.message;
          });

        getDoc(doc(db, "users", auth.currentUser.uid)).then((user) => {
          const arr = user.data().messages;
          arr.push(messageId);

          setDoc(doc(db, "users", auth.currentUser.uid), {
            id: auth.currentUser.uid,
            email: user.data().email,
            name: user.data().name,
            lastName: user.data().lastName,
            messages: arr,
          })
            .then(() => {
              //this.$router.push("/messages");
              this.getAllMessages();
            })
            .catch((error) => {
              this.error = error.message;
            });
        });
      }

      this.close();
    },

    save2() {
      this.users = [];

      const auth = getAuth();
      const db = getFirestore();
      const user_id = auth.currentUser.uid;
      let messageId = "";
      let messageBody = "";

      if (this.editedIndex > -1) {
        messageId = this.editedItem.id;
        messageBody = this.editedItem.body;

        getDoc(doc(db, "messages", messageId)).then((message) => {
          if (user_id == message.data().userId) {
            setDoc(doc(db, "messages", messageId), {
              id: messageId,
              body: messageBody,
              createdAt: Timestamp.fromDate(new Date()),
              userId: auth.currentUser.uid,
              replyMessages: message.data().replyMessages,
              parent: false,
            })
              .then(() => {
                this.getAllMessages();
              })
              .catch((error) => {
                this.error = error.message;
              });
          } else {
            console.log("negativo");
          }
        });
      } else {
        messageId = uuidv4();

        const parent_message = this.parentMessage.referenceId;
        const parent_body = this.parentMessage.referenceBody;

        setDoc(doc(db, "messages", messageId), {
          id: messageId,
          body: this.editedItem.body,
          createdAt: Timestamp.fromDate(new Date()),
          userId: auth.currentUser.uid,
          replyMessages: [],
          parent: false,
        })
          .then(() => {
            getDoc(doc(db, "messages", parent_message)).then((message) => {
              const arr = message.data().replyMessages;
              arr.push(messageId);

              setDoc(doc(db, "messages", parent_message), {
                id: parent_message,
                body: parent_body,
                createdAt: Timestamp.fromDate(new Date()),
                userId: auth.currentUser.uid,
                replyMessages: arr,
                parent: true,
              })
                .then(() => {
                  //this.$router.push("/messages");
                  this.getAllMessages();
                })
                .catch((error) => {
                  this.error = error.message;
                });
            });
          })
          .catch((error) => {
            this.error = error.message;
          });

        getDoc(doc(db, "users", auth.currentUser.uid)).then((user) => {
          const arr = user.data().messages;
          arr.push(messageId);

          setDoc(doc(db, "users", auth.currentUser.uid), {
            id: auth.currentUser.uid,
            email: user.data().email,
            name: user.data().name,
            lastName: user.data().lastName,
            messages: arr,
          })
            .then(() => {
              //this.$router.push("/messages");
              //this.getAllMessages();
            })
            .catch((error) => {
              this.error = error.message;
            });
        });
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