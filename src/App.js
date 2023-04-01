import React, { useState } from 'react';
import ProductList from './ProductList';
import './styles.css';
import { useLocalStorage } from 'react-use';

function App() {
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 ">Shopping Cart</h1>
      <ProductList
      />
    </div>
  );
}

export default App;