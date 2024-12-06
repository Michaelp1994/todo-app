import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { api } from "../utils/api";

export default function LoginForm() {
  const loginMutation = api.auth.login.useMutation({
    onSuccess() {
      console.log("User logged in");
      setMessage("User logged in");
    },
    onError(error) {
      console.error(error);
      setMessage("Error: " + error.message);
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate({ email: email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={email}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        label="email"
      />
      <Input
        value={password}
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
      />
      <Button type="submit">Login</Button>
      {message && <p>{message}</p>}
    </form>
  );
}
