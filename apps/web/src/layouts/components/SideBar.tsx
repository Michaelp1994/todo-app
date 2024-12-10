import { Link } from "react-router";
import styles from "./SideBar.module.css";
import { Divider } from "../../components/ui/Divider";
import LogoutButton from "./LogoutButton";

const listItems = [
  {
    href: "/todos",
    label: "Today",
  },
  {
    href: "/todos/important",
    label: "Important",
  },
  {
    href: "/todos/week",
    label: "Next 5 days",
  },
  {
    href: "/todos/archived",
    label: "Archived",
  },
];

export default function SideBar() {
  return (
    <div className={styles.container}>
      <h3 className={styles.menuTitle}>Todos</h3>
      <ul className={styles.menu}>
        {listItems.map((listItem) => (
          <li key={listItem.href}>
            <Link to={listItem.href} className={styles.menuItemLink}>
              {listItem.label}
            </Link>
          </li>
        ))}
      </ul>
      <Divider />
      <h3 className={styles.menuTitle}>Lists</h3>
      <div className={styles.spacer} />
      <div className={styles.bottomContainer}>
        <LogoutButton />
      </div>
    </div>
  );
}
