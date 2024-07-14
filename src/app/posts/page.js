"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Pages() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await res.json();
        setPosts(postsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <main style={{ paddingLeft: "20px" }}>
        <h2>The Page</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
