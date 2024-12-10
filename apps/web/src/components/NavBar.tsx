import { useAuth } from "../contexts/auth/useAuth";
import LogoutButton from "./LogoutButton";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { user } = useAuth();
  return (
    <header className={styles.container}>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/todos">Todos</a>
          </li>
        </ul>
        <ul className={styles.menuList}>
          {user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
