import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  if (request.method === "GET") {
    const tasks = await Task.find().sort("-created_at");
    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const taskTitle = request.body;
      const task = new Task(taskTitle);
      const record = await task.save();
      return response.status(201).json(record);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return response.status(400).json({ error: error.message });
      }
      return response.status(400).json({ error: "An unknown error occurred" });
    }
  }
}
