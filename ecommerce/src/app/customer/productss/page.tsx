"use client"

import styles from "@/ui/customer/products/productsC.module.css";
import Image from "next/image";
import AddCartBtn from "@/ui/customer/btn/addCartBtn";
import { Product } from "@/redux/customerSlice/cartReducer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProductCusSkeleton from "@/ui/skeleton/SkeletonCusProd";
import { useAuth } from "@/auth/auth-context";

const CustomerProductPage = async () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ data: Product[] }>('http://localhost:4000/product/getproduct');
        setProducts(response.data.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
      setError('Failed to delete product');
    }
  };

  if (loading)
   return (<div>
  <ProductCusSkeleton />
  </div>); //     Loading... You can use a loader here if you prefer

if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>

      <div className={styles.cardGrid}>
      {products.map((product: Product) => (
          <div className={styles.card} key={product._id}>
            <div className={styles.cardImage}>
              <Image
                src={product.img || "/noavatar.png"}
                alt="Product Image"
                width={80}
                height={80}
                className={styles.userProduct}
              />
            </div>

            <h1>{product.title}</h1>
            <p className={styles.price}>$ {product.price}</p>
            <p>{product.desc}</p>
            <div>
              <AddCartBtn product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProductPage;