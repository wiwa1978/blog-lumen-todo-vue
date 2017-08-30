// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Todo from './components/Todo'
import About from './components/About'
import Add from './components/Add'
import TodoDetails from './components/TodoDetails'
import Edit from './components/Edit'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(vueResource)
Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path:'/', component: Todo},
        {path:'/about', component: About},
        {path:'/add', component: Add},
        {path:'/show/:id', component: TodoDetails},
        {path:'/edit/:id', component: Edit},
    ]
})

window.moment = require('moment');

/* eslint-disable no-new */
new Vue({
  router,
  data: {
    moment: moment
  },
  template: `
    <div id="app">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Todo App</a>
            </div>
            <ul class="nav navbar-nav">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><router-link to="/add">Add Todo</router-link></li>
            </ul>
        </div>
    </nav>
        <router-view></router-view>
    </div>
  `,
}).$mount('#app')
