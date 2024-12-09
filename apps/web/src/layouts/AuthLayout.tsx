import { useEffect } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
export function AuthLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
}
