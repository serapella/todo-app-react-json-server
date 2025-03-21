import { useGetCategoriesQuery } from "../store/api/todoApi";
import { useAppDispatch, useAppSelector } from "../store/todoStore";
import { setFilter, setStatusFilter } from "../store/slices/filterSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function TodoFilters() {
  const dispatch = useAppDispatch();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { filter, statusFilter } = useAppSelector((state) => state.filter);

  return (
    <div className="mb-4 flex gap-2">
      <Select value={filter} onValueChange={(value) => dispatch(setFilter(value))}>
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
        onValueChange={(value) =>
          dispatch(setStatusFilter(value as "All Status" | "Active" | "Completed"))
        }
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