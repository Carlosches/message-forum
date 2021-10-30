<template>
<div class="center-div mt-10">
        <v-row>
          <v-card class="section-card px-5 ml-16" width="93vw" outlined>
            <v-card-title>
              <h2>Users</h2>
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
            ></v-data-table>
          </v-card>
        </v-row>
</div>
  
</template>

<script>
export default {
    name:'UsersList',
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
  }
</script>
<style>
.center-div{
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}
</style>