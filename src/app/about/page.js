// pages/about.js
"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./About.module.css"; // Import the CSS module

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setData({ message: "Error fetching data" });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.mainContent}>
        <h2>API Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
      <Footer />
    </div>
  );
}
