import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos:[]
  },
  getters: {
  },
  mutations: {
    storeTodos(state,data){
      state.todos = data
    },
    storeTodo(state, data){
      const index = state.todos.findIndex(todo => todo.id === data.id) // achando o index do objeto passado por parametro que esta sendo atualizado ou modificado
      if(index >= 0){ // se for maior ou igual a 0 já tem no todos, nesse caso faz o splice saubstituindo o que esta la pelo update que esta sendo feito
        state.todos.splice(index, 1, data) // nesse caso o splice deleta o que esta la e insere o que esta em data
      } else{
        state.todos.push(data) // unshift adiciona no inicio e push adiciona no final
      }

      //
    },

    deleteTodo(state, id){
      const index = state.todos.findIndex(todo => todo.id === id) // procuro no state se tem o index passado por parametro, se retornar maior que 0 quer dizer que tem, nesse caso ele esclui
      if(index >= 0){
        state.todos.splice(index, 1) // nesse caso o splice so deleta onde tem o index achado
      }
    }

    
  
  },
  actions: {

    // Action para pegar os dados de tarefas cadastradas na api
    getTodos({commit}){ // action que retorna uma promise para comitar atraves da mutations storeTodos no state os dados da requisicao axios da api criada database.json, com 3 segundos do timeout simulando a demora da requisicao
      return new Promise((resolve) => {
        setTimeout(() => {
          return axios.get('http://localhost:3000/todos').then((response) =>{
            commit('storeTodos', response.data)
            resolve()
          })
        }, 1000 )
      })
    },

    // Action para adicinar a database.json, ou api, os dados da nova tarefa adicionada pelo usuario
    addTodo({commit}, data){
     return axios.post('http://localhost:3000/todos', data).then((response) => {
        commit('storeTodo', response.data)
      })
    },

    // Action para fazer update na api dos dados de tarefas ja cadastradas
    updateTodo({commit}, {id, data }){
       return axios.put(`http://localhost:3000/todos/${id}`, data).then((response) => {
        commit('storeTodo', response.data)
       }) // para fazer update se utiliza o put
      
    },
    

    deleteTodo({commit}, id){
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodo', id) // chamo mutations do vuex passando o nome da mutation e o valor de parametro para poder excluir 
      })
      
     
    }


  },
  modules: {
  }
})
