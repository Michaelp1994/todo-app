import { api } from "../utils/api";
import Button from "./ui/Button";

interface DeleteTodoButtonProps {
  children: React.ReactNode;
  todoId: number;
}

export default function DeleteTodoButton({
  children,
  todoId,
}: DeleteTodoButtonProps) {
  const utils = api.useUtils();
  const deleteMutation = api.todo.delete.useMutation({
    async onSuccess() {
      await utils.todo.getAll.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <Button
      onClick={() => deleteMutation.mutate({ id: todoId })}
      disabled={deleteMutation.isLoading}
    >
      {deleteMutation.isLoading ? "Loading..." : children}
    </Button>
  );
}
