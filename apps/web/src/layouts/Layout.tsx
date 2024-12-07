import { Outlet } from "react-router";
import LogoutButton from "../components/LogoutButton";

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/app">App</a>
            </li>
            <li>
              <a href="/secret">Secret</a>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
