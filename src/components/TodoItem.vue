<template>
    <div class="bg-gray-300 rounded-sm">
                    <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
                        <div class="flex items-center justify-center mr-2">
                           <!-- :class verifica se o isCompleted for true ele coloca a classe verde no botao de check se for falso ele deixa cinza-->
                           <button :class="{ 
                                     'text-green-600' : isCompleted,
                                    'text-gray-400' : !isCompleted
                            }"   
                            @click="onCheckClick()"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                        </div>

                        <div class="w-full">
                            <input 
                                
                                type="text"
                                placeholder="Digite a sua tarefa"
                                :value="todo.title"
                                class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
                                @keyup.enter="updateAlternativo"
                            > <!-- @keyup.enter chama o metodo onTitleChange-->
                        </div>

                        <div class="ml-auto flex items-center 
justify-center">
                            <button 
                            @click="delTodo()"
                            class="focus:outline-none" >
                                <svg
                                    class="ml-3 h-4 w-4 text-gray-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
</template>

<script>
    export default{
        name: 'TodoItem',
        props:{
            todo:{
                type: Object,
                default: () => ({}), // faz um retorno de objeto inteiro, com isso da pra saber se esta ou nao completa a todo
            }
        },

        data(){
            return{
                title: this.todo.title,
                isCompleted: this.todo.completed
            }
        },

        methods:{
            // Método que fará o update dos dados na api e consequentemente no state, que vai pegar as tarefas cadastradas na api
            update(){
                const payload = {
                    id: this.todo.id,
                    data:{
                        title: this.title,
                        completed: this.isCompleted
                    }
                }
                this.$store.dispatch('updateTodo', payload)
               

            },

            // toggle para o check, onde modifica o valor da variavel isCompleted que faz o controle da class se fica ver marcada ou cinza desmarcada, e chama o metodo de update na api também o que modifica consequentemente a state com os dados da tarefa que são mostrados na pagina
            onCheckClick(){
                this.isCompleted = !this.isCompleted; // não modificar no props, melhor usar o isCompleted do data para manipular
                this.update()    
            },


            delTodo(){    
                this.$store.dispatch('deleteTodo', this.todo.id)
            },

         

            // METODO ALTERNATIVO
            updateAlternativo($event){
                const newTitle = $event.target.value
                if(!newTitle){
                    return
                }
                const payload = {
                    id: this.todo.id,
                    data: {
                        title: newTitle,
                        completed: this.isCompleted
                    },
                    
                }
                this.$store.dispatch('updateTodo', payload)

              
            },
                

        }
    }

</script>