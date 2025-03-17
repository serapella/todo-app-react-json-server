import { TodoList } from "../components/TodoList";
import { TodoFilters } from "../components/TodoFilters";
import { AddTodo } from "../components/AddTodo";

export function TodoPage() {
  return (
    <div>
      <AddTodo />
      <TodoFilters />
      <TodoList />
    </div>
  );
}
