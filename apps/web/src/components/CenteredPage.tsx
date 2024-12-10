import type React from "react";
import styles from "./CenteredPage.module.css";

interface CenteredPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}

export default function CenteredLayout({
  children,
  ...props
}: CenteredPageProps) {
  return (
    <main className={styles.container} {...props}>
      {children}
    </main>
  );
}
