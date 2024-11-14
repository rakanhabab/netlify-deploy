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
import { deleteProductById } from '../../services/productService';

const ProductsDeleteOrUpdate = () => {
  const { products, isLoading, error, pageNumber, pageSize, totalItems, setPageNumber } = useContext(ProductContext)
         
  if (isLoading) {
    return <p>products are loading please wait</p>
  }

  if (error) {
    return <p>Error {error.message}</p>
  }

  const handleButtonClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductById(id);
      window.location.reload();
    }
  };

  return (
    <div className="container my-4">
      <div className="row mb-4">
        <div className="col-12 col-md-6 mb-3">
          <SearchBar />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <SortDropdown />
        </div>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.productId} className="col-12 col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.imageIDs} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <ProductTitle title={product.name} />
                <ProductPrice price={product.price} />
                <Link to={`/update-product/${product.productId}`} className="btn btn-primary me-2">Update</Link>
                <button className="btn btn-danger" onClick={() => handleButtonClick(product.productId)}>Delete</button>
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

export default ProductsDeleteOrUpdate;