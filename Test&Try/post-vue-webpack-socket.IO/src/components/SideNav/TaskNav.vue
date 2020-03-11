<template>
  <v-flex>
      <v-btn block flat
        @click.stop='openForm'
      >Создать задание
      </v-btn>
    <v-dialog v-model="newTaskForm" max-width="500px">
      <v-card>
        <v-card-title>
            <h4>Параметры задания</h4>
        </v-card-title>
        <v-card-text>
          <v-form ref='taskForm' v-model="newTask.isValid">
          <v-text-field
            v-model="newTask.title"
            :rules="newTask.titleRules"
            :counter="70"
            label='Название'
          ></v-text-field>
          <v-text-field
            v-model="newTask.word"
            label='Введите слова через пробел'
            :rules="newTask.wordsRules"
            @keyup.space='addWord'
          ></v-text-field>
        </v-form>
          <v-chip label color='teal' text-color='white' v-for='(word, i) in newTask.words' :key='i'>{{ word }}</v-chip>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" flat @click='createTask' :disabled='!newTask.isValid'>Создать</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="grey" flat @click.stop="newTaskForm=false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { create } from '@/services/task'
export default {
  data() {
    return {
      myTask: false,
      newTaskForm: false,
      newTask: {
        isValid: false,
        title: '',
        titleRules: [
          t => !!t.length || 'Укажите название',
          t => t.length < 70 || 'Название не должно превышать 70 символов'
        ],
        word: '',
        words: [],
        wordsRules: [
          w => this.newTask.words.length > 3 || 'Введите больше 3 слов'
        ]
      }
    }
  },
  methods: {
    openForm() {
      this.newTask.title = ''
      this.newTask.word = ''
      this.newTask.words = []
      this.newTaskForm = true
    },
    createTask() {
      create({ title: this.newTask.title, words: this.newTask.words })
        .then(({data}) => {
          this.myTask = data.task
          this.newTaskForm = false    
          console.log(data.task)
        })
        .catch(e => console.log(e.response ? e.response.data : e))
    },
    addWord() {
      if (!this.newTask.word.trim().length) return
      this.newTask.words.push(this.newTask.word.trim())
      this.newTask.word = ''
    }
  }
}
</script>
