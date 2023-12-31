//API url coms from .env.development file
import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";

function postsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // fetch posts from the API

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw error;
        }
      } catch (error) {
        setError("an error occurred. Awkward...");
        console.log("An error occurred", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default postsList;
