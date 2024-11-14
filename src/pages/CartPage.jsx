import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ address, handleAddressChange, handleAddressUpdate }) => {
  const { cartData, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useContext(CartContext);
  

  
    const navigate = useNavigate();

    //const { retrieveAddress } = useContext(AuthContext);
    const [addressEditing, setAddressEditing] = useState(false);

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const totalPrice = cartData.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handlePayment = () => {
        if (isLoggedIn) {
            navigate('/user-payment');
        } else {
            navigate('/login');
        }
    };

    return (
      <Container className="py-4">
        <h2>Your Cart</h2>
        
        <Row className="mt-4">
          <Col xs={12} md={8}>
            {cartData.length === 0 ? (
              <h5>Your Cart is empty</h5>
            ) : (
              <>
                <Button variant="primary" onClick={() => clearCart()} className="mb-3">
                  Clear The Cart
                </Button>
  
                {cartData.map((item) => (
                  <Card key={item.productId} className="mb-3">
                    <Row className="no-gutters">
                      <Col md={4}>
                        <Card.Img variant="top" src={item.imageIDs} alt={item.name} style={{ height: '120px', objectFit: 'cover' }} />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>Price: ${item.price.toFixed(2)}</Card.Text>
                          <div className="d-flex align-items-center">
                            <Button variant="outline-primary" size="sm" onClick={() => decrementQuantity(item.productId)}>-</Button>
                            <Card.Text className="mx-2">Quantity: {item.quantity}</Card.Text>
                            <Button variant="outline-primary" size="sm" onClick={() => incrementQuantity(item.productId)}>+</Button>
                          </div>
                          <Button variant="danger" className="mt-2" onClick={() => removeFromCart(item.productId)}>
                            Remove
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </>
            )}
          </Col>
  
          <Col xs={12} md={4}>
            {cartData.length > 0 && (
              <Card className="p-3">
                <Card.Title>Order Summary</Card.Title>
                <Card.Text><strong>Total Price: ${(Math.ceil(totalPrice * 100) / 100).toFixed(2)}</strong></Card.Text>
                <Button variant="success" className="mb-3" block onClick={handlePayment}>Proceed to Payment</Button>
                <Card.Title>Shipping Address</Card.Title>
                {addressEditing ? (
                  <Form>
                    <Form.Group controlId="formAddress" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddressUpdate}>Update Address</Button>
                  </Form>
                ) : (
                  <div>
                    <Card.Text>{address || 'No address provided yet'}</Card.Text>
                    <Button variant="outline-primary" onClick={() => setAddressEditing(true)}>Edit Address</Button>
                  </div>
                )}
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    );
  };

export default CartPage