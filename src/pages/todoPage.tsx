import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoList } from "../components/TodoList";
import { TodoFilters } from "../components/TodoFilters";
import { AddTodo } from "../components/AddTodo";
import { AppDispatch, RootState } from "../store/todoStore";
import { fetchTodos, fetchCategories } from "../store/slices/todoSlice";

export function TodoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <AddTodo />
      <TodoFilters />
      <TodoList />
    </div>
  );
}
