import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, onDelete, onUpdate }) => {
  return (
    <div>
      <h4 className="text-center">Blog Posts</h4>
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} onDelete={onDelete} onUpdate={onUpdate} />)
      ) : (
        <p className="text-center">No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;
