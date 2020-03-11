<template>
 <v-card flat>
    <v-card-title>
      <h3>Список заданий</h3>
        <v-btn flat icon color="teal lighten-3" @click='updateList'>
          <v-icon>cached</v-icon>
        </v-btn>
      <v-spacer></v-spacer>
      <v-flex xs3>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
      </v-flex>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tasks"
      :search="search"
      no-data-text='Задания отсутствуют'
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <tr class='tr-hover' @click='$router.push({ path: `/g-${props.item._id}`})'>
          <td>{{ props.item.title }}</td>
          <!-- <td class="text-xs-right">{{ props.item.players.toString() }}</td> -->
          <td class="text-xs-right">{{ props.item.author }}</td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Поиск по "{{ search }}" не дал результатов.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAll } from '@/services/task'
export default {
  data() {
    return {
      tasks: [],
      search: '',
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        {
          text: 'Создатель',
          align: 'right',
          sortable: false,
          value: 'author'
        }
      ]
    }
  },
  methods: {
    updateList() {
      getAll()
        .then(({data}) => this.tasks = data.tasks)
        .catch(e => console.log(e.response ? e.response.data : e ))
    }
  },
  created() {
    this.updateList()
  }
}
</script>

<style>
  .tr-hover {
    cursor: pointer;
  }
</style>