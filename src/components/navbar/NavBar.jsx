import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css'

export default function NavBar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");
  const {cartData} = useContext(CartContext);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    const updateProductCount = () => {
      const cartDataa = localStorage.getItem('cartData');
      setNumberOfProducts(cartDataa ? JSON.parse(cartDataa).length : 0);
    };

    updateProductCount();

    const handleStorageChange = (event) => {
      if (event.key === 'cartData') {
        updateProductCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [cartData]);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: 'lightcyan' }}>
    <div className="container">
      <Link className="navbar-brand" to="/">TechBay®</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart ({numberOfProducts})</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Your Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Log Out</Link>
              </li>
              <li className="nav-item">
                <span className="navbar-text">Welcome, {username}</span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart ({numberOfProducts})</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
  )
}