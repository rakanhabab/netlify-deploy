import React, { useContext } from 'react';

import { ProductContext } from '../context/ProductContext';

const CategoryFilterDropDown = () => {
  const { categories, setCategory } = useContext(ProductContext);

  const handleDropDownChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <select
      id="categoryId"
      name="categoryId"
      className="form-select"
      value=""
      onChange={handleDropDownChange}
    >
      <option key="" value="">
        Filter Categories
      </option>
      {categories.map(category => (
        <option key={category.categoryId} value={category.categoryId}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilterDropDown;