<template>
 <div>
  <!-- Content -->
  <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
         
            <!-- Todo spinner -->
            <TodoSpinner v-if="loading" />
            <!--/ Todo spinner -->

          
              <!-- Todo form -->
                          <TodoForm />
                                        <!-- Todo items -->
                           <TodoItems v-if="$store.state.todos.length"/>
                                        
                                        <!-- Todo empty -->
                           <TodoEmpty v-else/>
                       
           
           
        </div>
    </div>
    <!--/ Content -->


 </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue';
import TodoSpinner from './components/TodoSpinner.vue';
import TodoItems from './components/TodoItems.vue';
import TodoEmpty from './components/TodoEmpty.vue';
//import axios from 'axios';
export default {
  name: 'App',
  components: {
    TodoForm,
    TodoSpinner,
    TodoItems,
    TodoEmpty
  },
  data(){
    return{
      loading: false
    }
  },
  created(){
    this.loading = true;
    this.$store.dispatch('getTodos').finally(() => {
    this.loading = false;
    });
   
  }
  /*created(){
    this.loading = true
    axios.get('http://localhost:3000/todos').then((response) => {
        setTimeout(()=>{this.$store.commit('storeTodos', response.data);
        this.loading = false}, 1000)
       //nesta linha de codigo estamos comitando os dados vindos da resposta da requisicao feita na api e passando para a state criada todos 
     // this.todos = response.data; // funcao que pega os dados da api criada database.json e salva a resposta da requisicao axios nos todos criados em data 
    })//.finally(() => {
      //setTimeout(()=> this.loading = false, 3000);
   // })
  }*/
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
