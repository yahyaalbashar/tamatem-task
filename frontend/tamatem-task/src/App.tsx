// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PurchasePage from './pages/PurchasePage';
import ProtectedRoute from './components/ProtectedRoute';
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider> {/* Wrap AuthProvider inside the Router */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/purchase" element={<PurchasePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;