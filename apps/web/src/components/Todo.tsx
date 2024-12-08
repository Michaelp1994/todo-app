import type { RouterOutput } from "@todo/api";
import styles from "./Todo.module.css";
import UpdateTodoForm from "./UpdateTodoForm";
import { useState } from "react";
import Button from "./ui/Button";
import ArchiveTodoButton from "./ArchiveTodoButton";
import CompleteTodoButton from "./CompleteTodoButton";

interface TodoProps {
  todo: RouterOutput["todo"]["getAll"][0];
}

export default function Todo({ todo }: TodoProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  if (isUpdating) {
    return <UpdateTodoForm todo={todo} onFinish={() => setIsUpdating(false)} />;
  }
  return (
    <div className={styles.todo}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Due: {todo.dueDate}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <p>Important: {todo.important ? "Yes" : "No"}</p>
      {!todo.completed && (
        <CompleteTodoButton todoId={todo.id}>Complete</CompleteTodoButton>
      )}
      <Button onClick={() => setIsUpdating((value) => !value)}>Update</Button>
      <ArchiveTodoButton todoId={todo.id}>Archive</ArchiveTodoButton>
    </div>
  );
}
