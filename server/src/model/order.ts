// import mongoose, { Schema, Document } from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     products: [{
//         productId: {
//             type: Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         title: {
//             type: String,
//         },
//         img: {
//             type: String
//         },
//         color: {
//             type: String
//         },
//         size: {
//             type: String
//         },
//         stock: {
//             type: Number
//         }
//     }],
//     users: [{
//         userId: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//             required: true
//         },
//         username: {
//             type: String,
//         },
//         email: {
//             type: String,
//         },
//         phone: {
//             type: String,
//         },
//         address: {
//             type: String,
//         },
//     }],
//     delivered: {
//         type: Boolean,
//         default: false,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     orderStatus: {
//         type: String,
//         enum: [ 'checkOut', 'delivered'],
//         default: 'checkOut'
//     },
//     currentStock: {
//         type: Number,
//     }
// }, {
//     timestamps: true
// });

// // Export the Mongoose model
// export const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);


import mongoose from "mongoose";
 
interface Order {
    user: mongoose.Schema.Types.ObjectId;
  orderPlaced: boolean;
  products: {
    product: mongoose.Schema.Types.ObjectId;
    color: string;
    size: string;
    stock: number;
  }[];
  address: string;
  totalAmount: number;
  status: string;
  createdAt?: Date;
}
 
const orderSchema = new mongoose.Schema<Order>({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderPlaced: {
    type: Boolean,
    required: true,
    default: false,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      color: { type: String, required: true },
      size: { type: String, required: true },
      stock: { type: Number, required: true },
    },
  ],
  address: { type: String },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
    timestamps: true
});
 
export const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

// const Order =
//   mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);
 


// export const getAllOrders = async () => {
//   return await Order.find().populate("customer").populate("products.product");
// };
 
// export const getOrderById = async (id: string) => {
//   return await Order.findById(id)
//     .populate("customer")
//     .populate("products.product");
// };
 
// export const createOrder = async (data: Order) => {
//   const order = new Order(data);
//   await order.save();
//   return order.toObject();
// };
 
// export const updateOrder = async (id: string, data: Partial<Order>) => {
//   return await Order.findByIdAndUpdate(id, data, { new: true })
//     .populate("customer")
//     .populate("products.product");
// };
 
// export const deleteOrder = async (id: string) => {
//   return await Order.findByIdAndDelete(id);
// };
 
// export default Order;