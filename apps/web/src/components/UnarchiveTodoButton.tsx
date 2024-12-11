import { BoxArrowUp } from "@phosphor-icons/react";
import { api } from "../utils/api";
import Button from "./ui/Button";

interface ArchiveTodoButtonProps {
  todoId: number;
}

export default function UnarchiveTodoButton({
  todoId,
}: ArchiveTodoButtonProps) {
  const utils = api.useUtils();
  const unarchiveMutation = api.todo.unarchive.useMutation({
    async onSuccess() {
      await utils.todo.getAllToday.invalidate();
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <Button
      variant="icon"
      onClick={() => unarchiveMutation.mutate({ id: todoId })}
      disabled={unarchiveMutation.isLoading}
    >
      <BoxArrowUp />
    </Button>
  );
}
