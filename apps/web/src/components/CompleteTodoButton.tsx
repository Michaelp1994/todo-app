import { CheckCircle, Circle } from "@phosphor-icons/react";
import { api } from "../utils/api";
import Button from "./ui/Button";

interface CompleteTodoButtonProps {
  todoId: number;
  isComplete: boolean;
}

export default function CompleteTodoButton({
  todoId,
  isComplete,
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
      onClick={() =>
        completeMutation.mutate({ id: todoId, completed: !isComplete })
      }
      disabled={completeMutation.isLoading}
      variant="icon"
    >
      {isComplete ? <CheckCircle size={24} /> : <Circle size={24} />}
    </Button>
  );
}
