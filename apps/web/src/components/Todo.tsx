import type { RouterOutput } from "@todo/api";
import styles from "./Todo.module.css";
import ArchiveTodoButton from "./ArchiveTodoButton";
import CompleteTodoButton from "./CompleteTodoButton";
import Card from "./ui/Card";
import ImportantTodoButton from "./ImportantTodoButton";
import UpdateTodoModal from "./UpdateTodoModal";
import { cn } from "../utils/cn";
import {
  CalendarBlank,
  DotsSixVertical,
  TagChevron,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import { enAU } from "date-fns/locale";

interface TodoProps {
  todo: RouterOutput["todo"]["getAllToday"][0];
}

export default function Todo({ todo }: TodoProps) {
  return (
    <div className={styles.container}>
      <div style={{ cursor: "grab" }}>
        <DotsSixVertical size={32} />
      </div>

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
          <div className={styles.todoDueDate}>
            <CalendarBlank weight="thin" size={24} />
            <p>
              {todo.dueDate
                ? format(todo.dueDate, "P", { locale: enAU })
                : "N/A"}
            </p>
            <TagChevron weight="thin" size={24} />
            <p>{todo.list ? todo.list.title : "N/A"}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <UpdateTodoModal todoId={todo.id} />
          <ImportantTodoButton todoId={todo.id} important={todo.important} />
          <ArchiveTodoButton todoId={todo.id} />
        </div>
      </Card>
    </div>
  );
}
