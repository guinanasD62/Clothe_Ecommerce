"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { selectCartCount, selectTotalPrice, removeFromCart, CartItem } from '@/redux/customerSlice/cartReducer';
import axios from 'axios';
import { useAuth } from '../../../auth/auth-context'; 

interface OrderProduct {
  product: string;
  color: string;
  size: string;
  stock: number;
}

interface Order {
  user: string;
  orderPlaced: boolean;
  products: OrderProduct[];
  address: string;
  totalAmount: number;
  status: string;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const cartCount: number = useSelector(selectCartCount);
  const totalPrice: number = useSelector(selectTotalPrice);
  const { isAuthenticated, user } = useAuth(); // Use authentication context to get the current user

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user || !user.id) {
      console.error('User is not authenticated');
      return;
    }

    const orderData: Order = {
      user: user.id, // Use the actual user ID
      orderPlaced: true,
      products: cartItems.map(item => ({
        product: item.id,
        color: item.color,  
        size: item.size, 
        stock: item.quantity,
      })),
      address: "your-address", // Replace with the actual address
      totalAmount: totalPrice,
      status: "Pending",
    };

    try {
      const response = await axios.post('http://localhost:4000/orders', orderData);
      console.log('Order placed:', response.data);
      // You can clear the cart or redirect the user after a successful order
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart ({cartCount})
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar src={item.img || "/noavatar.png"} />
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={`Quantity: ${item.quantity} - Price: $${item.price}`}
            />
            <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="h2">
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePlaceOrder}
        style={{ marginTop: '20px' }}
      >
        Place Order
      </Button>
    </Container>
  );
}

export default Cart;
