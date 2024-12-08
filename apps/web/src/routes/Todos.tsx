import CreateTodoForm from "../components/CreateTodoForm";
import Todo from "../components/Todo";
import { api } from "../utils/api";

export default function Todos() {
  const { data, isLoading, isError } = api.todo.getAll.useQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return (
    <div>
      <h1>Todos</h1>
      <p>Welcome to the Todos page!</p>
      {data.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <CreateTodoForm />
    </div>
  );
}
