import CreateTodoModal from "../components/CreateTodoModal";
import Container from "../components/layouts/Container";
import { PageTitle, PageToolbar } from "../components/layouts/PageToolbar";
import WeekList from "../components/WeekList";
export default function WeekTodos() {
  return (
    <Container>
      <PageToolbar>
        <div>
          <PageTitle>Upcoming</PageTitle>
        </div>
        <CreateTodoModal />
      </PageToolbar>

      <WeekList />
    </Container>
  );
}
