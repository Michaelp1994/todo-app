import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { api } from "../utils/api";
import NoTodosCard from "./NoTodosCard";
import Todo from "./Todo";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const { data, isLoading, isError } = api.todo.getAllToday.useQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  if (data.length === 0) {
    return <NoTodosCard />;
  }
  return (
    <div className={styles.todoList}>
      <DndProvider backend={HTML5Backend}>
        {data.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </DndProvider>
    </div>
  );
}
