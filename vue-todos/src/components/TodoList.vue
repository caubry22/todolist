<template>
    <el-row>
        <el-col :span="12" :offset="7" style="width: 100%">
            <h1>TodoList</h1>
            <TodoForm @send-message="createTodo"></TodoForm>
            <el-table :data="todos">
                <el-table-column prop="title" label="Title" width="350"/>
                <el-table-column prop="completed" label="Completed" width="200"/>
            </el-table>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import {ElMessage} from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import TodoForm from './TodoForm.vue'

@Options({
    components: {
        TodoForm,
    }
})

export default class TodoList extends Vue {
    todos = [];

    async mounted(){
        await this.loadTodos();
    }

    async loadTodos() {
        const response = await this.axios.get("http://localhost:8000/todos");
        this.todos = response.data;
    }

    async createTodo(todo: any) {
        console.log("Todo", todo)

        await this.axios.post("http://localhost:8000/todos", {
            title: todo.title,
            completed: todo.completed,
        });
        ElMessage({
            message: "Todo Created",
            type: "success"
        })
        await this.loadTodos();
    }
}
</script>