import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Outlet />
    </div>
  );
}
