// src/pages/ProductDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails } from '../services/APIClient';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductDetails(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
      }
    };

    loadProductDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    // Navigate to the purchase page with the product ID
    navigate(`/purchase?productId=${product.id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-green-600 font-semibold mb-2">${product.price}</p>
        <p className="text-sm text-gray-500">Location: {product.location}</p>
      </div>

      <button
        onClick={handleBuy}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetailsPage;