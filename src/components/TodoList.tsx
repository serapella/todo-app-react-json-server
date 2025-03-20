import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { AppDispatch, RootState, Category } from "../store/todoStore";
import { toggleTodoAsync, removeTodoAsync } from "../store/slices/todoSlice";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Todo } from "../store/slices/todoSlice";

export function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, categories } = useSelector((state: RootState) => state.todo);
  const { filter, statusFilter } = useSelector(
    (state: RootState) => state.filter,
  );

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      filter === "All Categories"
        ? true
        : (filter as Category).id === todo.category;
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

  const handleToggle = async (todo: Todo) => {
    try {
      await dispatch(toggleTodoAsync(todo)).unwrap();
      toast.success(
        `Task ${todo.completed ? "marked as incomplete" : "completed"}`,
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(removeTodoAsync(id)).unwrap();
      toast.success("Task removed successfully");
    } catch (error) {
      toast.error("Failed to remove task");
    }
  };

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="bg-card flex items-center gap-3 rounded-lg border p-4 shadow-sm"
        >
          <Toggle
            pressed={todo.completed}
            onPressedChange={() => handleToggle(todo)}
            size="sm"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {todo.completed ? "Done" : "Click to Complete"}
          </Toggle>

          <div className="flex-1">
            <span
              className={
                "block font-medium" +
                (todo.completed ? " text-muted-foreground line-through" : "")
              }
            >
              {todo.text}
            </span>
            <Collapsible>
              <CollapsibleTrigger className="text-muted-foreground mt-2 cursor-pointer text-sm hover:underline">
                {todo.description ? "Show Description" : "No Description"}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <span className="text-muted-foreground text-sm">
                  {todo.description}
                </span>
              </CollapsibleContent>
            </Collapsible>
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

          <Button
            onClick={() => {}}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Pencil size={18} />
          </Button>

          <Button
            onClick={() => handleRemove(todo.id)}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
}
