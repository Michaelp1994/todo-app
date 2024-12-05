import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  const uniqueId = useId();
  const id = props.id ? props.id : uniqueId;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} />
    </div>
  );
}
