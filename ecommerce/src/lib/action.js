"use server"
import { revalidatePath } from "next/cache";
import { Order, Product, User } from "./models"
import { connectToDb } from "./utils";
import { redirect } from "next/navigation";
import  bcrypt from "bcrypt";

export const addUser = async (formData) => {

    // const username  = formData.get("username") // instead of writing them one by one we can re constructure then
    const { username, email, password, phone, address, isAdmin, isActive, img } = 
    Object.fromEntries(formData);

    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        connectToDb();
        const newUser = new User ({
            username, 
            email, 
            password: hashedPassword,
            phone, 
            address, 
            isAdmin, 
            isActive,
            img,
        });

        await newUser.save(); //saving to s
    }catch(error){
        console.log(error);
        throw new Error("Failed to create user.")
    }

    revalidatePath("/dashboard/users"); // no need to use usequery || swrr
    redirect("/dashboard/users");
};


export const updateUser = async (formData) => {
    const { id, username, email, password, phone, address, isAdmin, isActive, img } =
      Object.fromEntries(formData);
    
    try { 
      connectToDb();
  
      const updateFields = {
        username,
        email,
        password,
        phone,
        address,
        isAdmin,
        isActive,
        img,
      };
  
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
     
      await User.findByIdAndUpdate(id, updateFields);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update user!");
    }
  
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
  };


export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try{

        connectToDb();
        await User.findByIdAndDelete(id); //saving to s
    }catch(error){
        console.log(error);
        throw new Error("Failed to delete user.")
    }

    revalidatePath("/dashboard/users"); // no need to use usequery || swrr
};


export const addProduct = async (formData) => {
    const { title, desc, price, stock, color, size, img } = 
    Object.fromEntries(formData);

    try{
        connectToDb();

        const newProduct = new Product({
            title, 
            desc, 
            price, 
            stock, 
            color, 
            size,
            img,
        });

        await newProduct.save(); //saving to s
    }catch(error){
        console.log(error);
        throw new Error("failed to create product.")
    }

    revalidatePath("/dashboard/products"); // no need to use usequery || swrr
    redirect("/dashboard/products");
};


export const updateProduct = async (formData) => {
    const { id, title, desc, price, stock, color, size, img  } =
      Object.fromEntries(formData);
    
    try { 
      connectToDb();
  
      const updateFields = {
            id,
            title, 
            desc, 
            price, 
            stock, 
            color, 
            size,
            img,
      };
  
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
     
      await Product.findByIdAndUpdate(id, updateFields);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update product!");
    }
  
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  };



export const deleteProduct = async (formData) => {
    const { id } = 
    Object.fromEntries(formData);

    try{
        connectToDb();
        await Product.findByIdAndDelete(id); //saving to s
    }catch(error){
        console.log(error);
        throw new Error("failed to delete product.")
    }

    revalidatePath("/dashboard/products"); // no need to use usequery || swrr
};

// export const addOrder = async (formData) => {

//   // const username  = formData.get("username") // instead of writing them one by one we can re constructure then
//   const { 
//     orderProductId,
//     orderProductprice,
//     orderProducttitle,
//     orderProductimg,
//     orderProductcolor,
//     orderProductsize,
//     orderProductstock,
//     delivered,
//     quantity,
//     totalPrice,
//     currentStock, } = 
//   Object.fromEntries(formData);

//   try{


//       connectToDb();
//       const newOrder = new Order ({
          
//         orderProductId,
//         orderProductprice,
//         orderProducttitle,
//         orderProductimg,
//         orderProductcolor,
//         orderProductsize,
//         orderProductstock,
//         delivered,
//         quantity,
//         totalPrice,
//         currentStock,
//       });

     
//       await newOrder.save(); //saving to s
//   }catch(error){
//       console.error(error);
//       // throw new Error("Failed to create order.")
//   }

//   revalidatePath("/customer/products"); // no need to use usequery || swrr
//   // redirect("/dashboard/users");
// };


export const addOrder = async (formData) => {
 
  try {
    const { 
      orderProductId,
      orderProductprice,
      orderProducttitle,
      orderProductimg,
      orderProductcolor,
      orderProductsize,
      orderProductstock,
      delivered,
      quantity,
      totalPrice,
      currentStock,
      orderStatus
  } = Object.fromEntries(formData);

      await connectToDb();

      const newOrder = new Order({
          orderProductId,
          orderProductprice: Number(orderProductprice),
          orderProducttitle,
          orderProductimg,
          orderProductcolor,
          orderProductsize,
          orderProductstock: Number(orderProductstock),
          delivered: Boolean(delivered),
          quantity: Number(quantity),
          totalPrice: Number(totalPrice),
          currentStock: Number(currentStock),
          orderStatus
      });

      await newOrder.save();
  } catch (error) {
      console.error(error);
      // Optionally, handle the error
  }

  revalidatePath("/customer/products");
};


export const updateOrder = async (formData) => {
  const { orderProductId,
    orderProductprice,
    orderProducttitle,
    orderProductimg,
    orderProductcolo,
    orderProductsize,
    orderProductstock,
    delivered,
    quantity,
    totalPrice,
    currentStock, 
    orderStatus
   } =
    Object.fromEntries(formData);
  
        // orderUserId,
    // orderUserusername,
    // orderUseremail,
    // orderUserphone,
    // orderUseraddress,    
  try { 
    connectToDb();

    const updateFields = {
      orderProductId,
      orderProductprice,
      orderProducttitle,
      orderProductimg,
      orderProductcolo,
      orderProductsize,
      orderProductstock,
      
      delivered,
      quantity,
      totalPrice,
      currentStock,
      orderStatus
    };

    //  orderUserId,
    //   orderUserusername,
    //   orderUseremail,
    //   orderUserphone,
    //   orderUseraddress,   
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
   
    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/customer/products");
  // redirect("/dashboard/products");
};

export const deleteOrder = async (formData) => {
  const { id } = 
  Object.fromEntries(formData);

  try{
      connectToDb();
      await Order.findByIdAndDelete(id); //saving to s
  }catch(error){
      console.log(error);
      throw new Error("failed to delete product from cart.")
  }

  revalidatePath("/customer/cart"); // no need to use usequery || swrr
};
