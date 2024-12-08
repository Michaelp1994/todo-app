import { useAuth } from "../contexts/auth/useAuth";
import LogoutButton from "./LogoutButton";

export default function NavBar() {
  const { user } = useAuth();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/todos">Todos</a>
          </li>
          <li>
            {user ? (
              <LogoutButton />
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
          </li>
        </ul>
      </nav>
    </header>
  );
}
