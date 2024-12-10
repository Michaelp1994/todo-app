import { useId } from "react";
import styles from "./Checkbox.module.css";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className, ...props }: InputProps) {
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;

  return (
    <div className={styles.container}>
      <input
        {...props}
        id={id}
        type="checkbox"
        className={cn(styles.input, className)}
      />

      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}

export function CheckboxSkeleton({ label, className, ...props }: InputProps) {
  return (
    <div className={styles.container}>
      <Skeleton {...props} className={cn(styles.input, className)} />
      <label className={styles.label}>{label}</label>
    </div>
  );
}
