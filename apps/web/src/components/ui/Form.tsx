import styles from "./Form.module.css";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, ...props }: FormProps) {
  return (
    <form className={styles.container} {...props}>
      {children}
    </form>
  );
}

interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormActions({ children, ...props }: FormActionsProps) {
  return (
    <div className={styles.formActions} {...props}>
      {children}
    </div>
  );
}
