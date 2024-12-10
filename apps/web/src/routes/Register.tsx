import CenterCard from "../components/layouts/CenterCard";
import RegisterForm from "../components/forms/RegisterForm";
import Card from "../components/ui/Card";

export default function Register() {
  return (
    <CenterCard>
      <Card>
        <h1>Register</h1>
        <RegisterForm />
      </Card>
    </CenterCard>
  );
}
