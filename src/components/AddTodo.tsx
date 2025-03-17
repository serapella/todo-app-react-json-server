import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { RootState } from "../store/todoStore";
import { addTodo } from "../store/slices/todoSlice";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AddTodo() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.todo);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(
      addTodo({
        text: text.trim(),
        category,
        description: description.trim(),
      }),
    );
    setText("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
        />
      </div>

      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="flex-1 rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800">
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
        <Button className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <Plus size={20} />
          Add Todo
        </Button>
      </div>
    </form>
  );
}
