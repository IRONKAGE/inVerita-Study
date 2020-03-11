<template v-if='words'>
  <v-card flat style='border: 1px solid #ccc;'>
    <v-card-text style=' min-height: 380px'>
      {{ text }}
    </v-card-text>
    <v-card-text class='text-xs-center ma-0 pa-0'>
       <template v-if='words.length'>
        <v-chip label :color='isValid ? "green" : "grey"' text-color='white'>{{ words[0] }}</v-chip>
       </template>
       <template v-else>
         <h3>Все слова использованы!</h3>
       </template>

    </v-card-text>
    <v-card-actions>
      <v-flex xs12>
      <template v-if='words.length'>
      <v-form v-model='isValid'>
        <v-text-field 
          label='Написать предложение'
          v-model='sentence'
          :rules='sentenceRules'
        ></v-text-field>
        <v-btn :disabled='!isValid' flat block @click='nextSentence'>Отправить</v-btn>
      </v-form>
      </template>
      <template v-else>
        <v-btn block color='primary' @click='createPost'>Завершить</v-btn>
      </template>
      </v-flex>
    </v-card-actions>
  </v-card>
</template> 

<script>
import { getById } from '@/services/task'
import { create } from '@/services/post'

export default {
  data() {
    return {
      task: null,
      isValid: false,
      words: [],
      sentence: '',
      sentenceRules: [
        s => s.split(/[ ,?!.]+/).map(w => w.toLowerCase().trim()).includes(this.words[0].toLowerCase().trim()) || 'Сочините предложение со словом ' + this.words[0]
      ],
      nextWord: '',
      text: ''
    }
  },
  methods: {
    getTask() {
      getById(this.$route.params.taskId)
        .then(({data}) => {
          this.task = data.task
          this.words = data.task.words
        })
        .catch(e => console.log(e.response ? e.response.data : e ))
    },
    createPost() {
      create({ task: this.task, text: this.text })
        .then(({data}) => this.$router.push({ path: '/' }))
        .catch(e => console.log(e.response ? e.response.data : e ))
    },
    nextSentence() {
      this.sentence += ['?', '!', '.'].includes(this.sentence.slice(-1)) ? ' ' : '. '
      this.text += this.sentence
      this.sentence = ''
      
      if (this.words.length) {
        this.words.shift()
      }
    }
  },
  created() {
    this.getTask()
  }
}
</script>
