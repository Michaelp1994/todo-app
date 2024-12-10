import CenteredPage from "../components/CenteredPage";
import LoginForm from "../components/forms/LoginForm";
import Card from "../components/ui/Card";

export default function Login() {
  return (
    <CenteredPage>
      <Card>
        <h1>Login</h1>
        <LoginForm />
      </Card>
    </CenteredPage>
  );
}
