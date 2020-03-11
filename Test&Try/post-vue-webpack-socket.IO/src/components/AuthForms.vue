<template>
    <v-tabs
      grow
      v-model="active"
      hide-slider
    >
      <v-tab
        
        key="1"
        ripple
      >
        Войти
      </v-tab>
      <v-tab
        key='2'
        ripple
      >
         Создать
      </v-tab>
      <v-tab-item
        key="1"
      >
            <sign-in></sign-in>
      </v-tab-item>
      <v-tab-item
        key='2'
      > 
      <sign-up></sign-up>
      </v-tab-item>
    </v-tabs>
</template>

<script>
import SignUp from '@/components/Forms/SignUp'
import SignIn from '@/components/Forms/SignIn'

export default {
  data() {
    return {
      active: null,
    }
  },
  components: {
    SignUp,
    SignIn
  }
}
</script>
