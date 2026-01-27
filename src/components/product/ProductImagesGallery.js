import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import imageBase from '../../constants/imageBase';
import defaultImage from '../../assets/images/noimage.png';

const ProductImagesGallery = ({ product, productImages }) => {
  // Default to the first image
  const [mainImage, setMainImage] = useState(productImages[0]);

  // Handle thumbnail click to update main image
  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  // Responsive settings for the carousel
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      {/* Main Image Display */}
      <div style={{ marginBottom: '12px' }}>
        <img
          src={mainImage ? `${imageBase}${mainImage}` : defaultImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          alt="Main Product"
          style={{
            width: '100%',
            height: '400px', // Fixed height
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* Gallery Slider */}
      <Carousel
        responsive={responsive}
        arrows={true}
        showDots={false}
        itemClass="gallery-item"
        containerClass="carousel-container"
      >
        {productImages?.map((img, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(img)}
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              overflow: 'hidden',
              border: mainImage === img ? '2px solid #a020f0' : '2px solid transparent',
              transition: 'border 0.3s ease-in-out',
              marginRight: '8px', // Gap between thumbnails
            }}
          >
            <img
              src={img ? `${imageBase}${img}` : defaultImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
              alt={`Thumbnail ${index}`}
              style={{
                width: '100px', // Fixed thumbnail width
                height: '100px', // Fixed thumbnail height
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImagesGallery;
