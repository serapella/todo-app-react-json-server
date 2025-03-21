import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from "@/types/todo";
import { Category } from "../todoStore";

const API_URL = "http://localhost:3001";

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<{ todos: Todo[]; total: number }, { page: number; limit: number }>({
      query: ({ page = 1, limit = 5 }) => ({
        url: `todos`,
        params: { _page: page, _limit: limit },
      }),
      transformResponse(todos: Todo[], meta) {
        return {
          todos,
          total: Number(meta?.response?.headers.get("X-Total-Count") || "0"),
        };
      },
      providesTags: ['todos'],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
      providesTags: ['todos'],
    }),

    addTodo: builder.mutation<Todo, Omit<Todo, 'id' | 'completed'>>({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: {
          ...todo,
          completed: false,
          id: crypto.randomUUID(),
        },
      }),
      invalidatesTags: ['todos'],
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['todos'],
    }),

    toggleTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PATCH',
        body: { completed: !todo.completed },
      }),
      invalidatesTags: ['todos'],
    }),

    removeTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetCategoriesQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useToggleTodoMutation,
  useRemoveTodoMutation,
} = todoApi;