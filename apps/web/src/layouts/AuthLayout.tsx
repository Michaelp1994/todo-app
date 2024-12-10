import { useEffect } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";
import SideBar from "./components/SideBar";

export function AuthLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return;
  }

  return (
    <div className={styles.container}>
      <SideBar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
