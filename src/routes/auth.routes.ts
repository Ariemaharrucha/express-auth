import express from "express";
import authController from "../controller/auth.controller";
export const userRoutes = express.Router();

userRoutes.get("/", authController.handleGetUser);
userRoutes.post("/", authController.handleAddUser);
userRoutes.put("/:id", authController.handleUpdateUser);
userRoutes.delete("/:id", authController.handleDeleteUser);
userRoutes.post("/login", authController.handleLogin);
