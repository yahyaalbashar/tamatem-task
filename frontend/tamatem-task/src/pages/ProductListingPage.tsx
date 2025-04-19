// src/pages/ProductListingPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/APIClient';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(currentPage, pageSize, locationFilter);
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, [currentPage, pageSize, locationFilter]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value || undefined);
    setCurrentPage(1); // Reset to the first page when applying a filter
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="mb-4 flex justify-between items-center">
        <select
          value={locationFilter || ''}
          onChange={handleLocationFilterChange}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Locations</option>
          <option value="JO">Jordan (JO)</option>
          <option value="SA">Saudi Arabia (SA)</option>
        </select>

        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="px-3 py-2 border rounded-md"
        >
          <option value="10">10 items per page</option>
          <option value="20">20 items per page</option>
          <option value="50">50 items per page</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className="text-sm text-gray-500">Location: {product.location}</p>
              <Link key={product.id} to={`/products/${product.id}`} className="block">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md
                 hover:bg-blue-600 transition-colors"
              >
                Product Detail
              </button>
              </Link>
            </div>
          
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:bg-gray-100"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListingPage;