import type React from "react";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, ...props }: CardProps) {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
}
