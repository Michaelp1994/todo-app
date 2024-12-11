import CenterCard from "../components/layouts/CenterCard";
import LoginForm from "../components/forms/LoginForm";
import Card from "../components/ui/Card";

export default function Login() {
  return (
    <CenterCard>
      <Card>
        <h1>Login</h1>
        <LoginForm />
      </Card>
    </CenterCard>
  );
}
