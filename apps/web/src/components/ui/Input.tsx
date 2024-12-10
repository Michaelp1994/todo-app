import { useId } from "react";
import styles from "./Input.module.css";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input {...props} id={id} className={cn(styles.input, className)} />
    </div>
  );
}

export function InputSkeleton({ label, className, ...props }: InputProps) {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <Skeleton {...props} className={cn(styles.inputSkeleton, className)} />
    </div>
  );
}
