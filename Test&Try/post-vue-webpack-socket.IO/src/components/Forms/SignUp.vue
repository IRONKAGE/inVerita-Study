<template>
  <v-form v-model='isValid' ref='form' class='text-xs-center'>
    <v-text-field
      label='Логин'
      single-line
      v-model='username'
      :rules='usernameRules'
    ></v-text-field>
    <v-text-field
      label='Пароль'
      single-line
      v-model='password'
      :rules='passwordRules'
    ></v-text-field>
    <v-text-field
      label='Повторите пароль'
      single-line
      v-model='password2'
      :rules='password2Rules'
    ></v-text-field>
      <v-btn flat block @click='submit' :disabled='!isValid'>Зарегистрировать</v-btn>
      <p> {{ error }} </p>
  </v-form>
</template>

<script>
import { signUp } from '@/services/user'

export default {
  data() {
    return {
      isValid: false,
      username: '',
      usernameRules: [
        u => !!u || 'Введите логин',
        u => new RegExp(/^[a-zA-Z0-9_]{5,30}$/).test(u) || 'Логин может состоять из латинских символов, цифр и нижнего подчеркивания и быть длинной от 5 до 30 символов'
      ],
      password: '',
      passwordRules: [
        p => !!p || 'Введите пароль',
        p => new RegExp(/^[a-zA-Z0-9_]/).test(p) || 'Логин может состоять из латинских символов, цифр и нижнего подчеркивания'
      ],
      password2: '',
      password2Rules: [
        p => !!p || 'Повторите пароль',
        p => this.password === this.password2 || 'Пароли не совпадают'
      ],
      error: ''
    }
  },
  methods: {
    submit() {
      const { username, password } = this
      signUp({ username, password })
        .then(({data}) => this.$store.dispatch('setUser', data))
        .catch(e => this.error = e.response ? e.response.data : e)
    }
  }
}
</script>