import { api } from "../utils/api";
import Button from "./ui/Button";

interface ArchiveTodoButtonProps {
  children: React.ReactNode;
  todoId: number;
}

export default function ArchiveTodoButton({
  children,
  todoId,
}: ArchiveTodoButtonProps) {
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
      onClick={() => archiveMutation.mutate({ id: todoId })}
      disabled={archiveMutation.isLoading}
    >
      {archiveMutation.isLoading ? "Loading..." : children}
    </Button>
  );
}
