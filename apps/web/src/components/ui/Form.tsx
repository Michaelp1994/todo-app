import styles from "./Form.module.css";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: FormProps) {
  return (
    <form className={styles.container} {...props}>
      {children}
    </form>
  );
}
