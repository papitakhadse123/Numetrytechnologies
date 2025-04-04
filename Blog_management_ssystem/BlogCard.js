import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const BlogCard = ({ blog, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editContent, setEditContent] = useState(blog.content);
  const [editAuthor, setEditAuthor] = useState(blog.author);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/blogs/${blog.id}`, {
        title: editTitle,
        content: editContent,
        author: editAuthor,
      });

      onUpdate(blog.id, editTitle, editContent, editAuthor);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="card p-3 mb-3">
      {isEditing ? (
        <>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="form-control mb-2" />
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="form-control mb-2" />
          <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} className="form-control mb-2" />
          <button className="btn btn-success" onClick={handleUpdate}>Save</button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p><strong>Author:</strong> {blog.author}</p>
          <FaEdit onClick={() => setIsEditing(true)} className="text-primary cursor-pointer" />
          <FaTrash onClick={() => onDelete(blog.id)} className="text-danger cursor-pointer" />
        </>
      )}
    </div>
  );
};

export default BlogCard;
