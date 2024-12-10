import Container from "../components/layouts/Container";
import TodoList from "../components/TodoList";

export default function Todos() {
  return (
    <Container>
      <h1>Today</h1>
      <TodoList />
    </Container>
  );
}
