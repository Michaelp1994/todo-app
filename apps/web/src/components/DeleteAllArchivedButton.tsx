import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { FormActions } from "./ui/Form";
import { api } from "../utils/api";

export default function DeleteAllArchivedButton() {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = api.todo.deleteAllArchived.useMutation({
    async onSuccess() {
      await utils.todo.getAllToday.invalidate();
      setIsOpen(false);
    },
    onError() {},
  });
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete All</Button>
      <Modal open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <h1>Delete All</h1>
        <h3>Are you sure?</h3>
        <FormActions>
          <Button onClick={() => setIsOpen(false)}>No</Button>
          <Button
            onClick={() => deleteMutation.mutate({})}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "Loading..." : "Yes"}
          </Button>
        </FormActions>
      </Modal>
    </>
  );
}
