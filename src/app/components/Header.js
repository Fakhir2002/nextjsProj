// components/Header.js
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>I am a Header</h1>
        <nav className={styles.navLinks}>
          <Link href="/" passHref>
            <div className={styles.navLink}>Home</div>
          </Link>
          <Link href="/about" passHref>
            <div className={styles.navLink}>About</div>
          </Link>
          <Link href="/posts" passHref>
            <div className={styles.navLink}>Posts</div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
