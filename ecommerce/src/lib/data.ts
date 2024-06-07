//just like controller

import { Order, Product, User } from "./models";
import { connectToDb } from "./utils";

interface User {
  _id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface Product {
  id: string; // Use `id` instead of `_id`
  img: string;
  title: string;
  desc: string;
  price: number;
  stock: number;
  createdAt: Date;
  // Add other fields as needed
}

interface Order {
  _id: string;
  userId: string;
  products: Array<{ productId: string; quantity: number }>;
  status: string;
  createdAt: Date;
  // Add other fields as needed
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
      connectToDb();
      const users = await User.find();
      return users;
  } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users.");
  }
};

export const fetchUser = async (id: string): Promise<User | null> => {
  try {
      connectToDb();
      const user = await User.findById(id);
      return user;
  } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch user.");
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    await connectToDb();
    const products = await Product.find();

    // Map products to include an `id` field
    return products.map((product: any) => ({
      id: product._id.toString(), // Ensure `_id` is mapped to `id` as a string
      img: product.img,
      title: product.title,
      desc: product.desc,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products.");
  }
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  try {
      connectToDb();
      const product = await Product.findById(id);
      return product;
  } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch product!");
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
      connectToDb();
      const orders = await Order.find();
      return orders;
  } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch orders.");
  }
};

export const fetchOrder = async (id: string): Promise<Order | null> => {
  try {
      connectToDb();
      const order = await Order.findById(id);
      return order;
  } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch order!");
  }
};