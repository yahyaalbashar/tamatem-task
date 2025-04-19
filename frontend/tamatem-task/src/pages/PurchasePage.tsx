// src/pages/PurchasePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { purchaseProduct } from '../services/APIClient';

interface Order {
  id: number;
  product: {
    title: string;
    price: number;
  };
  created_at: string;
}

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = Number(queryParams.get('productId'));

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processPurchase = async () => {
      if (!productId) {
        setError('Invalid product ID.');
        return;
      }

      try {
        const data = await purchaseProduct(productId);
        setOrder(data);
      } catch (err) {
        setError('Failed to complete purchase.');
      }
    };

    processPurchase();
  }, [productId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!order) {
    return <div>Processing your purchase...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Purchase Receipt</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold mb-2">Order ID: {order.id}</p>
        <p className="text-gray-700 mb-2">Product: {order.product.title}</p>
        <p className="text-green-600 font-semibold mb-2">${order.product.price}</p>
        <p className="text-sm text-gray-500">Purchased on: {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <button
        onClick={() => navigate('/products')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Products
      </button>
    </div>
  );
};

export default PurchasePage;