import { Schema, model } from "mongoose";
import TaskType  from "../../types/task";

const taskSchema = new Schema<TaskType>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Task = model<TaskType>("Task", taskSchema);

export default Task;
