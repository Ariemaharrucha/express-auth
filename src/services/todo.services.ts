import todoRepository from "../repository/todo.repository"
import { ITodo } from "../types/entity";

const todoServices = {
    getAllTodo: async () => {
        try {
            const allTodo = await todoRepository.getTodo();
            return allTodo;
        } catch (error) {
            console.error(error)
        }
    },

    insertTodo: async (dataTodo:ITodo) => {
        const {userId, todo, date }= dataTodo
        try {
            if(!todo || !date) {
                throw new Error("tolong isi semua nya")
            }

            const saveTodo = await todoRepository.createTodo(dataTodo);
            return saveTodo;
        } catch (error) {
            console.log(error);
        }
    },

    updateTodo: async (todoId:string,dataTodo:ITodo) => {
        try {
            const updateTodo = await todoRepository.updateTodo(todoId,dataTodo);
            return updateTodo;
        } catch (error) {
            console.log(error);
            
        }
    },

    deleteTodo: async (todoId:string) => {
        try {
            const deleteTodo = await todoRepository.deleteTodo(todoId)
            return deleteTodo;
        } catch (error) {
           console.log(error);
        }
    }
}

export default todoServices;