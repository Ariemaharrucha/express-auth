import Todo from "../models/todo.schema";
import { ITodo } from "../types/entity";

const todoRepository = {
  getTodo: async () => {
    try {
      const allTodo = await Todo.find().populate("userId");
      return allTodo;
    } catch (error) {
      console.error(error);
    }
  },

  createTodo: async (dataTodo: ITodo) => {
    try {
      const { userId, todo, date } = dataTodo;
      const newTodo = new Todo({
        userId,
        todo,
        date,
      });

      const saveTodo = await newTodo.save();

      return saveTodo;
    } catch (error) {
      console.error(error);
    }
  },

  updateTodo: async (todoId: string, dataTodo: ITodo) => {
    try {
      const {todo, date} = dataTodo
      const updateTodo = await Todo.findByIdAndUpdate(
        { _id: todoId },
        { todo, date },
        { new: true }
      );
      return updateTodo;
    } catch (error) {
      console.error(error);
    }
  },

  deleteTodo: async (todoId: string) => {
    try {
      const todoDelete = await Todo.findByIdAndDelete(todoId);
      return todoDelete;
    } catch (error) {
      console.error(error);
    }
  },
};

export default todoRepository;
