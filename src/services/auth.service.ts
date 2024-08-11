import userRepository from "../repository/auth.repository";
import { User } from "../models/user.schema";
import { IAuth, IUser } from "../types/entity";

const userServices = {
  getUser: async () => {
    try {
      const allUser = await userRepository.getUser();
      return allUser;
    } catch (error) {
      console.log(error);
    }
  },

  insertUser: async (dataUser: IUser) => {
    const { name, email, password } = dataUser;
    if (!name || !email || !password) {
      return "nama, email dan password tidak boleh kosong";
    }

    if (password.length < 8) {
      return "password minimal 8 character";
    }

    const checkEmail = await User.findOne({
      email,
    });

    if (checkEmail) {
      return "email telah digunakan";
    }

    try {
      const saveUser = await userRepository.createUser({
        name,
        email,
        password,
      });
      return saveUser;
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: async (userId: string, dataUser: IUser) => {
    const { name, email, password } = dataUser;

    try {
      const updateUser = await userRepository.updateUser(userId, {
        name,
        email,
        password,
      });
      return updateUser;
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const userDelete = await userRepository.deleteUser(userId);
      return userDelete;
    } catch (error) {
      console.log(error);
    }
  },

  login: async (dataLogin: IAuth) => {
    try {
      const { email, password } = dataLogin;
      if (!email || password.length < 8) {
        throw new Error("email dan password harus di isi");
      }

      const login = await userRepository.login({email, password});
      return login;
    } catch (error) {
      console.error(error);
    }
  },

  logOut: async (refershToken:string) => {
    try {
      const logOut = await userRepository.logOut(refershToken);
      return logOut
    } catch (error) {
      console.error(error);
      
    }
  }
};

export default userServices;
