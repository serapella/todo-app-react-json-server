import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/todoStore";
import { toggleTodo, removeTodo } from "../store/slices/todoSlice";

export function TodoList() {
  const dispatch = useDispatch();
  const { todos, categories, filter, statusFilter } = useSelector(
    (state: RootState) => state.todo,
  );

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      filter === "All Categories"
        ? true
        : categories.find((c) => c.id === todo.category)?.name === filter;
    const statusMatch =
      statusFilter === "All Status"
        ? true
        : statusFilter === "Completed"
          ? todo.completed
          : !todo.completed;
    return categoryMatch && statusMatch;
  });

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "#94a3b8";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Uncategorized";
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

          <div className="flex-1">
            <span
              className={
                "block font-medium" +
                (todo.completed ? " text-muted-foreground line-through" : "")
              }
            >
              {todo.text}
            </span>
            <span className="text-muted-foreground text-sm">
              {todo.description}
            </span>
          </div>

          <span
            className="rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: getCategoryColor(todo.category) + "20",
              color: getCategoryColor(todo.category),
            }}
          >
            {getCategoryName(todo.category)}
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
