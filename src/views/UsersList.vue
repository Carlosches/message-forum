<template>
<div class="center-div mt-10">
        <v-row>
          <v-card v-if="user.loggedIn" class="section-card px-5 ml-16" width="93vw" outlined>
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
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Añadir usuario
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
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
                              v-model="editedItem.name"
                              label="Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.lastName"
                              label="Apellido"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.email"
                              label="email"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                          <v-date-picker v-model="validUntilDate"/>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
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
                    <v-card-title class="text-h5">¿Está seguro de eliminar este usuario?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sí</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
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
              <v-btn
                color="primary"
                @click="initialize"
              >
                Reset
              </v-btn>
            </template>
            </v-data-table>
          </v-card>
        </v-row>
</div>
  
</template>

<script>

import { mapGetters } from "vuex";
export default {
    name:'UsersList',
     computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Añadir usuario' : 'Editar usuario'
      },
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: "user"
      }),
     },    
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'start',
            value: 'name',
          },
          { text: 'Apellido', value: 'lastName' },
          { text: 'Email', value: 'email' },
          { text: 'No Mensajes', value: 'noMessages' },
          { text: 'Valido hasta', value: 'validUntil' },
          { text: 'Activo', value: 'active' },
        ],
        editedIndex: -1,
        editedItem: {
          name: '',
          lastName: '',
          email: '',
          validUntil:'',
        },
        defaultItem: {
          name: '',
          lastName: '',
          email: '',
          validUntil:'',
        },
        validUntilDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        users: [
          {
            name: 'Carlos ',
            lastName: 'Restrepo',
            email: 'cr1212@gmail.com',
            noMessages: 2,
            validUntil : '20/12/2021',
            active: true
          },
          {
            name: 'Felipe',
            lastName: 'Sanchez',
            email: 'felipe@gmail.com',
            noMessages: 3,
            validUntil : '12/11/2021',
            active: false
          },
          {
            name: 'Andres',
            lastName: 'Ruiz',
            email: 'ruiz@gmail.com',
            noMessages: 8,
            validUntil : '04/11/2022',
            active: true
          },
          {
            name: 'Carlos ',
            lastName: 'Restrepo',
            email: 'cr1212@gmail.com',
            noMessages: 2,
            validUntil : '20/12/2021',
            active: true
          },
          {
            name: 'Felipe',
            lastName: 'Sanchez',
            email: 'felipe@gmail.com',
            noMessages: 3,
            validUntil : '12/11/2021',
            active: false
          },
          {
            name: 'Andres',
            lastName: 'Ruiz',
            email: 'ruiz@gmail.com',
            noMessages: 8,
            validUntil : '04/11/2022',
            active: true
          },
          {
            name: 'Carlos ',
            lastName: 'Restrepo',
            email: 'cr1212@gmail.com',
            noMessages: 2,
            validUntil : '20/12/2021',
            active: true
          },
          {
            name: 'Felipe',
            lastName: 'Sanchez',
            email: 'felipe@gmail.com',
            noMessages: 3,
            validUntil : '12/11/2021',
            active: false
          },
          {
            name: 'Andres',
            lastName: 'Ruiz',
            email: 'ruiz@gmail.com',
            noMessages: 8,
            validUntil : '04/11/2022',
            active: true
          },
          {
            name: 'Carlos ',
            lastName: 'Restrepo',
            email: 'cr1212@gmail.com',
            noMessages: 2,
            validUntil : '20/12/2021',
            active: true
          },
          {
            name: 'Felipe',
            lastName: 'Sanchez',
            email: 'felipe@gmail.com',
            noMessages: 3,
            validUntil : '12/11/2021',
            active: false
          },
          {
            name: 'Andres',
            lastName: 'Ruiz',
            email: 'ruiz@gmail.com',
            noMessages: 8,
            validUntil : '04/11/2022',
            active: true
          },
        ],
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

    created () {
      this.initialize()
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      
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