import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TodoCategory } from "../todoStore";

export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  description: string;
}

interface TodoState {
  todos: Todo[];
  categories: TodoCategory[];
  filter: string;
  statusFilter: string;
}

const initialState: TodoState = {
  todos: [
    {
      id: "1",
      text: "Learn React",
      completed: true,
      category: "1",
      description: "Study the basics of React framework",
    },
    {
      id: "2",
      text: "Build a todo app",
      completed: false,
      category: "1",
      description: "Develop a simple todo application using React",
    },
    {
      id: "3",
      text: "Go for a run",
      completed: false,
      category: "4",
      description: "Jog around the neighborhood for 30 minutes",
    },
    {
      id: "4",
      text: "Read a book",
      completed: false,
      category: "4",
      description: "Finish reading the current novel",
    },
    {
      id: "5",
      text: "Buy groceries",
      completed: false,
      category: "3",
      description: "Purchase weekly groceries from the local store",
    },
    {
      id: "6",
      text: "Prepare presentation for client meeting",
      completed: false,
      category: "1",
      description: "Create slides for the upcoming client meeting",
    },
    {
      id: "7",
      text: "Review project timeline",
      completed: true,
      category: "1",
      description: "Go over the project timeline and ensure deadlines are met",
    },
    {
      id: "8",
      text: "Update documentation",
      completed: false,
      category: "1",
      description: "Add recent changes to the project documentation",
    },
    {
      id: "9",
      text: "Fix bug in login component",
      completed: true,
      category: "1",
      description: "Resolve the issue causing login failures",
    },
    {
      id: "10",
      text: "Attend team standup",
      completed: false,
      category: "1",
      description: "Participate in the daily team standup meeting",
    },
    {
      id: "18",
      text: "Call mom",
      completed: true,
      category: "2",
      description: "Have a phone call with mom to catch up",
    },
    {
      id: "19",
      text: "Schedule dentist appointment",
      completed: false,
      category: "2",
      description: "Book an appointment for a dental check-up",
    },
    {
      id: "39",
      text: "30 minute workout",
      completed: false,
      category: "4",
      description: "Perform a home workout for 30 minutes",
    },
    {
      id: "40",
      text: "Drink 8 glasses of water",
      completed: true,
      category: "4",
      description: "Ensure daily water intake goal is met",
    },
    {
      id: "47",
      text: "Complete online course module",
      completed: false,
      category: "5",
      description: "Finish the current module of the online course",
    },
    {
      id: "48",
      text: "Read chapter of technical book",
      completed: true,
      category: "5",
      description: "Read a chapter from a technical book for knowledge gain",
    },
  ],
  categories: [
    {
      id: "1",
      name: "Work",
      color: "#f59e0b",
    },
    {
      id: "2",
      name: "Personal",
      color: "#ef4444",
    },
    {
      id: "3",
      name: "Shopping",
      color: "#3b82f6",
    },
    {
      id: "4",
      name: "Health",
      color: "#10b981",
    },
    {
      id: "5",
      name: "Learning",
      color: "#8b5cf6",
    },
  ],

  filter: "All Categories",
  statusFilter: "All Status",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        text: string;
        category: string;
        description: string;
      }>,
    ) => {
      state.todos.push({
        id: crypto.randomUUID(),
        text: action.payload.text,
        category: action.payload.category,
        description: action.payload.description,
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
