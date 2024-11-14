import React from 'react'


import Orders from '../components/orders/Orders';
import { OrderProvider } from '../context/OrderContext';

export default function OrderList() {
  return (
    <div>
      <h2>List of Orders</h2>
      <OrderProvider>
        <Orders/>
      </OrderProvider>
  </div>
  )
}