import { Suspense, useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import UpdateTodoForm, { UpdateTodoFormSkeleton } from "./forms/UpdateTodoForm";
import { Pencil } from "@phosphor-icons/react";

interface UpdateTodoModalProps {
  todoId: number;
}

export default function UpdateTodoModal({ todoId }: UpdateTodoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="icon" onClick={() => setIsOpen(true)}>
        <Pencil />
      </Button>
      <Modal open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <h1>Update Todo</h1>
        <Suspense fallback={<UpdateTodoFormSkeleton />}>
          <UpdateTodoForm todoId={todoId} onFinish={() => setIsOpen(false)} />
        </Suspense>
      </Modal>
    </>
  );
}
