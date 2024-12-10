import { cn } from "../../utils/cn";
import styles from "./Form.module.css";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn(styles.container, className)} {...props}>
      {children}
    </form>
  );
}

interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormActions({
  children,
  className,
  ...props
}: FormActionsProps) {
  return (
    <div className={cn(styles.formActions, className)} {...props}>
      {children}
    </div>
  );
}
