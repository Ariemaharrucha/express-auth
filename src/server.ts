import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { todoRoutes } from './routes/todo.router';
import { userRoutes } from './routes/auth.routes';
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/todoapps/api/v1/todo', todoRoutes)
app.use('/todoapps/api/v1/user', userRoutes)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`server running as port ${process.env.PORT}`);
});
