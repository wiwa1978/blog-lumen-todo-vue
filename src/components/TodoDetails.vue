<template>
  <div class="tododetails container">
    <span class="pull-right">
        <router-link to="/" class="btn btn-default">Back</router-link>
        <router-link v-bind:to="'/edit/' + todo.id" class="btn btn-primary">Edit</router-link>
        <button class="btn btn-danger" v-on:click="deleteTodo(todo.id)">Delete</button>
    </span>
    <h1 class="page-header">Details</h1>

    <div class="well">
        <div class="form-group">
            <label>Todo name</label>
            <input type="text" class="form-control" readonly v-model='todo.name'></input>
        </div>
        <div class="form-group">
            <label>Todo description</label>
            <input type="text" class="form-control" readonly v-model='todo.description'></input>
        </div>
        <div class="form-group">
            <label>Completed</label>
            <input type="text" class="form-control" readonly v-model='completedText'></input>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'tododetails',
  data () {
    return {
        todo: ''
    }
  },
  methods: {
    fetchTodo(id){
        this.$http.get('http://lumen-todo.app/api/' + id)
            .then(function(response){
                this.todo = response.body;
        });
    },
    deleteTodo(id){
        this.$http.delete('http://lumen-todo.app/api/' + id)
            .then(function(response){
                this.$router.push({path: '/', query: {alert: "Todo deleted"}});
        });
    },

  },
  created: function() {
    this.fetchTodo(this.$route.params.id);
  },
  computed: {
    // a computed getter
    completedText: function () {
      if (!this.todo.completed){
        return "This item is not yet completed";
      }
      else return "This item is completed";
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
