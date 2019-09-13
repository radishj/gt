<template>
    <div>
        <h3>Todos</h3>
        <div class="legend">
            <span>Double click to mark as complete</span>
            <span>
                <span class="incomplete-box"></span> = Incomplete
            </span>
            <span>
                <span class="complete-box"></span> = Complete
            </span>
        </div>
        <div class="todos">
            <div @dblclick="onDblClick(todo)" v-for="todo in allTodos" :key="todo.id" class="todo"
            v-bind:class="{'is-complete':todo.completed}">
                {{todo.title}}
                <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
            </div>
            
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    name: "Todos",
    methods: {
        ...mapActions(['fetchTodos', "deleteTodo", "updateTodo"]),
        onDblClick(todo){
            const updTodo={
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }
            this.updateTodo(updTodo);
        }
    },
    computed: mapGetters(['allTodos']),
    created(){

        
    //    var socket = io("http://localhost:8000"); // TIP: io() with no args does auto-discovery
    //    //turn off debug
    //     //io.set('log level', 1);
    //     socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    //         socket.emit('ferret', '*', function (data) { // args are sent in order to acknowledgement function
    //         console.log(data); // data will be 'tobi says woot'
            
    //         });
    //     });

        alert('AAA');
        this.fetchTodos();

    }

}
</script>
<style scoped>
.todos{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap:1rem;
}
.todo{
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}
i{
    position:absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}

.legend{
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}

.complete-box{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
}

.incomplete-box{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #41b883;
}

.is-complete{
    background: #35495e;
    color: #fff;
}
</style>