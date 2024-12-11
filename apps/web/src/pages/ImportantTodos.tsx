import CreateTodoModal from "../components/CreateTodoModal";
import ImportantTodoList from "../components/ImportantTodoList";
import Container from "../components/layouts/Container";
import {
  PageSubtitle,
  PageTitle,
  PageToolbar,
} from "../components/layouts/PageToolbar";

export default function ImportantTodos() {
  return (
    <Container>
      <PageToolbar>
        <div>
          <PageTitle>Important</PageTitle>
          <PageSubtitle>
            Only todos marked as important will be shown here.
          </PageSubtitle>
        </div>
        <CreateTodoModal />
      </PageToolbar>
      <ImportantTodoList />
    </Container>
  );
}
