import type { Todo } from "../slices/todoSlice";
import type { Category } from "../todoStore";

const API_URL = "http://localhost:3001";

export const todoApi = {
  async fetchTodos(): Promise<Todo[]> {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
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
