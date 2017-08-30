
<template>
  <div class="todo container">
   <h1 class="page-header">Manage Todo's</h1>
    <Alert v-if='alert' v-bind:message='alert' />
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in todos">
                    <td>{{ todo.id }}</td>
                    <td><span :class='{ taskComplete: todo.completed }'>{{ todo.name }}</span></td>
                    <td><span :class='{ taskComplete: todo.completed }'>{{ todo.description }}</span></td>
                    <td><span v-model="todo.completed">{{ completedText(todo.completed) }}</span></td>
                    <td>{{ timestamp(todo.created_at) }} </td>
                    <td>{{ timestamp(todo.updated_at) }}</td>
                    <td><router-link class="btn btn-info"v-bind:to="'show/' + todo.id ">Show</router-link></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
    import Alert from './Alert';

    export default {
      name: 'todo',
      data () {
        return {
            todos: [],
            alert: ''
        }
      },
      methods: {
        fetchTodos(){
            this.$http.get('http://lumen-todo.app/api')
                .then(function(response){
                    this.todos = response.body;
            });
        },
        completedText(value) {
            if (!value) {
              return "Not yet completed";
            }
            else return "Completed";
          },
        timestamp: function(value) {
          return moment(value).format("DD-MM-YYYY [at] hh:mm")
        }
      },
      created: function(){
        if (this.$route.query.alert) {
            this.alert=this.$route.query.alert;
        }
        this.fetchTodos();
      },
      components: {
        Alert
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .taskComplete {
        text-decoration: line-through;
    }
</style>
