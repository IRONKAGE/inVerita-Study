<template>
  <v-flex>
    <v-btn v-for='task in tasks' :key='task.id'>{{ task.title }}</v-btn>
  </v-flex>
</template>

<script>
import { getByAuthor } from '@/services/task'

export default {
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    getTasksByAuthor() {
      getByAuthor(this.$store.username)
        .then(({data}) => this.tasks = data.tasks)
        .catch(e => console.log(e.response ? e.response.data : e))
    }
  },
  created() {
    this.getTasksByAuthor()
  }
}
</script>
