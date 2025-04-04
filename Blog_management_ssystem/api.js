const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
  
      // Check if response is an array, else fallback to empty array
      const blogsData = Array.isArray(response.data) ? response.data 
                     : Array.isArray(response.data.blogs) ? response.data.blogs 
                     : [];
  
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);  // Prevent errors if the request fails
    }
  };
  