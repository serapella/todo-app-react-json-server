import { useGetTodosQuery } from "../store/api/todoApi";
import { BarChart3, CheckCircle2, Circle, ListTodo } from "lucide-react";

export function TodoStatistics() {
  const { data, isLoading } = useGetTodosQuery({ page: 1, limit: 1000 });
  
  const todos = data?.todos || [];
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm animate-pulse">
            <div className="h-9 w-9 rounded-full bg-muted"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-muted"></div>
              <div className="h-6 w-12 rounded bg-muted"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
          <ListTodo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="text-2xl font-bold">{totalTodos}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{completedTodos}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
          <Circle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold">{activeTodos}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
          <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>
      </div>
    </div>
  );
}