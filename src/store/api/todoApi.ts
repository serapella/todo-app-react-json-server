import type { Todo } from "../slices/todoSlice";
import type { Category } from "../todoStore";

const API_URL = "https://bony-polarized-ice.glitch.me";

interface FetchTodosResponse {
  todos: Todo[];
  total: number;
}

export const todoApi = {
  async fetchTodos(
    page: number = 1,
    limit: number = 5,
  ): Promise<FetchTodosResponse> {
    const response = await fetch(
      `${API_URL}/todos?_page=${page}&_limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const total = Number(response.headers.get("X-Total-Count") || "0");
    const todos = await response.json();
    return { todos, total };
  },

  async fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  },

  async addTodo(todo: Omit<Todo, "id" | "completed">): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        completed: false,
        id: crypto.randomUUID(),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    return response.json();
  },

  async updateTodo(todo: Todo): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return response.json();
  },

  async toggleTodo(todo: Todo): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle todo");
    }
    return response.json();
  },

  async removeTodo(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove todo");
    }
  },
};
