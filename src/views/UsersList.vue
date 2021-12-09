<template>
<div class="center-div mt-10">
        <v-row>
          <!-- v-if="user.loggedIn" -->
          <v-card  class="section-card px-5 ml-16" width="93vw" outlined>
            <v-card-title>
              <v-spacer/>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="users"
              :search="search"
            >
            
            <template v-slot:top>
              <v-toolbar
                flat>
                <v-toolbar-title>Users</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit password</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
            </template>


        <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <h1>There is no data</h1>
    </template>
            </v-data-table>
          </v-card>
        </v-row>
</div>
  
</template>

<script>

import { mapGetters } from "vuex";
// import { collection, getDocs } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
export default {
    name:'UsersList',  
    data () {
      return {
        dialog: false,
      dialogDelete: false,
      editedIndex: -1,
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'start',
            value: 'name',
          },
          { text: 'Apellido', value: 'lastName' },
          { text: 'Email', value: 'email' },
          { text: 'Password', value: 'password' },
           { text: 'Actions', value: 'actions', sortable: false }
        ],
        validUntilDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        users: [
          {name:"Carlos",
          lastName:"Restrepo",
          email:"ccc@ggg.com@",
          password:"sdaknsoini12i2"
          }
        ],
        editedItem:{
          password:""
        },
        defaultItem:{
          password:""
        }
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: "user"
      }),
    },
    created () {
      this.getAllUsers();
    },

    methods: {
      editItem(item){
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      save(){
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
       deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      deleteItemConfirm () {
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      },

     getAllUsers() {
      //  this.users=[];
      // const db = getFirestore();

      // const q = collection(db, "users");

      // getDocs(q)
      //   .then((doc) => {
      //     doc.docs.forEach((element) => {
      //       var currentuser={
      //         name: element.data().name,
      //         lastName : element.data().lastName,
      //         email : element.data().email,
      //         noMessages: element.data().messages? element.data().messages.length: 0,
      //       };
      //       this.users.push(currentuser);
      //     });
      //   })
      //   .catch();
      //console.log(this.users);
    }
      
    },
  }
</script>
<style>
.center-div{
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}
</style>