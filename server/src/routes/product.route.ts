import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controller/products-table";

const router = express.Router();

router.post('/product/addproduct', addProduct);

router.get('/product/getproduct', getAllProducts);
router.get('/products/:id',  getProduct);

router.put( '/products/:id' ,updateProduct)

router.delete('/products/:id' , deleteProduct)

export default router;
