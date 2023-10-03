import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";

function EditPostForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch the current post by id
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
          const json = response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (error) {
        console.error("An error occurred: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
      fetchCurrentPost();
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.prevenDefault();

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post.title,
          body: post.body,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  // if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Edit post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title</label>
          <br />
          <input
            type="text"
            id="post-title"
            value={post?.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="post-body">Body</label>
          <br />
          <textarea
            type="text"
            id="post-body"
            value={post?.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          ></textarea>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
