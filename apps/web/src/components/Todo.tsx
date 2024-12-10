import type { RouterOutput } from "@todo/api";
import styles from "./Todo.module.css";
import ArchiveTodoButton from "./ArchiveTodoButton";
import CompleteTodoButton from "./CompleteTodoButton";
import Card from "./ui/Card";
import ImportantTodoButton from "./ImportantTodoButton";
import UpdateTodoButton from "./UpdateTodoButton";
import { cn } from "../utils/cn";
import { DotsSixVertical } from "@phosphor-icons/react";

interface TodoProps {
  todo: RouterOutput["todo"]["getAll"][0];
}

export default function Todo({ todo }: TodoProps) {
  return (
    <div className={styles.container}>
      <DotsSixVertical size={32} />
      <Card className={styles.todo}>
        <CompleteTodoButton todoId={todo.id} isComplete={todo.completed} />
        <div className={styles.todoInfo}>
          <h3
            className={cn(
              styles.todoTitle,
              todo.completed && styles.strikeThrough
            )}
          >
            {todo.title}
          </h3>
          <p
            className={cn(
              styles.todoDescription,
              todo.completed && styles.strikeThrough
            )}
          >
            {todo.description}
          </p>
        </div>
        <div className={styles.todoActions}>
          <UpdateTodoButton todoId={todo.id} />
          <ImportantTodoButton todoId={todo.id} important={todo.important} />
          <ArchiveTodoButton todoId={todo.id} />
        </div>
      </Card>
    </div>
  );
}
