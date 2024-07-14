"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import CreateAccountForm from "./CreateAccountForm"; // Import the CreateAccountForm component
import styles from "./SignInForm.module.css";

const SignInForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false); // State to toggle create account form

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setError(result.error); // Set error message if authentication fails
    } else {
      onClose(); // Close the sign-in form/modal on success
    }
  };

  return (
    <div className={styles.overlay}>
      {showCreateAccount ? (
        <CreateAccountForm onClose={() => setShowCreateAccount(false)} />
      ) : (
        <div className={styles.modal}>
          <span className={styles.closeButton} onClick={onClose}>
            ✖
          </span>
          <h2 className={styles.signInTitle}>Sign In</h2>
          {error && <p className={styles.error}>{error}</p>}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>
          <div className={styles.socialLogin}>
            <button
              onClick={() => signIn("github")}
              className={styles.socialButton}
            >
              Sign in with GitHub
            </button>
            <button
              onClick={() => signIn("google")}
              className={styles.socialButton}
            >
              Sign in with Google
            </button>
          </div>
          <p className={styles.accountOptions}>
            <span onClick={() => setShowCreateAccount(true)}>
              Create an Account
            </span>{" "}
            |
            <span onClick={() => alert("Redirect to Forgot Password")}>
              {" "}
              Forgot Password?
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
