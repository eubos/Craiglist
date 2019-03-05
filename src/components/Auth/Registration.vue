<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                @keydown.enter="onSubmit"
              ></v-text-field>
              <v-text-field
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                @click:append="show1 = !show1"
                prepend-icon="lock"
                name="password"
                hint="At least 6 characters"
                label="Password"
                :type="show1 ? 'text' : 'password'"
                v-model="password"
                :rules="passwordRules"
                counter
                @keydown.enter="onSubmit"
              ></v-text-field>
              <v-text-field
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
                @click:append="show2 = !show2"
                prepend-icon="lock"
                name="confirm-password"
                label="Confirm Password"
                :type="show2 ? 'text' : 'password'"
                :counter= this.password.length
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                @keydown.enter="onSubmit"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >Create account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    data () {
      return {
        show1: false,
        show2: false,
        email: '',
        password: '',
        confirmPassword: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => emailRegex.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
        ],
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v === this.password || 'Password should match'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('registerUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
        }
      }
    }
  }
</script>
