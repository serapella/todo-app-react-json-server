import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../todoStore";
import { todoApi } from "../api/todoApi";
import { setTotalItems } from "./paginationSlice";

export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  description: string;
}

interface TodoState {
  todos: Todo[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  categories: [],
  loading: false,
  error: null,
};

interface FetchTodosParams {
  page: number;
  limit: number;
}

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (params: FetchTodosParams) => {
    const response = await todoApi.fetchTodos(params.page, params.limit);
    return response;
  },
);

export const fetchCategories = createAsyncThunk(
  "todos/fetchCategories",
  async () => await todoApi.fetchCategories(),
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (todo: Omit<Todo, "id" | "completed">) => await todoApi.addTodo(todo),
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => await todoApi.updateTodo(todo),
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async (todo: Todo) => await todoApi.toggleTodo(todo),
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodo",
  async (id: string) => {
    await todoApi.removeTodo(id);
    return id;
  },
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
