import type React from "react";
import styles from "./CenterCard.module.css";

interface CenterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}

export default function CenterCard({ children, ...props }: CenterCardProps) {
  return (
    <main className={styles.container} {...props}>
      <div className={styles.innerContainer}>{children}</div>
    </main>
  );
}
