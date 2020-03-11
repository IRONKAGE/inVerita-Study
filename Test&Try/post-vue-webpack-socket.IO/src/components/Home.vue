<template>
  <v-flex xs12>
    <v-card v-for='post in posts' :key='post.id' flat style='border: 1px solid #ccc' class='ma-2'>
      <v-card-title>
        <h4>Задание: {{ post.task.title }}</h4> <v-spacer></v-spacer><v-btn color='black' dark small>От {{ post.author }}</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        {{ post.text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat small>
          Автор задания: {{ post.task.author }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { getAll } from '@/services/post'
export default {
  data() {
    return {
      posts: []
    }
  },
  methods: {
    getPosts() {
      getAll()
        .then(({data}) => this.posts = data.posts)
        .catch(e => console.log(e.response ? e.response.data : e))
    }
  },
  created() {
    this.getPosts()
  }
}
</script>