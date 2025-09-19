import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import * as todoApi from "../../api/todoAPI"; // Ensure correct import paths
import type {
  CreateToDoPayload,
  DeleteTodoPayload,
  FetchTodosByUserIdPayload,
  Todo,
  UpdateTodoPayload,
} from "./types";
import type { AxiosInstance } from "axios";

// --- State Interfaces ---
interface TodosState {
  todos: Todo[];
  userTodos: Todo[];
  loading: boolean;
  error: string | null;
  totalTodos: number;
  totalCompleted: number;
  totalPending: number;
  totalInBin: number;
}

// --- Initial State ---
const initialState: TodosState = {
  todos: [],
  userTodos: [],
  loading: false,
  error: null,
  totalTodos: 0,
  totalCompleted: 0,
  totalPending: 0,
  totalInBin: 0,
};

// --- Async Thunks ---

// Async thunk: fetch todos by user ID
export const fetchTodosByUserId = createAsyncThunk(
  "todos/fetchTodosByUserId",
  async ({payload,axiosPrivate}:{payload: FetchTodosByUserIdPayload,axiosPrivate:AxiosInstance}) => {
    try {
      // todoApi.getTodosByUserId now expects the entire payload object
      const todos = await todoApi.getTodosByUserId(payload,axiosPrivate);
      return todos;
    } catch (error) {
      console.log(error);
    }
  }
);

// Async thunk: create a new todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async ({payload,axiosPrivate}:{payload: CreateToDoPayload,axiosPrivate:AxiosInstance}) => {
    try {
      // todoApi.addTodo now expects the entire payload object
      const todo = await todoApi.addTodo(payload,axiosPrivate);
      return todo;
    } catch (error) {
      console.log(error);
    }
  }
);

// Async thunk: update an existing todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({payload,axiosPrivate}:{payload: UpdateTodoPayload,axiosPrivate:AxiosInstance}) => {
    try {
      // todoApi.updateTodo now expects the entire payload object
      const updatedTodo = await todoApi.updateTodo(payload,axiosPrivate);
      return updatedTodo; // Ensure API returns the full updated object
    } catch (error) {
      console.log(error);
    }
  }
);

// Async thunk: delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({payload,axiosPrivate}:{payload: DeleteTodoPayload,axiosPrivate:AxiosInstance}) => {
    try {
      await todoApi.deleteTodo(payload,axiosPrivate);
      return payload.id;
    } catch (error) {
      console.log(error);
    }
  }
);

// --- Slice Definition ---
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
      state.userTodos = [];
      state.totalTodos = 0;
      state.totalCompleted = 0;
      state.totalPending = 0;
      state.totalInBin = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --- Specific Fulfilled Handling ---
    builder
      .addCase(
        fetchTodosByUserId.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.userTodos = action.payload;
          state.error = null;
          state.totalTodos = action.payload.length;
          state.totalCompleted = action.payload.filter(
            (t) => t.isCompleted
          ).length;
          state.totalPending = action.payload.filter(
            (t) => !t.isCompleted && !t.isRemoved
          ).length;
          state.totalInBin = action.payload.filter((t) => t.isRemoved).length;
        }
      )
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.userTodos.push(action.payload);
        state.totalTodos += 1;

        if (action.payload.isCompleted) {
          state.totalCompleted += 1;
        } else {
          state.totalPending += 1;
        }
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const updatedTodo = action.payload;

        const updateArray = (arr: Todo[]) => {
          const index = arr.findIndex((t) => t.id === updatedTodo.id);
          if (index !== -1) {
            arr[index] = updatedTodo;

            if (updatedTodo.isCompleted) {
              state.totalCompleted += 1;
              state.totalPending -= 1;
            } else {
              state.totalCompleted -= 1;
              state.totalPending += 1;
            }

            if (!updatedTodo.isCompleted) {
              if (updatedTodo.isRemoved) {
                state.totalInBin += 1;
                state.totalPending -= 1;
              }
            }
          }
        };

        updateArray(state.todos); 
        updateArray(state.userTodos); 
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const deleted = state.userTodos.find((t) => t.id == action.payload);
        state.userTodos = state.userTodos.filter(
          (t) => t.id !== action.payload
        );

        if (deleted) {
          state.totalTodos -= 1;
          state.totalInBin -= 1;
          if (deleted.isCompleted) {
            state.totalCompleted -= 1;
          } else {
            state.totalPending -= 1;
          }
        }
      });
  },
});

// Export actions and reducer
export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
