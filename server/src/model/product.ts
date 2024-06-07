import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter product name"],
        unique: true,
        min: 3,
    },
    desc: {
        type: String,
        required: [true, "Please say something about the product."],
        min: 5,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,    
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
},{
    timestamps: true,
});


export const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);
