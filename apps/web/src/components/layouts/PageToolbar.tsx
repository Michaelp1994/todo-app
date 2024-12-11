import type React from "react";
import styles from "./PageToolbar.module.css";

export function PageToolbar(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.toolbar} {...props} />;
}

export function PageTitle(props: React.HTMLAttributes<HTMLDivElement>) {
  return <h1 className={styles.title} {...props} />;
}

export function PageSubtitle(props: React.HTMLAttributes<HTMLDivElement>) {
  return <p className={styles.subtitle} {...props} />;
}
