import { cn } from "../../utils/cn";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
}

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantStyles =
    variant === "primary"
      ? styles.primaryButton
      : variant === "secondary"
        ? styles.secondary
        : styles.iconButton;
  return (
    <button
      className={cn(styles.baseButton, variantStyles, className)}
      {...props}
    />
  );
}
