import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

//import { UserContext } from '../context/UserContext';

import {processPayment, updateOrder , getOrderById} from '../services/orderService'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserPayment = () => {
    const { cartData, clearCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    //const { user } = useContext(UserContext);
    const userId = localStorage.getItem('id');
    const orderId = localStorage.getItem('orderId');
    

    const navi = useNavigate();

    useEffect(() => {
        const calculateTotalPrice = async () => {
          if (orderId) {
            const order = await getOrderById(orderId);
            const totalPriceOfOriginalOrder = order.data.orderProducts.reduce(
              (total, product) => total + product.quantity * product.price,
              0
              );
              
    
            const newTotalPrice = cartData.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) - totalPriceOfOriginalOrder;
    
            setTotalPrice(newTotalPrice);
          } else {
            const newTotalPrice = cartData.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );
    
            setTotalPrice(newTotalPrice);
          }
        };
    
        calculateTotalPrice();
      }, [orderId, cartData]); 
    

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        const processPaymentResponse = await processPayment({ cartData, userId });
        
        if (processPaymentResponse.statusCode == 201) { 
            clearCart();
            navi('/order-complete');
        }else {
            alert("Order payment failed");   
        }
    };

    const handlePaymentUpdate = async (e) => {
        e.preventDefault();
        const updateOrderDto = {
            UserId: userId,  
            OrderProducts: cartData.map(item => ({
              ProductId: item.productId,
              Quantity: item.quantity,
              Price: item.price
            }))
        };

        console.log(updateOrderDto);
        
        const processPaymentResponse = await updateOrder(orderId,  updateOrderDto);
        
        if (processPaymentResponse.data.statusCode == 200) { 
            clearCart();
            alert("Order Updated!");
            localStorage.removeItem('orderId');
            navi('/orders');
        }else {
            alert("Order Update failed");   
        }
    };

    console.log(totalPrice);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="my-4">Enter Card Details</h2>
                    <Form onSubmit={orderId ? handlePaymentUpdate : handlePayment}>
                        <Form.Group className="mb-3" controlId="formCardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formExpiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {orderId ?
                                    totalPrice >= 0 
                                    ? (<Button variant="primary" type="submit">
                                       <>Submit Payment of ${ totalPrice.toFixed(2) }</>
                                        </Button>) 
                                       :(<> <Button variant="primary" type="submit">
                                        <>Submit Payment of -${ totalPrice.toFixed(2) * -1 }</>
                                         </Button>
                                         <p>the negative value is going to be refunded to you.</p></>)
                                :
                                <Button variant="primary" type="submit">
                                    Submit Payment of ${ totalPrice.toFixed(2) }
                                </Button>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
  );
};

export default UserPayment;