import CreateTodoModal from "./CreateTodoModal";
import Card from "./ui/Card";
import styles from "./NoTodosCard.module.css";
export default function NoTodosCard() {
  return (
    <Card>
      <div className={styles.container}>
        <h2 className={styles.title}>Nothing left to do?</h2>
        <p className={styles.subtitle}>
          You're unstoppable! Ready to add more todos and keep the momentum
          going?
        </p>
        <div className={styles.buttonWrapper}>
          <CreateTodoModal />
        </div>
      </div>
    </Card>
  );
}
