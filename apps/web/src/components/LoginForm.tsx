import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { api } from "../utils/api";
import Form from "./ui/Form";

export default function LoginForm() {
  const utils = api.useUtils();
  const loginMutation = api.auth.login.useMutation({
    async onSuccess() {
      await utils.auth.validate.invalidate();
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
    <Form onSubmit={handleSubmit}>
      <Input
        value={email}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      />
      <Input
        value={password}
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
      />
      <Button disabled={loginMutation.isLoading} type="submit">
        {loginMutation.isLoading ? "Loading..." : "Login"}
      </Button>
      {message && <p>{message}</p>}
    </Form>
  );
}
