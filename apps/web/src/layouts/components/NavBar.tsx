import { useAuth } from "../../contexts/auth/useAuth";
import LogoutButton from "./LogoutButton";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router";
const menuItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/todos",
    label: "Todos",
  },
];

export default function NavBar() {
  const { user } = useAuth();
  return (
    <header className={styles.container}>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          {menuItems.map((menuItem) => (
            <li className={styles.menuListItem} key={menuItem.href}>
              <NavLink to={menuItem.href} className={styles.menuListItemLink}>
                {menuItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={styles.menuList}>
          {user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <>
              <li className={styles.menuListItem}>
                <Link to="/login" className={styles.menuListItemLink}>
                  Login
                </Link>
              </li>
              <li className={styles.menuListItem}>
                <Link to="/register" className={styles.menuListItemLink}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
