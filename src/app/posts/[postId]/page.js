"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";

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

// Function to update post view information
async function updatePostView(postId) {
  try {
    const res = await fetch(`/backend/server`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update post view");
    }
  } catch (error) {
    console.error("Error updating post view:", error);
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
        // Update post view information when post is viewed
        await updatePostView(postId); // Wait for update to complete
      } catch (error) {
        console.error("Error fetching or updating post:", error);
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
      <main>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>Views: {post.views}</p>
        <p>Last viewed: {new Date(post.lastViewedAt).toLocaleString()}</p>
      </main>
      <Footer />
    </div>
  );
}
