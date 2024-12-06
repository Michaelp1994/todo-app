import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { api } from "../utils/api";

export default function RegisterForm() {
  const registerMutation = api.auth.register.useMutation({
    onSuccess() {
      console.log("User logged in");
      setMessage("Registered!");
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    registerMutation.mutate({ email: email, password });
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
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
      />
      <Button type="submit" disabled={registerMutation.isLoading}>
        {registerMutation.isLoading ? "Loading..." : "Register"}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
}
