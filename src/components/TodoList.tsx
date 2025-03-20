import { useState } from "react";
import { Pencil, Trash2, CheckIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { AppDispatch, RootState, Category } from "../store/todoStore";
import {
  toggleTodoAsync,
  removeTodoAsync,
  updateTodoAsync,
  Todo,
} from "../store/slices/todoSlice";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, categories } = useSelector((state: RootState) => state.todo);
  const { filter, statusFilter } = useSelector(
    (state: RootState) => state.filter,
  );

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

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
        `Task ${todo.completed ? "marked as incomplete" : "marked as complete"}`,
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

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setEditDescription(todo.description);
    setEditCategory(todo.category);
  };

  const handleUpdate = async () => {
    if (!editingTodo) return;

    try {
      await dispatch(
        updateTodoAsync({
          ...editingTodo,
          text: editText.trim(),
          description: editDescription.trim(),
          category: editCategory,
        }),
      ).unwrap();
      toast.success("Task updated successfully");
      setEditingTodo(null);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-3 rounded-lg border p-4 bg-blend-darken shadow-sm"
        >
          <Toggle
            pressed={todo.completed}
            onPressedChange={() => handleToggle(todo)}
            size="sm"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary border-2 border-gray-400"
          >
            {todo.completed ? (
              <CheckIcon size={16} />
            ) : (
              <div className="h-4 w-4" />
            )}
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
                {todo.description ? "Extra Details " : "No Details"}
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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleEdit(todo)}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>Edit your task here</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Task name"
                  />
                </div>
                <div className="grid gap-2">
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Add a description..."
                  />
                </div>
                <div className="grid gap-2">
                  <Select value={editCategory} onValueChange={setEditCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleUpdate}>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
