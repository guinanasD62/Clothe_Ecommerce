"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface Product {
  productId: string;
  price: number;
  title: string;
  img: string;
  color: string;
  size: string;
  stock: number;
}

interface User {
  userId: string;
  username: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  _id: string;
  products: Product[];
  users: User[];
  delivered: boolean;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  currentStock: number;
}

const OrderComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Users</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.products.map(product => (
                  <div key={product.productId}>
                    <p>{product.title}</p>
                    <img src={product.img} alt={product.title} width={50} height={50} />
                    <p>{product.color}</p>
                    <p>{product.size}</p>
                    <p>${product.price}</p>
                  </div>
                ))}
              </td>
              <td>
                {order.users.map(user => (
                  <div key={user.userId}>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.address}</p>
                  </div>
                ))}
              </td>
              <td>{order.quantity}</td>
              <td>${order.totalPrice}</td>
              <td>{order.orderStatus}</td>
              <td>{order.delivered ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderComponent;