import { useState, useEffect } from "react";
import "./GalleryPagination.css";

const GalleryPagination = ({ itemsPerPage = 10, totalItems = 100 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Fetch dynamic images from an API
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        setImages(data.map((item) => item.download_url));
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [currentPage, itemsPerPage, totalItems]);

  useEffect(() => {
    // Fetch a random background image
    const fetchBackground = async () => {
      try {
        const response = await fetch("https://source.unsplash.com/random/1920x1080");
        setBackgroundImage(response.url);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };
    fetchBackground();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2 className="title">Dynamic Image Gallery</h2>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="image-wrapper">
              <img src={image} alt={`Image ${index + 1}`} className="image-item" />
            </div>
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
      <div className="pagination-controls">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
          &laquo; Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => goToPage(i + 1)} className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button">
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default GalleryPagination;