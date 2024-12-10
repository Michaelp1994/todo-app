import { Trash } from "@phosphor-icons/react";
import { api } from "../utils/api";
import Button from "./ui/Button";

interface ArchiveTodoButtonProps {
  todoId: number;
}

export default function ArchiveTodoButton({ todoId }: ArchiveTodoButtonProps) {
  const utils = api.useUtils();
  const archiveMutation = api.todo.archive.useMutation({
    async onSuccess() {
      await utils.todo.getAll.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <Button
      variant="icon"
      onClick={() => archiveMutation.mutate({ id: todoId })}
      disabled={archiveMutation.isLoading}
    >
      <Trash />
    </Button>
  );
}
