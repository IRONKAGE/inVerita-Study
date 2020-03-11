<template>
  <v-toolbar dense color='cyan darken-2' dark flat>
    <!-- <v-toolbar-side-icon to='/'></v-toolbar-side-icon> -->
    <v-toolbar-title style='border-right: 1px solid #b3d4fc;' class='pr-3'>R3B</v-toolbar-title>
    <v-btn flat to='/'>Посты</v-btn>
    <v-btn v-if='$store.state.token' flat to='/tasks'>Задания</v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if='$store.state.token'>
      <v-btn 
        flat to='/logout'
      >Выход</v-btn>
    </v-toolbar-items>
  </v-toolbar>  
</template>

<script>
export default {

}
</script>

