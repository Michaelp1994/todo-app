import { useNavigate } from "react-router";
import { api } from "../../utils/api";
import Button from "../../components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
  const utils = api.useUtils();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logoutMutation = api.auth.logout.useMutation({
    async onSuccess() {
      await utils.auth.validate.invalidate();
      queryClient.clear();
      navigate("/login");
    },
    async onError() {},
  });

  return (
    <Button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isLoading}
    >
      {logoutMutation.isLoading ? "Loading..." : "Logout"}
    </Button>
  );
}
