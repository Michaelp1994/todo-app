import React from "react";
import styles from "./Modal.module.css";
import Button from "./Button";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
  onOpenChange(): void;
}

export default function Modal({
  children,
  onOpenChange,
  open,
  ...props
}: ModalProps) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles.container} onClick={onOpenChange}>
      <dialog
        className={styles.modal}
        open
        {...props}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          variant="icon"
          className={styles.closeButton}
          onClick={onOpenChange}
        >
          <X />
        </Button>
        {children}
      </dialog>
    </div>,
    document.body
  );
}
