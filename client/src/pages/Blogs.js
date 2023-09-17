import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const pageStyle = {
    background: "linear-gradient(to right, #00ddff, #00ff8f)",
    minHeight: "100vh", // Set the minimum height to fill the entire viewport
    display: "flex",
    flexDirection: "column", // Added to stack the blog cards
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={pageStyle}>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
            style={{ backgroundColor: "#e100ff" }} // Add this line
          />
        ))}
    </div>
  );
};

export default Blogs;
