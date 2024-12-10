import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { api } from "../../utils/api";
import { Form, FormActions } from "../ui/Form";
export default function RegisterForm() {
  const utils = api.useUtils();

  const registerMutation = api.auth.register.useMutation({
    async onSuccess() {
      await utils.auth.validate.invalidate();
      setMessage("Registered!");
    },
    onError(error) {
      console.error(error);
      setMessage(`Error: ${error.message} `);
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage(`Error: Passwords do not match.`);
      return;
    }
    registerMutation.mutate({ email: email, password });
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
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
      />
      <Input
        value={confirmPassword}
        autoComplete="new-password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        type="password"
      />
      {message && <p>{message}</p>}
      <FormActions>
        <Button type="submit" disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? "Loading..." : "Register"}
        </Button>
      </FormActions>
    </Form>
  );
}
