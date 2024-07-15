// pages/posts/[postId].js
"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React, { useEffect, useState } from "react";
import styles from "./PostPage.module.css"; // Import the CSS module

// Function to fetch post data
async function fetchPost(postId) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Re-throw the error to propagate it upwards
  }
}

// Component to display post details
export default function PostPage({ params }) {
  const { postId } = params;
  const [post, setPost] = useState(null);

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPost(postId);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.mainContent}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </main>
      <Footer />
    </div>
  );
}
