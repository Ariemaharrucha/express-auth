import { IUser } from "../types/entity";
import { User } from "../models/user.schema";
import { IAuth } from "../types/entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.schema";

const authRepository = {
  getUser: async () => {
    try {
      const allUser = await User.find();
      return allUser;
    } catch (error) {
      console.error(error);
    }
  },

  createUser: async (dataUser: IUser) => {
    try {
      const { name, email, password } = dataUser;

      const hashPassword = await bcrypt.hash(password, 13);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });

      const saveUser = await newUser.save();

      return saveUser;
    } catch (error) {
      console.error(error);
    }
  },

  updateUser: async (userId: string, dataUser: IUser) => {

    try {
      const {name, email, password} = dataUser;

      const hashPassword = await bcrypt.hash(password, 13)
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        { name, email, password: hashPassword },
        { new: true }
      );

      return updateUser;
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const userDelete = await User.findByIdAndDelete(userId);
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

      const user = await User.findOne({
        email,
      });

      if (!user) {
        throw new Error("user tidak ada");
      }

      const isPassMatch = await bcrypt.compare(
        password,
        user.password as string
      );

      if (!isPassMatch) {
        throw new Error("password salah");
      }

      //authorization
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        {
          expiresIn: 60,
        }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {
          expiresIn: 350,
        }
      );

      //save tokenn to db
      const newRefreshToken = new Auth({
        userId: user.id,
        refreshToken,
      });

      await newRefreshToken.save();
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
    }
  },

  logOut: async (refreshToken: string) => {
    try {
      await Auth.deleteOne({ refreshToken });
    } catch (error) {
      console.error(error);
    }
  },
};

export default authRepository;
