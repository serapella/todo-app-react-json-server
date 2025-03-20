import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { AppDispatch, RootState } from "../store/todoStore";
import { addTodoAsync } from "../store/slices/todoSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AddTodo() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.todo);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]?.id || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a task");
      return;
    }

    try {
      await dispatch(
        addTodoAsync({
          text: text.trim(),
          category,
          description: description.trim(),
        }),
      ).unwrap();

      toast.success("Task added successfully");
      setText("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full"
        />
      </div>

      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          className="min-h-[80px]"
        />
      </div>

      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="flex-1">
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

        <Button type="submit" className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Todo
        </Button>
      </div>
    </form>
  );
}
