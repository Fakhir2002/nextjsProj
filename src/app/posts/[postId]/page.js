// src/app/posts/[postId]/page.js

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";

// Function to fetch post data
async function fetchPost(postId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

// Component to display post details
export default async function PostPage({ params }) {
  const { postId } = params;
  const post = await fetchPost(postId);

  return (
    <div>
      <Header />
      <main>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </main>
      <Footer />
    </div>
  );
}

// Optional: Pre-generate static params for certain posts
export async function generateStaticParams() {
  // Fetch a list of posts and return their IDs
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.map((post) => ({
    postId: String(post.id), // Ensure postId is a string
  }));
}
