import { api } from "../utils/api";
import Todo from "./Todo";
import styles from "./TodoList.module.css";
import CreateTodoForm from "../components/forms/CreateTodoForm";
import Card from "../components/ui/Card";
import { Divider } from "./ui/Divider";

export default function TodoList() {
  const { data, isLoading, isError } = api.todo.getAll.useQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div className={styles.todoList}>
      {data.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <Divider />
      <Card>
        <h1>Add Todo</h1>
        <CreateTodoForm />
      </Card>
    </div>
  );
}
