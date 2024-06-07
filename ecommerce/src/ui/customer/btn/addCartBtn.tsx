"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/customerSlice/cartReducer";
import { Product } from "@/redux/customerSlice/cartReducer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/auth-context";

interface AddCartBtnProps {
  product: Product;
}

const AddCartBtn: React.FC<AddCartBtnProps> = ({ product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addToCart(product));
    setIsSuccess(true);

  };

  
  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };

  const combinedClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleAddToCart(e);
    handleCartClick(e);
  };
  
  return (
    <button type="button"  onClick={combinedClickHandler}>
      {isSuccess ? "Added!" : "Add to cart"}
    </button>
  );
};

export default AddCartBtn;
