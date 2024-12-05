import type React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { api } from "../utils/api";

export default function Login() {
  const loginMutation = api.auth.login.useMutation({
    onSuccess() {
      console.log("User logged in");
    },
    onError(error) {
      console.error(error);
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate({ email: email, password });
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Welcome to the Login page!</p>
      <div>
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
        </form>
      </div>
    </div>
  );
}
