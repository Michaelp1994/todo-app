import { useNavigate } from "react-router";
import { api } from "../../utils/api";
import Button from "../../components/ui/Button";

export default function LogoutButton() {
  const utils = api.useUtils();
  const navigate = useNavigate();
  const logoutMutation = api.auth.logout.useMutation({
    async onSuccess() {
      await utils.auth.validate.invalidate();
      navigate("/login");
    },
    async onError() {},
  });

  return (
    <Button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isLoading}
    >
      {logoutMutation.isLoading ? "loading..." : "Logout"}
    </Button>
  );
}
