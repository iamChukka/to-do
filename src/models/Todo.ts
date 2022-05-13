//models/Todo.js

import { Schema, Types, model } from "mongoose";

interface ITodo {
  name: string;
  done: boolean;
  userId: Types.ObjectId;
}

// Define schema for todo items
const todoSchema: Schema = new Schema<ITodo>({
  name: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
