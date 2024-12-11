import ArchivedTodoList from "../components/ArchivedTodoList";
import DeleteAllArchivedButton from "../components/DeleteAllArchivedButton";
import Container from "../components/layouts/Container";
import {
  PageSubtitle,
  PageTitle,
  PageToolbar,
} from "../components/layouts/PageToolbar";

export default function ArchivedTodos() {
  return (
    <Container>
      <PageToolbar>
        <div>
          <PageTitle>Archived</PageTitle>
          <PageSubtitle></PageSubtitle>
        </div>
        <DeleteAllArchivedButton />
      </PageToolbar>
      <ArchivedTodoList />
    </Container>
  );
}
