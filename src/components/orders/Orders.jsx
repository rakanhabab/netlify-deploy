import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { OrderContext } from '../../context/OrderContext';
import { CartContext } from '../../context/CartContext';

import Pagination from '../navbar/Pagination';
import SearchBar from '../SearchBar';

import { deleteOrderById } from '../../services/orderService';
import { getProductById } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

/*
TO UPDATE ORDER
Cart Empty? => if not ask the user to make sure their cart is empty to be able to Update the Order
Then

parse the products and their respective quantites back INTO the Cart
AND 
set into the localstorage the OrderID

next user goes to product list or cart page and updates their cart
goes to process payment 
Process Payment checks for localstorage's OrderID 
if false means we're making a new order 
if there IS a value retrieve it and now we're UPDATING an order instead of Creating one 

the payment value will be the difference 
of the order in the database (not yet Updated) and the cart, the value CAN be negative
and we will clarify to the user that this negative value is going to be refunded to them

once we get that the response for the update of the order is successful we will empty out 
the local storage from orderID and clear the cart
*/ 

const Orders = () => {
  const { orders, isLoading, error, pageNumber, setPageNumber, totalItems, searchQuery, setSearchQuery } = useContext(OrderContext)
  const { cartData, clearCart, addToCart } = useContext(CartContext);
  const isAdmin = localStorage.getItem('isAdmin') === "true";
  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";

  const navi = useNavigate();

  if (!isLoggedIn) {
    window.location.href = '/login';
  }

  if (isLoading) {
    return <p>products are loading please wait</p>
  }

  if (error) {
    return <p>Error {error.message}</p>
  }

  const handleCancelButtonClick = (id) => {
    if (window.confirm('Are you sure you want to Cancel this Order?')) {
      deleteOrderById(id);
      window.location.reload();
    }
  };

  const handleUpdateButtonClick = async (order) => {
    
    if (localStorage.getItem("orderId")) {
      if (localStorage.getItem("orderId") == order.orderId) {
        alert("your update for this Order has been Cancelled");
        localStorage.removeItem("orderId");
        clearCart();
        return;
      } else {
        if (!window.confirm('You\'re already updating a different Order, would you like to update this one instead?')) {
          return;
        }
      }
    }
    
    if (cartData.length !== 0) {
      if (!window.confirm('Your Cart isn\'t Empty. Updating an order Overrides your Cart so you can Update it, are you sure you want to continue and lose your current cart?')) {
        return;
      }
    }

    clearCart();
    localStorage.setItem("orderId", order.orderId);

    for (const product of order.orderProducts) {
      const { productId, quantity } = product;
      const productToAdd = await getProductById(productId);
      addToCart(productToAdd.data, quantity);
    }

    alert("Your Cart has been Updated with this Order, we will Re-Direct you to the Cart Page, edit your order how you like and process the payment to Update this Order");
    navi('/cart');
  };

  return (
    <div className="orders">
      {isAdmin ?
        <div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div> : <h2>Here are your Orders!</h2> }
      
      {orders.map(order => {
        const totalPrice = order.orderProducts.reduce(
          (total, product) => total + product.quantity * product.price,
          0
        );

        return (
          <div key={order.orderId} className="order-item p-3 my-2 border rounded">
            <h5>Order ID: {order.orderId}</h5>
            <p>User: {order.userName}</p>
            <ul className="list-unstyled">
              {order.orderProducts.map(product => (
                <li key={product.productId}>
                  {product.productName} (Quantity: {product.quantity})
                </li>
              ))}
            </ul>
            <h5 className="order-price">Total: ${totalPrice.toFixed(2)}</h5>
            <div>
            <button onClick={() => handleCancelButtonClick(order.orderId)}>Cancel</button>
              <button onClick={() => handleUpdateButtonClick(order)}>{ localStorage.getItem("orderId") == order.orderId ? <>Cancel Update</> : <>Update Order</>}</button>
            </div>
          </div>
        );
      })}
      <Pagination
        pageSize={20}
        totalItems={totalItems}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export default Orders;