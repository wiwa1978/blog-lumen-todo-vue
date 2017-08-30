<template>
  <div class="add container">
  <Alert v-if="alert" v-bind:message="alert" />
   <h1 class="page-header">Add Todo</h1>
   <form v-on:submit="addTodo">
        <div class="well">
            <div class="form-group">
                <label>Todo name</label>
                <input type="text" class="form-control" placeholder="Todo name" v-model="todo.name"></input>
            </div>
            <div class="form-group">
                <label>Todo description</label>
                <input type="text" class="form-control" placeholder="Todo description" v-model="todo.description"></input>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
   </form>


 </div>
</template>

<script>
import Alert from './Alert';

export default {
  name: 'add',
  data () {
    return {
        todo:{ },
        alert: ''
    }
  },
  methods:{
    addTodo(e){
        if(!this.todo.name || !this.todo.description ){
            this.alert = "Please fill in all fields";
        } else {
            let newTodo = {
                name: this.todo.name,
                description: this.todo.description,
                completed: false
            }
            this.$http.post('http://lumen-todo.app/api', newTodo)
                .then(function(response) {
                    this.$router.push({ path: '/', query: {alert: 'Todo item created successfully'} });
                });

            e.preventDefault();

        }
        e.preventDefault();
    }
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
