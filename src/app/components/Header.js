// components/Header.js
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>I am a Header</h1>
      <nav>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/posts" className={styles.navLink}>
          Posts
        </Link>
      </nav>
    </header>
  );
};

export default Header;
