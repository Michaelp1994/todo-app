import { redirect, useParams } from "react-router";
import Container from "../components/layouts/Container";
import {
  PageSubtitle,
  PageTitle,
  PageToolbar,
} from "../components/layouts/PageToolbar";
import ListTodoList from "../components/ListTodoList";

export default function ListTodos() {
  const { slug } = useParams();
  if (!slug) {
    throw redirect("/todos");
  }
  return (
    <Container>
      <PageToolbar>
        <div>
          <PageTitle>List</PageTitle>
          <PageSubtitle></PageSubtitle>
        </div>
      </PageToolbar>
      <ListTodoList slug={slug} />
    </Container>
  );
}
