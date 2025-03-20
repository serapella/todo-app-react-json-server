import { useSelector } from "react-redux";
import { BarChart3, CheckCircle2, Circle, ListTodo } from "lucide-react";
import { RootState } from "../store/todoStore";

export const TodoStatistics = () => {
  const { todos } = useSelector((state: RootState) => state.todo);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos
    ? Math.round((completedTodos / totalTodos) * 100)
    : 0;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-card flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
          <ListTodo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Total Tasks</p>
          <p className="text-2xl font-bold">{totalTodos}</p>
        </div>
      </div>

      <div className="bg-card flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Completed</p>
          <p className="text-2xl font-bold">{completedTodos}</p>
        </div>
      </div>

      <div className="bg-card flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
          <Circle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Active</p>
          <p className="text-2xl font-bold">{activeTodos}</p>
        </div>
      </div>

      <div className="bg-card flex items-center gap-4 rounded-lg border p-4 shadow-sm">
        <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
          <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Completion Rate</p>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>
      </div>
    </div>
  );
};
