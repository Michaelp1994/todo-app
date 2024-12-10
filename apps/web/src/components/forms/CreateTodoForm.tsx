import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../../utils/api";
import { Form, FormActions } from "../ui/Form";

export default function CreateTodoForm() {
  const utils = api.useUtils();
  const createMutation = api.todo.create.useMutation({
    async onSuccess() {
      await utils.todo.getAll.invalidate();
      setMessage("Created!");
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate({
      title,
      description,
      dueDate,
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
      {message && <p>{message}</p>}

      <FormActions>
        <Button type="submit" disabled={createMutation.isLoading}>
          {createMutation.isLoading ? "Loading..." : "Create"}
        </Button>
      </FormActions>
    </Form>
  );
}
