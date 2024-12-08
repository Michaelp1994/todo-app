import type { RouterOutput } from "@todo/api";
import styles from "./Todo.module.css";

interface TodoProps {
  todo: RouterOutput["todo"]["getAll"][0];
}

export default function Todo({ todo }: TodoProps) {
  return (
    <div className={styles.todo}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Due: {todo.dueDate}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <p>Important: {todo.important ? "Yes" : "No"}</p>
    </div>
  );
}
