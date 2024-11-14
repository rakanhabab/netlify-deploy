import React from 'react'


import Products from '../components/products/Products';
import { ProductProvider } from '../context/ProductContext';

export default function ProductList() {





  return (
    <div>
      <h2>List of products</h2>
      <ProductProvider>
        <Products/>
      </ProductProvider>
  </div>
  )
}