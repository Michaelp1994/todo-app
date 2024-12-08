import { api } from "../utils/api";
import Button from "./ui/Button";

interface CompleteTodoButtonProps {
  children: React.ReactNode;
  todoId: number;
}

export default function CompleteTodoButton({
  children,
  todoId,
}: CompleteTodoButtonProps) {
  const utils = api.useUtils();
  const completeMutation = api.todo.update.useMutation({
    async onSuccess() {
      await utils.todo.getAll.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <Button
      onClick={() => completeMutation.mutate({ id: todoId, completed: true })}
      disabled={completeMutation.isLoading}
    >
      {completeMutation.isLoading ? "Loading..." : children}
    </Button>
  );
}
