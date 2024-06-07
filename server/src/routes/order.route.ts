import express from "express";
import { addOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "../controller/order-table";


const router = express.Router();

router.post('/orders', addOrder);


router.get('/orders', getAllOrders);
router.get('/orders/:id',  getOrder);

router.put( '/orders/:id' ,updateOrder)

router.delete('/orders/:id' , deleteOrder)

export default router;