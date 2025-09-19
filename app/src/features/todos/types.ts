import type { AxiosInstance } from "axios";

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  isRemoved: boolean;
  userId: string;
  createdAt: string;
  completedAt?: string | null;
}

export interface FetchTodosByUserIdPayload extends CommonThunkPayload{
  userId:string;
}

export interface CreateToDoPayload extends CommonThunkPayload{
  newTodo:Omit<Todo,"id" | "isCompleted" | "isRemoved" | "createdAt" | "completedAt">;
}

export interface UpdateTodoPayload extends CommonThunkPayload {
  id:number;
  updatedFields:Partial<Omit<Todo,"id" | "userId" | "createdAt">>;
}

export interface DeleteTodoPayload extends CommonThunkPayload{
  id:number;
}

// // export interface AddTodoResponse {
// //   id: number;
// //   todo: string;
// //   isCompleted: boolean;
// //   isRemoved: boolean;
// //   userId: number;
// //   createdAt: string;
// //   completedAt?: string;
// }
