import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../../utils/api";
import type { RouterOutput } from "@todo/api";
import { Form } from "../ui/Form";

interface UpdateTodoFormProps {
  todo: RouterOutput["todo"]["getAll"][0];
  onFinish(): void;
}

export default function UpdateTodoForm({
  todo,
  onFinish,
}: UpdateTodoFormProps) {
  const utils = api.useUtils();
  const updateMutation = api.todo.update.useMutation({
    async onSuccess() {
      await utils.todo.getAll.invalidate();
      setMessage("Created!");
      onFinish();
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [important, setImportant] = useState(todo.important);
  const [dueDate, setDueDate] = useState(todo.dueDate || "");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateMutation.mutate({
      id: todo.id,
      title,
      description,
      dueDate: dueDate || undefined,
      important,
      completed: false,
      attachmentUrl: "",
      order: 1,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        type="text"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="description"
      />
      <Input
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        label="due date"
        type="date"
      />
      <Input
        checked={important}
        onChange={() => setImportant((value) => !value)}
        label="Important"
        type="checkbox"
      />
      <Button
        type="button"
        onClick={() => onFinish()}
        disabled={updateMutation.isLoading}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={updateMutation.isLoading}>
        {updateMutation.isLoading ? "Loading..." : "Update"}
      </Button>
      {message && <p>{message}</p>}
    </Form>
  );
}
