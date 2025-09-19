import type { AxiosInstance } from "axios";
import type { CreateToDoPayload, DeleteTodoPayload, FetchTodosByUserIdPayload, UpdateTodoPayload} from "../features/todos/types";

// Function to get all todos
export const getTodos = async(axiosPrivate:AxiosInstance) => {
    const response = await axiosPrivate.get("/Todo/all");
    return response;
};
// Function to get todos by user ID for a specific user
export const getTodosByUserId = async(payload:FetchTodosByUserIdPayload,axiosPrivate:AxiosInstance) => {
    const response = await axiosPrivate.get(`/Todo/${payload.userId}`);
    return response.data;
};
// Function to get a todo by ID
export const addTodo = async(payload:CreateToDoPayload,axiosPrivate:AxiosInstance) => {
    const response = await axiosPrivate.post("/Todo", payload.newTodo);
    return response.data;
};

// Function to update a todo
export const updateTodo = async(payload:UpdateTodoPayload,axiosPrivate:AxiosInstance) => {
    const response = await axiosPrivate.put(`/Todo/${payload.id}`, payload.updatedFields);
    return response.data;
};
// Function to delete a todo
export const deleteTodo = async(payload:DeleteTodoPayload,axiosPrivate:AxiosInstance) => {
    const response = await axiosPrivate.delete(`/Todo/${payload.id}`);
    return response.data;
};


