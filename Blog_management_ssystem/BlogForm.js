import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogForm = ({ fetchBlogs, editBlog }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title);
      setContent(editBlog.content);
      setAuthor(editBlog.author);
      setBlogId(editBlog.id);
      setEditMode(true);
    }
  }, [editBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) {
      alert("All fields are required!");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/blogs/${blogId}`, { title, content, author });
      } else {
        await axios.post("http://localhost:5000/blogs", { title, content, author });
      }

      setTitle("");
      setContent("");
      setAuthor("");
      setEditMode(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h2>{editMode ? "✏ Edit Blog" : "➕ Add New Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="text" className="form-control mb-2" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <button type="submit" className="btn btn-primary">{editMode ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default BlogForm;
