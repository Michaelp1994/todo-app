import { Trash } from "@phosphor-icons/react";
import { api } from "../utils/api";
import Button from "./ui/Button";

interface DeleteTodoButtonProps {
  todoId: number;
}

export default function DeleteTodoButton({ todoId }: DeleteTodoButtonProps) {
  const utils = api.useUtils();
  const deleteMutation = api.todo.delete.useMutation({
    async onSuccess() {
      await utils.todo.getAllToday.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <Button
      onClick={() => deleteMutation.mutate({ id: todoId })}
      disabled={deleteMutation.isLoading}
      variant="icon"
    >
      <Trash />
    </Button>
  );
}
