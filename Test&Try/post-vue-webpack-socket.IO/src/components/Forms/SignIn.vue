<template>
      <v-form v-model='isValid' ref='form' lazy-validation v-on:submit.prevent='submit'>
        <v-text-field
          label='Логин'
          v-model='username'
          single-line
          :rules='usernameRules'
        ></v-text-field>
        <v-text-field
          label='Пароль'
          single-line
          type='password'
          v-model='password'
          :rules='passwordRules'
        ></v-text-field>
        <v-btn flat block @click='submit' :disabled='!isValid'>Войти</v-btn>
        <p>{{ error }}</p>
      </v-form>
      
</template>

<script>
import { signIn } from '@/services/user'

export default {
  data() {
    return {
      isValid: false,
      username: '',
      usernameRules: [
        u => !!u || 'Введите логин'
      ],
      password: '',
      passwordRules: [
        p => !!p || 'Введите пароль'
      ],
      error: ''
    }
  },
  methods: {
    submit() {
        if (this.$refs.form.validate()) {
          signIn({
            username: this.username,
            password: this.password
          })
            .then(({data}) => {
              this.$store.dispatch('setUser', data)
            })
            .catch(e => {
              this.error = e.response ? e.response.data : e
            })
        }
    }
  }
}
</script>