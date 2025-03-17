import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../lib/utils";
import { RootState } from "../store/todoStore";
import { toggleTodo, removeTodo } from "../store/slices/todo-slice";

export function TodoList() {
  const dispatch = useDispatch();
  const { todos, filter, statusFilter } = useSelector(
    (state: RootState) => state.todo,
  );

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      filter === "All Categories" ? true : todo.category === filter;
    const statusMatch =
      statusFilter === "All Status"
        ? true
        : statusFilter === "Completed"
          ? todo.completed
          : !todo.completed;
    return categoryMatch && statusMatch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "text-blue-600 dark:text-blue-400";
      case "Personal":
        return "text-red-600 dark:text-red-400";
      case "Other":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="bg-card flex items-center gap-3 rounded-lg border p-4 shadow-sm"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="border-input text-primary focus:ring-ring h-5 w-5 rounded"
          />

          <span
            className={cn(
              "flex-1",
              todo.completed && "text-muted-foreground line-through",
            )}
          >
            {todo.text}
          </span>

          <span
            className={cn(
              "rounded-full px-3 py-1 text-sm",
              getCategoryColor(todo.category),
            )}
          >
            {todo.category}
          </span>

          <button
            onClick={() => {}}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="text-muted-foreground hover:text-destructive p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
