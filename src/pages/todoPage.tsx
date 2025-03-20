import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoList } from "../components/TodoList";
import { TodoFilters } from "../components/TodoFilters";
import { AddTodo } from "../components/AddTodo";
import { Pagination } from "../components/Pagination";
import { AppDispatch, RootState } from "../store/todoStore";
import { fetchTodos, fetchCategories } from "../store/slices/todoSlice";

export function TodoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.todo);
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.pagination,
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTodos({ page: 1, limit: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(fetchTodos({ page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, currentPage, itemsPerPage]);

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
      <Pagination />
    </div>
  );
}
