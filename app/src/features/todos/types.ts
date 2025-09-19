export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  isRemoved: boolean;
  userId: string;
  createdAt: string;
  completedAt?: string | null;
}

export interface FetchTodosByUserIdPayload{
  userId:string;
}

export interface CreateToDoPayload{
  newTodo:Omit<Todo,"id" | "isCompleted" | "isRemoved" | "createdAt" | "completedAt">;
}

export interface UpdateTodoPayload{
  id:number;
  updatedFields:Partial<Omit<Todo,"id" | "userId" | "createdAt">>;
}

export interface DeleteTodoPayload{
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
