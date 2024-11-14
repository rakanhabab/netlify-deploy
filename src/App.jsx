import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/*
 * ToDo: Recursive Address for the User Register to take in multiple Addresses P1
 * 
 * ToDo: Cloudinary, hosting, and update adding images so that they're viewed first beforehand P9
 * 
 * ToDo: Animation
 * 
 * ToDo: Async Titeling
 * 
 * ToDo: Split userContext to Auth and user contexts respectivly 
 * 
 * ToDo: CartPage to sync with UserContext to retrieve Address 
*/

import './App.css'
import Layout from './components/layouts/Layout';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import UpdateProduct from './pages/UpdateProduct';
import CreateProduct from './pages/CreateProduct';
import ProductListDeleteOrUpdate from './pages/ProductListDeleteOrUpdate';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import UserLogout from './pages/UserLogout';
import CartPage from './pages/CartPage';
import UserPayment from './pages/UserPayment';
import OrderComplete from './pages/OrderComplete';
import OrderList from './pages/OrderList';
import UserList from './pages/OrderList copy';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
  const isAdmin = localStorage.getItem('isAdmin') === "true";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        { path: "/", element:<HomePage/> },
        { path: "/about",  element: <About/> },
        { path: "/cart", element: <CartPage/>},
        { path: "/products", element: <ProductList/>},
        { path: "/orders", element: <OrderList/>},
        { path: "/users", element: isAdmin ? <UserList/> : <HomePage/>},
        { path: 'products/:productId', element: <ProductDetails/>},
        { path: 'create-product', element:            isAdmin     ? <CreateProduct/>              : <HomePage/> },
        { path: 'update-product/:productId', element: isAdmin     ? <UpdateProduct/>              : <HomePage/> },
        { path: 'admin-product-listing', element:     isAdmin     ? <ProductListDeleteOrUpdate/>  : <ProductList/> },
        { path: "/register", element:                 isLoggedIn  ? <HomePage/>                   : <UserRegister/>},
        { path: "/order-complete", element:           isLoggedIn  ? <OrderComplete/>              : <UserLogin/>},
        { path: "/user-payment", element:             isLoggedIn  ? <UserPayment/>                : <UserLogin/>},
        { path: "/login", element:                   !isLoggedIn  ? <UserLogin/>                  : <HomePage/>},
        { path: "/logout", element:                   isLoggedIn  ? <UserLogout/>                 : <UserLogin/>}
      ]
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider r router={router}></RouterProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App  