import { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { TodoCategory } from "../store/todoStore";
import { addTodo } from "../store/slices/todoSlice";

export function AddTodo() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [category, setCategory] = useState<TodoCategory>("Work");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTodo({ text: text.trim(), category }));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as TodoCategory)}
        className="rounded-md border bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="submit"
        className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <Plus size={20} />
        Add
      </button>
    </form>
  );
}
