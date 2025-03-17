import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/todoStore";
import { setFilter, setStatusFilter } from "../store/slices/todoSlice";

export function TodoFilters() {
  const dispatch = useDispatch();
  const { filter, statusFilter } = useSelector(
    (state: RootState) => state.todo,
  );

  return (
    <div className="mb-4 flex gap-2">
      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="min-w-[150px] rounded-md border bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="All Categories">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
        className="min-w-[150px] rounded-md border bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="All Status">All Status</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
