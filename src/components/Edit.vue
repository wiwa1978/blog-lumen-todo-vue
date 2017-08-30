<template>
  <div class="edit container">
   <Alert v-if="alert" v-bind:message="alert" />
   <h1 class="page-header">Edit Todo</h1>
   <form v-on:submit="editTodo">
        <div class="well">
            <div class="form-group">
                <label>Todo name</label>
                <input type="text" class="form-control" placeholder="Todo name" v-model="todo.name"></input>
            </div>
            <div class="form-group">
                <label>Todo description</label>
                <input type="text" class="form-control" placeholder="Todo description" v-model="todo.description"></input>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" v-model="todo.completed">Mark as complete</label>
              <label>Item is {{todo.completed}} </label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Update Todo</button>
   </form>


 </div>
</template>

<script>
import Alert from './Alert';

export default {
  name: 'edit',
  data () {
    return {
        todo:{ },
        alert: ''
    }
  },
  methods:{
    fetchTodo(id){
      this.$http.get('http://lumen-todo.app/api/' + id)
            .then(function(response){
                this.todo = response.body;
      });
    },

    editTodo(e){
        if(!this.todo.name || !this.todo.description ){
            this.alert = "Please fill in all fields";
        } else {
            let editTodo = {
                name: this.todo.name,
                description: this.todo.description,
                completed: this.todo.completed
            }
            console.log(this.todo.completed);
            this.$http.put('http://lumen-todo.app/api/' + this.$route.params.id, editTodo)
                .then(function(response) {
                    this.$router.push({ path: '/', query: {alert: 'Todo item updated successfully'} });
                });

            e.preventDefault();

        }
        e.preventDefault();
    }
  },
  created: function() {
    this.fetchTodo(this.$route.params.id);
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
