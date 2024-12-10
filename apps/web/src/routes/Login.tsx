import CenteredPage from "../components/CenteredPage";
import LoginForm from "../components/LoginForm";
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
