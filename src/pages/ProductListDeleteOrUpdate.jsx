import React from 'react'


import ProductsDeleteOrUpdate from '../components/products/ProductsDeleteOrUpdate';
import { ProductProvider } from '../context/ProductContext';

export default function ProductListDeleteOrUpdate() {
  
  return (
    <div>
      <h2>List of products</h2>
      <ProductProvider>
        <ProductsDeleteOrUpdate/>
      </ProductProvider>
  </div>
  )
}