interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor="input">{label}</label>
      <input {...props} />
    </div>
  );
}
