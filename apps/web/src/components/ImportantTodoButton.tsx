import { Star } from "@phosphor-icons/react";
import { api } from "../utils/api";
import Button from "./ui/Button";

interface ImportantTodoButtonProps {
  todoId: number;
  important: boolean;
}

export default function ImportantTodoButton({
  todoId,
  important,
}: ImportantTodoButtonProps) {
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
        completeMutation.mutate({ id: todoId, important: !important })
      }
      disabled={completeMutation.isLoading}
      variant="icon"
    >
      <Star weight={important ? "fill" : "regular"} />
    </Button>
  );
}
