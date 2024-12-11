import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../../utils/api";
import { Form, FormActions } from "../ui/Form";
import Checkbox from "../ui/Checkbox";
import { CalendarMinus, CalendarPlus } from "@phosphor-icons/react";
import ListSelect from "../ListSelect";

interface CreateTodoFormProps {
  onFinish(): void;
}

export default function CreateTodoForm({ onFinish }: CreateTodoFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const utils = api.useUtils();
  const createMutation = api.todo.create.useMutation({
    async onSuccess() {
      await utils.todo.getAllToday.invalidate();
      setMessage("Created!");
      onFinish();
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [dueDate, setDueDate] = useState<string>(today);
  const [hasDueDate, setHasDueDate] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [listId, setListId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate({
      title,
      description: description ? description : null,
      dueDate: hasDueDate ? dueDate : null,
      important,
      listId: listId ? Number(listId) : null,
      completed: false,
      attachmentUrl: "",
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
        label="Description"
      />
      <ListSelect value={listId} onChange={(e) => setListId(e.target.value)} />
      {hasDueDate && (
        <Input
          disabled={!hasDueDate}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          label="Due Date"
          type="date"
        />
      )}

      <Checkbox
        checked={important}
        onChange={() => setImportant((value) => !value)}
        label="Important"
      />
      {message && <p>{message}</p>}

      <FormActions>
        <Button
          variant="icon"
          type="button"
          onClick={() => setHasDueDate((val) => !val)}
        >
          {hasDueDate ? (
            <CalendarMinus size={24} />
          ) : (
            <CalendarPlus size={24} />
          )}
        </Button>
        <Button type="submit" disabled={createMutation.isLoading}>
          {createMutation.isLoading ? "Loading..." : "Create"}
        </Button>
      </FormActions>
    </Form>
  );
}
