import React, { useEffect, useState } from 'react';
import './index.css';

const StarRating = ({ rating }) => {
  const stars = Math.round(rating * 2) / 2;

  const renderStars = () => {
    const starArray = [];
    for (let i = 1; i <= Math.floor(stars); i++) {
      starArray.push(<span key={`star-${i}`}>⭐</span>);
    }
    if (stars % 1 !== 0) {
      starArray.push(<span key="half-star">⭐½</span>);
    }
    return starArray;
  };

  return (
    <div className="product-rating">
      <div className="stars">{renderStars()}</div>
      <span className="rating-number">({rating})</span>
    </div>
  );
};

function App() {
  const [data, setData] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/products');
      const json = await res.json();
      setData(json);
      setError(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div className="App">
      <h1>List of Products</h1>
      <ol className="products-list">
        {data?.products?.map((product) => (
          <li key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-price">${product.price}</div>
              <div className="product-brand">${product.brand}</div>
              <div className="product-category">${product.category}</div>
              <div className="product-stock">${product.stock}</div>
              <div className="product-id">${product.id}</div>
              <div className="product-discountPercentage">${product.discountPercentage}</div>
              
              <StarRating rating={product.rating} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
