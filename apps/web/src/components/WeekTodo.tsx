import type { RouterOutput } from "@todo/api";
import styles from "./Todo.module.css";
import CompleteTodoButton from "./CompleteTodoButton";
import Card from "./ui/Card";
import { cn } from "../utils/cn";

interface TodoProps {
  todo: RouterOutput["todo"]["getWeek"][0][0];
}

export default function WeekTodo({ todo }: TodoProps) {
  return (
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
    </Card>
  );
}
