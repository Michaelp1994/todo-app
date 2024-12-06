import { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
export function AuthLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;
  return user ? <Outlet /> : null;
}
