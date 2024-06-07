"use client"

import styles from "@/ui/dashboard/products/productss.module.css";
import Search from "@/ui/dashboard/search/search";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SkeletonProducts from "@/ui/skeleton/SkeletonPoducts";

// Define the Product interface inside the component file
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

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const handleUpdate = (id: string) => {
    router.push(`/dashboard/products/${id}`);
  };

  if (loading)
   return ( 
   <div>
    <SkeletonProducts />
  </div>);//     Loading... You can use a loader here if you prefer
 
 if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product ..." />
       
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price_$</td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        
        <tbody>
          {products.map((product: Product) => (
            <tr key={product._id}>
              <td>
                <div className={styles.product}>
                  <Image 
                  src={product.img || "/noavatar.png"} 
                  alt="" 
                  width={40} 
                  height={40} 
                  style={{ borderRadius: '50%' }} 
                  className={styles.productImage} 
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>{product.price.toString()}</td>
              <td>{product.createdAt.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>

              <td>
                <div className={styles.buttons}>
                  <button 
                  className={`${styles.button} ${styles.view}`} 
                  onClick={() => handleUpdate(product._id)}
                  >
                    Update
                  </button>

                  <button 
                  className={`${styles.button} ${styles.delete}`} 
                  onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default ProductsPage;
