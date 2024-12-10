import CenteredPage from "../components/CenteredPage";
import RegisterForm from "../components/forms/RegisterForm";
import Card from "../components/ui/Card";

export default function Register() {
  return (
    <CenteredPage>
      <Card>
        <h1>Register</h1>
        <RegisterForm />
      </Card>
    </CenteredPage>
  );
}
