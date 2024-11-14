import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProductById } from '../services/productService';
import ProductTitle from '../components/products/ProductTitle';
import ProductPrice from '../components/products/ProductPrice';
import ProductImage from '../components/products/ProductImage';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <ProductTitle title={product.name} />
        <ProductImage image={product.imageIDs} title={product.name} />
        <ProductPrice price={product.price} />
        <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;