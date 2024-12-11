import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import CreateTodoForm from "./forms/CreateTodoForm";

export default function CreateTodoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create</Button>
      <Modal open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <h1>Create Todo</h1>
        <CreateTodoForm onFinish={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
