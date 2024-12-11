import { api } from "../utils/api";
import Todo from "./Todo";
import styles from "./TodoList.module.css";

export default function ListTodoList({ slug }: { slug: string }) {
  const { data, isLoading, isError } = api.todo.getAllByListSlug.useQuery({
    slug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className={styles.todoList}>
      {data.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
