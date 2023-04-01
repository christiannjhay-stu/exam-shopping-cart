import React, { useState } from 'react';
import productsData from './data';


function ProductList() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState("");
  

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity === 1) {
        const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        setCartItems(updatedCartItems);
      }
    }
  };
  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  }; // add category filter change handler

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  

  const filteredProducts = productsData.filter((product) => {
    const searchTermMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryFilterMatch =
      categoryFilter === "" || product.category === categoryFilter; // add category filter match

    return searchTermMatch && categoryFilterMatch;
  });
  

  return (
  
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md mr-4"
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
            <button
      onClick={() => {
        setSearchTerm("");
        
      }}
      
      className="px-2 py-1 rounded-md bg-gray-500 text-white"
    >
      Clear
    </button>

    <label htmlFor="categoryFilter" className="mr-4 ml-4">
        Category:
      </label>
      <select
        id="categoryFilter"
        value={categoryFilter}
        onChange={handleCategoryFilterChange}
        className="border p-2"
      >
        <option value="">All</option>
        <option value="Processor">Processor</option>
        <option value="Headset">Headset</option>
        <option value="Monitor">Monitor</option>
        <option value="Keyboard">Keyboard</option>
        <option value="Others">Others</option>
      </select>


      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-md p-4">
            <div className="h-48 w-full bg-gray-300 rounded-md mb-4">
              <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
            </div>
            <div className="mb-2 font-bold">{product.name}</div>
            <div className="mb-4">${product.price}</div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(product)}
                  className="px-2 py-1 rounded-md bg-red-600 text-white mr-2 disabled:opacity-50"
                  disabled={!cartItems.find((item) => item.id === product.id)}
                >
                  -
                </button>
                <div className="text-xl font-bold">{cartItems.find((item) => item.id === product.id)?.quantity || 0}</div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-2 py-1 rounded-md bg-green-600 text-white ml-2"
                >
                  +
                </button>
              </div>
              <div className="text-gray-500">{product.category}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="mb-4 flex items-center">
              <div className="flex-1">
                <div className="font-bold">{item.name}</div>
                <div className="text-gray-500">${item.price} x {item.quantity}</div>
              </div>
              <button onClick={() => handleRemoveFromCart(item)} className="px-2 py-1 rounded-md bg-red-600 text-white ml-4">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}

export default ProductList;