import React, { useEffect, useState } from 'react';
import { createProduct, getAllCategories } from '../services/productService';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        imageIDs: '',
        categoryId: '',
        returnByDaysAfterOrder: 0,
        isOnSale: false
    });

    useEffect(() => {
        const fetchCategoryDetails = async () => {
        try {
            const categoriesData = await getAllCategories();
            setCategories(categoriesData.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
        fetchCategoryDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            await createProduct(formData);
          alert('Product created successfully');
          window.location.href = '/products';
        } catch (err) {
            setError(err);
            alert('Failed to create product');
        }
     };

    if (isLoading) return <p>Loading product...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-5">
          <h2 className="mb-4">Create Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageIDs" className="form-label">Image IDs:</label>
              <input
                type="text"
                id="imageIDs"
                name="imageIDs"
                className="form-control"
                value={formData.imageIDs}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">Category:</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    className="form-select"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                >
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
              <label htmlFor="returnByDaysAfterOrder" className="form-label">Return By Days:</label>
              <input
                type="number"
                id="returnByDaysAfterOrder"
                name="returnByDaysAfterOrder"
                className="form-control"
                value={formData.returnByDaysAfterOrder}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                className="form-check-input"
                checked={formData.isOnSale}
                onChange={handleInputChange}
              />
              <label htmlFor="isOnSale" className="form-check-label">Is On Sale</label>
            </div>
            <button type="submit" className="btn btn-primary">Create Product</button>
          </form>
        </div>
      );
    };
    
export default CreateProduct;