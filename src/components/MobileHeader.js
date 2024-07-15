// components/MobileHeader.js
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./MobileHeader.module.css"; // Update with your mobile styles
import { useState } from "react";

const MobileHeader = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDeleteAccount = async () => {
    const response = await fetch("/api/auth/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Account deleted successfully!");
      signOut(); // Log out after deletion
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <header className={styles.mobileHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Next App</h1>
        <div className={styles.authButtonContainer}>
          {status === "authenticated" ? (
            <>
              <img
                src={session.user.image}
                alt="User Avatar"
                className={styles.userAvatar}
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.userInfo}>
                    <p>Signed in as {session.user.name}</p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className={styles.dropdownItem}
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={() => signOut()}
                    className={styles.dropdownItem}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button className={styles.authButton} onClick={() => signIn()}>
              Login
            </button>
          )}
        </div>
      </div>
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
    </header>
  );
};

export default MobileHeader;
