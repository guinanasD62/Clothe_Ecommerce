"use client"

import styles from "@/ui/dashboard/products/singleProduct/singleProductPage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  stock: number;
  img?: string;
  color?: string;
  size?: string;
  createdAt: string;
  updatedAt: string;
}


interface Params {
  id: string;
}

const SingleProductPage = ({ params }: { params: Params }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

//lisod sabton na way, easier ang user [id] page tsx
const fetchProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(`http://localhost:4000/products/${id}`);
  return response.data.data;
};

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    // const formData = new FormData(e.currentTarget);
    // // mas sayon na part kay taas ang sa user || pero error
    // const updatedProduct = Object.fromEntries(formData.entries());
    const formData = new FormData(e.currentTarget);
    const updatedProduct = {
      title: formData.get("title") as string,
      cat: formData.get("cat") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      color: formData.get("color") as string,
      size: formData.get("size") as string,
      desc: formData.get("desc") as string,
      img: formData.get("img") as string,
    };

    try {
      await axios.put(`http://localhost:4000/products/${id}`, updatedProduct);
      
      alert('User updated successfully');
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Failed to update product", err);
      setError("Failed to update product");
    }
  };

  if (loading) return <div>Loading...

  </div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image 
          src={product.img || "/noavatar.png"} 
          alt="" fill />
        </div>
        {product.title}
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <input type="hidden" name="_id" value={product._id} />
          <label>Title</label>
          <input type="text" name="title" defaultValue={product.title} />
          <label>Price $</label>
          <input type="number" name="price" defaultValue={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" defaultValue={product.stock} />
          <label>Color</label>
          <input type="text" name="color" defaultValue={product.color} />
          <label>Size</label>
          <input type="text" name="size" defaultValue={product.size} />
          <label>Category</label>
          <select name="cat" defaultValue="clothe">
            <option value="clothe">Clothe</option>
            <option value="phone">Phone</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea name="desc"  defaultValue={product.desc}></textarea>
          <label>Image</label>
          <textarea name="img" defaultValue={product.img}></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
