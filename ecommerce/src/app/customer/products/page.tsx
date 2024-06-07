import { fetchProducts } from "@/lib/data";
import styles from "@/ui/customer/products/productsC.module.css";
import Image from "next/image";
import AddCartBtn from "@/ui/customer/btn/addCartBtn";
import { Product } from "@/redux/customerSlice/cartReducer";

const CustomerProductPage = async () => {
  const products: Product[] = await fetchProducts();

  
  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.cardGrid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
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