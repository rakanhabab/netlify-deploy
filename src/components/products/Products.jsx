import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import ProductImage from './ProductImage';
import SortDropdown from '../SortDropDown';

import { ProductContext } from '../../context/ProductContext';

import Pagination from '../navbar/Pagination';
import SearchBar from '../SearchBar';
import CategoryFilterDropDown from '../CategoryFilterDropDown';
import { CartContext } from '../../context/CartContext';

const Products = () => {
  const { products, isLoading, error, pageNumber, setPageNumber, totalItems, pageSize, searchQuery, setSearchQuery } = useContext(ProductContext)
  const { cartData, addToCart, incrementQuantity, decrementQuantity} = useContext(CartContext);


  if (isLoading) {
    return <p>products are loading please wait</p>
  }

  if (error) {
    return <p>Error {error.message}</p>
  }

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="col-12 col-md-3 mb-3">
          <SortDropdown />
        </div>
        <div className="col-12 col-md-3 mb-3">
          <CategoryFilterDropDown />
        </div>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.productId} className="col-12 col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <ProductTitle title={product.name} />
                <ProductImage image={product.imageIDs} title={product.name} />
                <ProductPrice price={product.price} />
                <Link to={`/products/${product.productId}`}>Details</Link>
                {!cartData.some(item => item.productId === product.productId) ? (
                  <div className="mt-2">
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add Product</button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <button className="btn btn-secondary" disabled>Product Added to Cart</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <Pagination
            pageSize={pageSize}
            totalItems={totalItems}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;