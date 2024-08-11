import express from "express";
import userController from "../controller/auth.controller";
export const userRoutes = express.Router();

userRoutes.get("/", userController.handleGetUser);
userRoutes.post("/", userController.handleAddUser);
userRoutes.put("/:id", userController.handleUpdateUser);
userRoutes.delete("/:id", userController.handleDeleteUser);
userRoutes.post("/login", userController.handleLogin);
