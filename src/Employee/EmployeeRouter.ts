import express from "express";
import EmployeeController from "./EmployeeController.js";

export const employeeRouter = express.Router()
const employeeConstroller = new EmployeeController();

employeeRouter.get("/employees", employeeConstroller.getAllEmployeesExecutor)

employeeRouter.get("/employees/:id", employeeConstroller.getSingleEmployeeExecutor)

employeeRouter.post("/employees", employeeConstroller.createEmployeeExecutor)