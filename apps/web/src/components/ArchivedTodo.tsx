import type { RouterOutput } from "@todo/api";
import styles from "./ArchivedTodo.module.css";
import Card from "./ui/Card";

import { cn } from "../utils/cn";
import DeleteTodoButton from "./DeleteTodoButton";
import UnarchiveTodoButton from "./UnarchiveTodoButton";

interface TodoProps {
  todo: RouterOutput["todo"]["getAllToday"][0];
}

export default function ArchivedTodo({ todo }: TodoProps) {
  return (
    <div className={styles.container}>
      <Card className={styles.todo}>
        <div className={styles.todoInfo}>
          <h3 className={cn(styles.todoTitle)}>{todo.title}</h3>
          <p className={cn(styles.todoDescription)}>{todo.description}</p>
        </div>
        <div className={styles.todoActions}>
          <UnarchiveTodoButton todoId={todo.id} />
          <DeleteTodoButton todoId={todo.id} />
        </div>
      </Card>
    </div>
  );
}
