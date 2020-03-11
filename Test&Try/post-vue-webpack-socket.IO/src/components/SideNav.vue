<template>
  <div>
    <v-btn flat block>
      <v-icon dark left>face</v-icon>{{ $store.state.username }}
    </v-btn>
    
    <v-divider></v-divider>
    <task-nav></task-nav>
    <task-list></task-list>
  </div>
</template>

<script>
import TaskNav from '@/components/SideNav/TaskNav'
import TaskList from '@/components/SideNav/TaskList'

export default {
  components: {
    TaskNav,
    TaskList
  }
}
</script>