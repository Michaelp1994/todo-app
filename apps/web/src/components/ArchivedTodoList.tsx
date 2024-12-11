import { api } from "../utils/api";
import ArchivedTodo from "./ArchivedTodo";
import styles from "./TodoList.module.css";

export default function ArchivedTodoList() {
  const { data, isLoading, isError } = api.todo.getAllToday.useQuery({
    archived: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className={styles.todoList}>
      {data.map((todo) => (
        <ArchivedTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
