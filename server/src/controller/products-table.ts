import { Request, Response } from "express";
import { ProductModel } from "../model/product";



// Add a new product
export const addProduct = async (req: Request, res: Response) => {
    try {
        const { title, desc, price, stock, img, color, size } = req.body;

        const product = new ProductModel({
            title,
            desc,
            price,
            stock,
            img,
            color,
            size
        });

        await product.save();
        return res.status(201).json({ message: "New product created!", data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create product" });
    }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({ data: products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch products" });
    }
};


//getOne
export const getProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        return res.status(200).json({ data: product });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "No product found." });
        }

        const updatedProduct = await ProductModel.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: "error updating product" });
    }

};

export const deleteProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete({ _id: id });

        if (!product) {
            return res.status(404).json({ message: "No product found." });
        }

        return res.status(200).json({ message: "product  deleted!", data: product });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};

