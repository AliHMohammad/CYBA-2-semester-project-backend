import { Request, Response } from "express";
import TaskService from "./TaskService.js";

export default class TaskController {
    constructor() {}

    public async initiateTaskExecutor(request: Request<ReqParams, {}, { employeeId: string }, {}>, response: Response) {
        const taskInstanceId = parseInt(request.params.id);
        const {employeeId} = request.body;

        try {
            if (!taskInstanceId || !employeeId) {
                response.status(400).json({ error: "One or more ids are missing" });
                return;
            }

            const taskService = new TaskService();
            const result = await taskService.initiateTask(taskInstanceId, employeeId);
            console.log(result);

            if (!result) {
                response.status(400).json({ message: 'Task instance is neither "AWAITING_CUSTOMER" or "PENDING"' });
                return;
            }

            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    public async getTasksExecutor(_request: Request, response: Response) {
        try {
            const taskService = new TaskService();
            const result = await taskService.getTasks();
            response.status(200).json(result);
        } catch (error: any) {
            if (error instanceof Error) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
}
