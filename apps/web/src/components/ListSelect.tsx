import { api } from "../utils/api";
import Select from "./ui/Select";

interface ListSelectProps {
  value: string;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

export default function ListSelect({ value, onChange }: ListSelectProps) {
  const [options] = api.list.getAll.useSuspenseQuery({});
  return (
    <Select label="List" value={value} onChange={onChange}>
      <option value="">N/A</option>
      {options.map((option) => (
        <option value={option.id}>{option.title}</option>
      ))}
    </Select>
  );
}
