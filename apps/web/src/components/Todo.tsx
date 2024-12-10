import type { RouterOutput } from "@todo/api";
import styles from "./Todo.module.css";
import UpdateTodoForm from "./forms/UpdateTodoForm";
import { useState } from "react";
import Button from "./ui/Button";
import ArchiveTodoButton from "./ArchiveTodoButton";
import CompleteTodoButton from "./CompleteTodoButton";
import DeleteTodoButton from "./DeleteTodoButton";
import Card from "./ui/Card";

interface TodoProps {
  todo: RouterOutput["todo"]["getAll"][0];
}

export default function Todo({ todo }: TodoProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  if (isUpdating) {
    return (
      <Card>
        <UpdateTodoForm todo={todo} onFinish={() => setIsUpdating(false)} />
      </Card>
    );
  }
  return (
    <Card>
      <h3>Title: {todo.title}</h3>
      <p>Description: {todo.description}</p>
      <p>Due Date: {todo.dueDate}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <p>Important: {todo.important ? "Yes" : "No"}</p>
      <div className={styles.buttonRow}>
        {!todo.completed && (
          <CompleteTodoButton todoId={todo.id}>Complete</CompleteTodoButton>
        )}
        <Button onClick={() => setIsUpdating((value) => !value)}>Update</Button>
        <ArchiveTodoButton todoId={todo.id}>Archive</ArchiveTodoButton>
        <DeleteTodoButton todoId={todo.id}>Delete</DeleteTodoButton>
      </div>
    </Card>
  );
}
