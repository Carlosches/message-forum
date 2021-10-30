<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row class="fill-height">
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 blue--text" >Iniciar sesión</h1>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="blue lighten-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="blue lighten-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-3">
                        <v-btn rounded color="blue lighten-2" dark @click="sigIn()">Iniciar sesión</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" sm="6" class="blue lighten-2">
                      <v-card-text class="white--text mt-8"> 
                        <h1 class="text-center display-1">Si no tienes una cuenta, registrate!</h1>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined color="white" @click="step+=1">Registrarse</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue lighten-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Iniciar sesión</h1>
                        <h4
                          class="text-center"
                        >Si ya tienes una cuenta, inicia sesión con tu usuario y contraseña</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Ir al inicio de sesión</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 blue--text ">Crear cuenta</h1>
                        <div class="text-center mt-4">
                          
                        </div>
                        <v-form>
                          <v-text-field
                            label="Nombre"
                            name="Name"
                            prepend-icon="mdi-account"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Apellido"
                            name="lastName"
                            prepend-icon="mdi-account-details-outline "
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="correo"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="teal accent-3"
                          />

                          <v-text-field
                            id="password"
                            label="contraseña"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="blue lighten-2 mb-4" dark>Registrarse</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'Login',
    data: () => ({
      expandOnHover: false,
      step:1
    }),
    methods:{
      sigIn(){
        this.$router.push('/users');
      }
    }
  }
</script>
