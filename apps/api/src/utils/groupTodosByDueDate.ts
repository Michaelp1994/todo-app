import { format } from "date-fns";
import type { Todo } from "../db/schemas/todo";

type GroupedTodos = Record<string, Todo[]>;

export function groupTodosByDate(todos: Todo[]): GroupedTodos {
  return todos.reduce<GroupedTodos>((acc, todo) => {
    if (!todo.dueDate) return acc;

    const key = format(new Date(todo.dueDate), "yyyy-MM-dd");

    if (!acc[key]) acc[key] = [];
    acc[key].push(todo);
    return acc;
  }, {});
}
