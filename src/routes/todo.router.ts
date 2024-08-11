import  express  from "express";
import todoController from "../controller/todo.controller";
export const todoRoutes = express.Router();
import { authMiddleware } from "../../middleware/authorization";

todoRoutes.get("/", authMiddleware,todoController.handleGetTodo);
todoRoutes.post("/", authMiddleware,todoController.handleInsertTodo);
todoRoutes.put("/:id", authMiddleware,todoController.handleUpdate);
todoRoutes.delete("/:id", authMiddleware,todoController.handleDelete);
