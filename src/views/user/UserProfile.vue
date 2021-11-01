<template>
<v-container fluid>
    <v-row style="height: 70vh;" class="text-center" align="center" justify="center">
      <v-col>
        <div class="d-inline-flex justify-center">
          <v-card v-if="user" class="pa-5" outlined>
            <v-container fluid>
              <v-row align="center" justify="center">
                  <div slot="activator">
                    <v-avatar class="avatar-profile ml-1 justify-center" size="105">
                      <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                    </v-avatar>
                  </div>
              </v-row>
              <v-row>
                <v-col>
                  <!--<h2 class="text-center">{{ this.$store.state.user.firstName }} {{ this.$store.state.user.lastName }}</h2>-->
                  <h2 class="text-center"> Sandra Adams </h2>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-chip @click="editProfile" small>
                  Edit profile <v-icon class="icon ml-2" x-small>fa-pen</v-icon>
                </v-chip>
              </v-row>
              <v-divider class="my-7"/>
              <v-row align="center" justify="center">
                  <p class="mb-1">
                    <!--<b>Username:</b> {{ this.$store.state.user.username }}<br>
                    <b>Automation Token:</b> {{ this.$store.state.user.details.automationToken }}-->
                    <b>Username:</b> sand<br>
                    <b>email:</b> san2@gmail.com

                  </p>
              </v-row>
            </v-container>
          </v-card>
           </div>
        </v-col>
    </v-row>
</v-container>
 
</template>
<script>


  export default {
    name:"UserProfile",
    
    data: () =>({

    }),
    methods:{
      
    }
  }

</script>
<style>
.center-div{
  margin-left: 80px;
  text-align: center;
}
</style>