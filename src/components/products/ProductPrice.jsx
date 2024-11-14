import React from 'react';

const ProductPrice = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);

  return <p>{formattedPrice}</p>;
};

export default ProductPrice;   