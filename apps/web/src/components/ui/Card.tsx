import React, { forwardRef } from "react";
import styles from "./Card.module.css";
import { cn } from "../../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={cn(styles.card, className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
