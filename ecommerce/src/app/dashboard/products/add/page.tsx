"use client"

import styles from "@/ui/dashboard/products/addProduct/addProduct.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEvent, useState } from "react";

interface ProductData {
  title: string;
  cat: string;
  price: number;
  stock: number;
  color?: string;
  size?: string;
  desc: string;
  img?: string;
}

const AddProductPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const productData: ProductData = {
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
      await axios.post("http://localhost:4000/product/addproduct", productData);
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Failed to add product", err);
      setError("Failed to add product");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" id="cat" required>
          <option value="general">Choose a Category</option>
          <option value="clothe">Clothe</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="Price $" name="price" required />
        <input type="number" placeholder="Stock" name="stock" required />
        <input type="text" placeholder="Color" name="color" />
        <input type="text" placeholder="Size" name="size" />
        <textarea
          required
          name="desc"
          id="desc"
          placeholder="Description"
        ></textarea>
        <textarea
          name="img"
          id="img"
          placeholder="Product's image link address"
        ></textarea>
        <button type="submit">Submit</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AddProductPage;
