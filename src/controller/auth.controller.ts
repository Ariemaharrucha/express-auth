import { Request, Response } from "express";
import authServices from "../services/auth.service";
import { User } from "../models/user.schema";
import { IUser } from "../types/entity";


const authController = {
  handleGetUser: async (req: Request, res: Response) => {
    try {
      const allUser = await authServices.getUser();
      return res.status(200).json({ data: allUser });
    } catch (error) {
      res.status(404).json({ message: "senter" });
    }
  },

  handleAddUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body as IUser;
    try {
      if (!name || !email) {
        return res.status(404).json({ message: "name dan email harus di isi" });
      }

      if (password.length < 8) {
        return res.status(404).json({ message: "password setidaknya 8 char " });
      }

      const checkEmail = await User.findOne({
        email,
      });

      if (checkEmail) {
        return res.status(404).json({ message: "email sudah digunakan" });
      }

      const saveUser = await authServices.insertUser({ name, email, password });

      return res.status(201).json({ data: saveUser });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  handleUpdateUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body as IUser;
    const userId = req.params.id;
    try {
      const updateUser = await authServices.updateUser(userId, {
        name,
        email,
        password,
      });

      res.status(200).json({ message: "user berasil di update", updateUser });
    } catch (error) {
      res.status(401).json({ message: "belum ter-update" });
    }
  },

  handleDeleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const result = await authServices.deleteUser(userId);
      return res
        .status(201)
        .json({ message: "user berhasil di hapus", data: result });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  handleLogin: async (req: Request, res: Response) => {
    try {
      const resultLogin = await authServices.login(req.body);
      return res
        .cookie("accessToken", resultLogin?.accessToken, { httpOnly: true })
        .cookie("refreshToken", resultLogin?.refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: "login succes"});
    } catch (error) {
      console.error(error);
      throw new Error("login failed");
    }
  },

  handleLogout: async (req: Request, res: Response) => {
    try {
      const {refreshToken} = req.cookies;

      await authServices.logOut(refreshToken);
      res.status(200).json({message: "logout succes"})
    } catch (error) {
      res.json({message: "logout error"})
    }
  },
};

export default authController;
