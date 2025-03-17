import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoCategory } from "../todoStore"; // Importing the type

export interface Todo {
  id: string;
  text: string;
  category: TodoCategory; // Using the string literal type directly
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: string;
  statusFilter: string;
}

const initialState: TodoState = {
  todos: [],
  filter: "All Categories",
  statusFilter: "All Status",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; category: TodoCategory }>,
    ) => {
      state.todos.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        category: action.payload.category,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter, setStatusFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
