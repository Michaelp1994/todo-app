import type React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Welcome to the Login page!</p>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
          />
          <Input
            value={password}
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
