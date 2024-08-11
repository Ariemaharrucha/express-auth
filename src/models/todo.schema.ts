import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: "User"},
  todo: { type: String, required: true },
  date: { type: Date, required: true },
});

const Todo = model("Todo", todoSchema);

export default Todo;
