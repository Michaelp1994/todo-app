import { api } from "../utils/api";
import styles from "./WeekList.module.css";
import WeekTodo from "./WeekTodo";
import { format, parseISO, isToday, isTomorrow } from "date-fns";

const formatDate = (dateKey: string): string => {
  const date = parseISO(dateKey); // Parse the "YYYY-MM-DD" string into a Date object
  if (isToday(date)) {
    return "Today";
  }
  if (isTomorrow(date)) {
    return "Tomorrow";
  }
  return format(date, "eeee, dd/MM/yyyy");
};

export default function WeekList() {
  const { data, isLoading, isError } = api.todo.getWeek.useQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return (
    <div className={styles.container}>
      {Object.entries(data).map(([date, todos]) => {
        return (
          <div className={styles.dayContainer}>
            <h3>{formatDate(date)}</h3>
            {todos.map((todo) => (
              <WeekTodo key={todo.id} todo={todo} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
