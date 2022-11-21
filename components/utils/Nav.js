import Link from "next/link";
import navStyles from "../../styles/Nav.module.css";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/characters">Characters</Link>
        </li>
        <li>
          <Link href="/locations">Locations</Link>
        </li>
        <li>
          <Link href="/episodes">Episodes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
