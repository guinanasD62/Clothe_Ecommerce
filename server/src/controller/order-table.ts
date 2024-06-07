import { Request, Response } from "express";
import { OrderModel } from "../model/order";
//fom gpt
//add order // get all // get one  // update 

// export const addOrder = async (req: Request, res: Response) => {
//     try {
//         const {
//             products,
//             users,
//             quantity,
//             totalPrice,
//             orderStatus,
//             currentStock
//         } = req.body;

//         const order = new OrderModel({
//             products,
//             users,
//             delivered: false,
//             quantity,
//             totalPrice,
//             orderStatus: orderStatus || 'checkOut',
//             currentStock
//         });

//         await order.save();
//         return res.status(201).json({ message: "New order created!", data: order });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error creating order", error });
//     }
// };

// Add Order
export const addOrder = async (req: Request, res: Response) => {
    const { user, orderPlaced, products, address, totalAmount, status } = req.body;
  
    try {
      const newOrder = new OrderModel({
        user,
        orderPlaced,
        products,
        address,
        totalAmount,
        status,
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding order' });
    }
  };


// export const getAllOrders = async (req: Request, res: Response) =>{
//     try{
//         const orders = await OrderModel.find();
//         return res.status(200).json({data: orders});

//     }catch(error){
//         console.log(error);
//         return res.sendStatus(400);
//     }
     
// };

export const getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = await OrderModel.find().populate('user').populate('products.product');
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  };


//getOne
// export const getOrder = async (req: Request, res: Response)=>{

//     try{
//         const { id } = req.params;
//         const order = await OrderModel.findById(id);
//         return res.status(200).json({data: order});
        
//     }catch(error){
//         console.log(error);
//         return res.sendStatus(400);
//     }
// };
// Get Order by ID
export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const order = await OrderModel.findById(id).populate('user').populate('products.product');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching order' });
    }
  };
  

// export const updateOrder = async (req: Request, res: Response)=>{ 
//     try {
        
//         const { id } = req.params;
//         const order = await OrderModel.findByIdAndUpdate(id, req.body);

//         if(!order){
//             return res.status(404).json({message: "No order found."});
//         }

//         const updatedOrder = await OrderModel.findById(id);
//         res.status(200).json(updatedOrder);

//     } catch (error) {
//         res.status(500).json({message: "error updating order"});
//     }

// };


// Update Order
export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { orderPlaced, products, address, totalAmount, status } = req.body;
  
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        id,
        { orderPlaced, products, address, totalAmount, status },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating order' });
    }
  };
  
// export const deleteOrder = async (req: Request, res: Response)=>{

//     try{
//         const { id } = req.params;
//         const order = await OrderModel.findByIdAndDelete({_id: id});

//         if(!order){
//             return res.status(404).json({message: "No order found."});
//         }

//         return res.status(200).json({message: "Order  deleted!", data: order});
        
//     }catch(error){
//         console.log(error);
//         return res.sendStatus(400);
//     }

// };
// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const deletedOrder = await OrderModel.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting order' });
    }
  };
  