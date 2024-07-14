// components/Header.js
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";
import { useState } from "react";
import SignInForm from "./SignInForm"; // Import the SignInForm component

const Header = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Next App</h1>
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
        <div className={styles.authButtonContainer}>
          {status === "authenticated" ? (
            <img
              src={session.user.image}
              alt="User Avatar"
              className={styles.userAvatar}
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
          ) : (
            <button
              className={styles.authButton}
              onClick={() => setShowSignIn(true)}
            >
              Login
            </button>
          )}
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.userInfo}>
                <p>{session.user.name}</p>
              </div>
              <button onClick={() => signOut()} className={styles.dropdownItem}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
      {showSignIn && <SignInForm onClose={() => setShowSignIn(false)} />}
    </header>
  );
};

export default Header;
