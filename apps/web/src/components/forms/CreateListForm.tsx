import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../../utils/api";
import { Form, FormActions } from "../ui/Form";

interface CreateTodoFormProps {
  onFinish(): void;
}

export default function CreateTodoForm({ onFinish }: CreateTodoFormProps) {
  const utils = api.useUtils();
  const createMutation = api.list.create.useMutation({
    async onSuccess() {
      await utils.list.getAll.invalidate();
      setMessage("Created!");
      onFinish();
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate({
      title,
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

      {message && <p>{message}</p>}

      <FormActions>
        <Button type="submit" disabled={createMutation.isLoading}>
          {createMutation.isLoading ? "Loading..." : "Create"}
        </Button>
      </FormActions>
    </Form>
  );
}
