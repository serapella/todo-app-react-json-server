import { TodoList } from "../components/TodoList";
import { TodoFilters } from "../components/TodoFilters";
import { TodoStatistics } from "../components/TodoStatistics";
import { AddTodo } from "../components/AddTodo";
import { Pagination } from "../components/Pagination";
import { useGetTodosQuery, useGetCategoriesQuery } from "../store/api/todoApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/todoStore";

export function TodoPage() {
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.pagination
  );

  const { data: todosData, isLoading: todosLoading, error: todosError } = useGetTodosQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();

  const isLoading = todosLoading || categoriesLoading;
  const error = todosError || categoriesError;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        Error: {error instanceof Error ? error.message : "Failed to fetch data"}
      </div>
    );
  }

  if (!todosData || !categories) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TodoStatistics />
      <AddTodo />
      <TodoFilters />
      <TodoList />
      <Pagination />
    </div>
  );
}