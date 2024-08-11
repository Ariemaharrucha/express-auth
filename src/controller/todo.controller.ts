import { Request, Response } from "express";
import todoServices from "../services/todo.services";
import { ITodo } from "../types/entity";

const todoController = {
  handleGetTodo: async (req: Request, res: Response) => {
    try {
      const dataTodo = await todoServices.getAllTodo();
      res.status(200).json({ data: dataTodo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "gagal menamilkan todo" });
    }
  },

  handleInsertTodo: async (req: Request, res: Response) => {
    try {
      const { userId, todo, date } = req.body as ITodo;

      if (!todo || !date || !userId) {
        return res
          .status(400)
          .json({ error: "tolong isi todo dan date" });
      }

      const newTodo = await todoServices.insertTodo({userId, todo, date });

      if (newTodo) {
        res
          .status(201)
          .json({ message: "berhasil menambahkan ", data: newTodo });
      } else {
        res.status(400).json({ error: "gagal menambah todo" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "gagal menambah todo" });
    }
  },

  handleUpdate: async (req: Request, res: Response) => {
    const {userId, todo, date } = req.body as ITodo;
    const todoId = req.params.id;

    try {
      const updateTodo = await todoServices.updateTodo(todoId, {userId, todo, date });

      if (updateTodo) {
        res
          .status(200)
          .json({ message: "Todo telah di update", data: updateTodo });
      } else {
        res.status(404).json({ error: "Todo tdiak ada" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "gagal untuk update todo" });
    }
  },

  handleDelete: async (req: Request, res: Response) => {
    const todoId = req.params.id;

    try {
      const deleteTodo = await todoServices.deleteTodo(todoId);

      if (deleteTodo) {
        res.status(200).json({ message: "Todo berhasil di delete" });
      } else {
        res.status(404).json({ error: "Todo tidak ada" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "gagal untuk delete todo" });
    }
  },
};

export default todoController;
