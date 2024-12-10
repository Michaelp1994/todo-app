import { useId } from "react";
import styles from "./Input.module.css";
import { cn } from "../../utils/cn";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} className={cn(styles.input, className)} />
    </div>
  );
}
