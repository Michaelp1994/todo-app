import { cn } from "../../utils/cn";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({ className, ...props }: ButtonProps) {
  return <button className={cn(styles.button, className)} {...props} />;
}
