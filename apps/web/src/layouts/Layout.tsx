import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
