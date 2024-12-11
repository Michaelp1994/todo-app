import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import CreateListForm from "./forms/CreateListForm";
import { ListPlus } from "@phosphor-icons/react";

export default function CreateListModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="icon" onClick={() => setIsOpen(true)}>
        <ListPlus size={24} />
      </Button>
      <Modal open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <h1>Create List</h1>
        <CreateListForm onFinish={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
