import { Pencil } from "@phosphor-icons/react";
import { api } from "../utils/api";
import Button from "./ui/Button";

interface UpdateTodoButtonProps {
  todoId: number;
}

export default function UpdateTodoButton({ todoId }: UpdateTodoButtonProps) {
  const utils = api.useUtils();
  return (
    <Button variant="icon">
      <Pencil />
    </Button>
  );
}
