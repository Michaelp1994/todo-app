import type React from "react";
import styles from "./Select.module.css";
import { cn } from "../../utils/cn";
import { useId } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function Select({ className, label, ...props }: SelectProps) {
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={cn(styles.select, className)} {...props} />
    </div>
  );
}
