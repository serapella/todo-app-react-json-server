import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/todoStore";
import { setFilter, setStatusFilter } from "../store/slices/todoSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function TodoFilters() {
  const dispatch = useDispatch();
  const { categories, filter, statusFilter } = useSelector(
    (state: RootState) => state.todo,
  );

  return (
    <div className="mb-4 flex gap-2">
      <Select
        value={filter}
        onValueChange={(value) => dispatch(setFilter(value))}
      >
        <SelectTrigger className="min-w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Categories">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={statusFilter}
        onValueChange={(value) => dispatch(setStatusFilter(value))}
      >
        <SelectTrigger className="min-w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Status">All Status</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
