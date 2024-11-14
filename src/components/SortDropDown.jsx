import React, { useContext } from 'react';

import { ProductContext } from '../context/ProductContext';

const SortDropdown = () => {
    const { sortBy, setSortBy } = useContext(ProductContext);
    

    const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
  };

  return (
    <select value={sortBy} className="form-select" onChange={handleSortChange}>
      <option value="default">Sort?</option>
      <option value="nameASC">Name Ascending</option>
      <option value="nameDESC">Name Descending</option>
      <option value="priceASC">Price Ascending</option>
      <option value="priceDESC">Price Descending</option>
    </select>
  );
};

export default SortDropdown;