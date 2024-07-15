"use client";

import { useState } from "react";
import styles from "./CreateAccountForm.module.css";

const CreateAccountForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Reset error state before submission

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        onClose();
      } else {
        setError(data.message || "Error creating account. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error during account creation:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <span className={styles.closeButton} onClick={onClose}>
          ✖
        </span>
        <h2 className={styles.signInTitle}>Create an Account</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountForm;
