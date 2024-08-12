import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  todo: { type: String, required: true },
  date: { type: Date, required: true },
  userId: {type: Schema.Types.ObjectId, ref: "User"},
});

const Todo = model("Todo", todoSchema);

export default Todo;
