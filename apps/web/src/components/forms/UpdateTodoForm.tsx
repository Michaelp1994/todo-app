import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../../utils/api";
import { Form, FormActions } from "../ui/Form";
import { ButtonSkeleton } from "../ui/Button";
import { InputSkeleton } from "../ui/Input";
import Checkbox, { CheckboxSkeleton } from "../ui/Checkbox";
import { CalendarMinus, CalendarPlus } from "@phosphor-icons/react";
import ListSelect from "../ListSelect";
interface UpdateTodoFormProps {
  todoId: number;
  onFinish(): void;
}

export default function UpdateTodoForm({
  todoId,
  onFinish,
}: UpdateTodoFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const utils = api.useUtils();
  const [todo] = api.todo.getById.useSuspenseQuery({ id: todoId });
  const updateMutation = api.todo.update.useMutation({
    async onSuccess() {
      await utils.todo.getById.invalidate();
      await utils.todo.getAllToday.invalidate();
      setMessage("Created!");
      onFinish();
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });

  const [title, setTitle] = useState(todo.title);
  const [listId, setListId] = useState(todo.listId ? String(todo.listId) : "");
  const [description, setDescription] = useState(todo.description || "");
  const [important, setImportant] = useState(todo.important);
  const [dueDate, setDueDate] = useState(todo.dueDate || today);
  const [message, setMessage] = useState("");
  const [hasDueDate, setHasDueDate] = useState<boolean>(!!todo.dueDate);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateMutation.mutate({
      id: todo.id,
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
      {hasDueDate && (
        <Input
          disabled={!hasDueDate}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          label="Due Date"
          type="date"
        />
      )}
      <ListSelect value={listId} onChange={(e) => setListId(e.target.value)} />
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
      </FormActions>
    </Form>
  );
}

export function UpdateTodoFormSkeleton() {
  return (
    <Form>
      <InputSkeleton label="Title" />
      <InputSkeleton label="Description" />
      <InputSkeleton label="Due Date" />
      <InputSkeleton label="List" />
      <CheckboxSkeleton label="Important" />
      <FormActions>
        <ButtonSkeleton>Cancel</ButtonSkeleton>
        <ButtonSkeleton>Update</ButtonSkeleton>
      </FormActions>
    </Form>
  );
}
