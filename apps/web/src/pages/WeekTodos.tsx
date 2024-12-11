import CreateTodoModal from "../components/CreateTodoModal";
import Container from "../components/layouts/Container";
import {
  PageSubtitle,
  PageTitle,
  PageToolbar,
} from "../components/layouts/PageToolbar";
import WeekList from "../components/WeekList";
export default function WeekTodos() {
  return (
    <Container>
      <PageToolbar>
        <div>
          <PageTitle>Week</PageTitle>
          <PageSubtitle>For the week of ...</PageSubtitle>
        </div>
        <CreateTodoModal />
      </PageToolbar>

      <WeekList />
    </Container>
  );
}
