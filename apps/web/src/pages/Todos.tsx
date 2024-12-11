import Container from "../components/layouts/Container";
import TodoList from "../components/TodoList";
import CreateTodoModal from "../components/CreateTodoModal";
import {
  PageSubtitle,
  PageTitle,
  PageToolbar,
} from "../components/layouts/PageToolbar";
import { format } from "date-fns";

export default function Todos() {
  return (
    <Container>
      <PageToolbar>
        <div>
          <PageTitle>Today</PageTitle>
          <PageSubtitle>{format(new Date(), "PPPP")}</PageSubtitle>
        </div>
        <CreateTodoModal />
      </PageToolbar>

      <TodoList />
    </Container>
  );
}
