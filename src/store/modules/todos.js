import axios from 'axios'
import db from '../../components/firebaseInit'
var net = require('net');
//alert('aaaaaa');
const state = {
    todos: []
};

const getters = {
    allTodos:(state) => state.todos
};

const actions = {
    async fetchTodos({commit})
    {

        var dArr=[];

        var socket = io("http://localhost:8000"); // TIP: io() with no args does auto-discovery
        //turn off debug
         //io.set('log level', 1);
        socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
            socket.emit('getCities', '*', function(cityArr) { // args are sent in order to acknowledgement function
                cityArr.forEach(doc => {
                    const city = {
                        'id': doc.ID,
                        'title': doc.Name,
                        'completed': true
                    }
                    //console.log(city);
                    dArr.push(city);             
                });
            });
        });
        commit('setTodos', dArr);
    },
    async addTodo({commit}, title){
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false});

        commit('newTodo', response.data);
    },
    async deleteTodo({commit}, id){
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos({commit}, e){
        //Get selected number
        const limit = parseInt(
            e.target.options[e.target.options.selectedIndex].innerText
            );
        
        const response = await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', response.data);
        //console.log(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        
    },
    async updateTodo({commit}, updTodo){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,updTodo);
        
        commit('updateTodo', response.data);
    },
};

const mutations ={
    setTodos:(state, todos)=>(state.todos = todos),
    newTodo:(state, todo) => state.todos.unshift(todo),
    removeTodo:(state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo:(state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if(index !== -1){
            state.todos.splice(index, 1, updTodo);
        }
    }
};

export default{
    state,
    getters,
    actions,
    mutations
};