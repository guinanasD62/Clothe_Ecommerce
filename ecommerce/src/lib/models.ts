import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    img: {
        type: String,    
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        min: 8,
    },
    address: {
        type: String,
    },
},{
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 3,
    },
    desc: {
        type: String,
        required: true,
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



// const orderSchema = new mongoose.Schema({
//     products: [{
//         productId: {
//             type: Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         title: {
//             type: String,
//         },
//         img: {
//             type: String
//         },
//         color: {
//             type: String
//         },
//         size: {
//             type: String
//         },
//         stock: {
//             type: Number
//         }
//     }],
//     users: [{
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     username: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     phone: {
//         type: String,
//     },
//     address: {
//         type: String,
//     },
//     }],
    
//     delivered: {
//         type: Boolean,
//         default: false,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     currentStock: {
//         type: Number,
//     }

// }, {
//     timestamps: true
// });



// const orderSchema = new mongoose.Schema({
  
//         orderProductId: {
//             type: String,
//         },
//         orderProductprice: {
//             type: Number,
//         },
//         orderProducttitle: {
//             type: String,
//         },
//         orderProductimg: {
//             type: String
//         },
//         orderProductcolor: {
//             type: String
//         },
//         orderProductsize: {
//             type: String
//         },
//         orderProductstock: {
//             type: Number
//         },
   

//         orderUserId: {
//             type: String,
//     },
//     orderUserusername: {
//         type: String,
//     },
//     orderUseremail: {
//         type: String,
//     },
//     orderUserphone: {
//         type: String,
//     },
//     orderUseraddress: {
//         type: String,
//     },
  
    
//     delivered: {
//         type: Boolean,
//         default: false,
//     },
//     quantity: {
//         type: Number,
//         default: 1,
//     },
//     totalPrice: {
//         type: Number,
//     },
//     currentStock: {
//         type: Number,
//     }

// }, {
//     timestamps: true
// });

const orderSchema = new mongoose.Schema({
    orderProductId: {
        type: String,
    },
    orderProductprice: {
        type: Number,
    },
    orderProducttitle: {
        type: String,
    },
    orderProductimg: {
        type: String,
    },
    orderProductcolor: {
        type: String,
    },
    orderProductsize: {
        type: String,
    },
    orderProductstock: {
        type: Number,
    },
    orderUserId: {
        type: String,
    },
    orderUserusername: {
        type: String,
    },
    orderUseremail: {
        type: String,
    },
    orderUserphone: {
        type: String,
    },
    orderUseraddress: {
        type: String,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    orderStatus: {
        type: String,
        enum: ['addToCart', 'checkOut', 'delivered'],
        default: 'addToCart'
    },
    quantity: {
        type: Number,
        default: 1,
    },
    totalPrice: {
        type: Number,
    },
    currentStock: {
        type: Number,
    }
}, {
    timestamps: true
});

//if there is an existing schema: use, none? c new one
export const User = mongoose.models.User || mongoose.model("User", userSchema); 
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);


// suggested by gpt
// Interfaces for user data and component props
// interface User {
//     id: string;
//     img?: string;
//     title?: string;
//     username: string;
//     email: string;
//     password: string; // Note: Storing passwords in plaintext is usually not safe!
//     phone?: string;
//     address?: string;
//     isAdmin: boolean;
//     isActive: boolean;
//   }
  
//   interface SingleUserPageProps {
//     params: {
//       id: string;
//     };
//   }
  
// dashboards/user/id

// import { NextPage } from "next"; // Import NextPage type for Page components

// const SingleUserPage: NextPage<SingleUserPageProps> = async ({ params }) => {
//   const { id } = params;
//   const user: User = await fetchUser(id);

// /////////
// <label>Is Admin?</label>
// <select name="isAdmin" id="isAdmin" defaultValue={String(user.isAdmin)}>
// <option value="true">Yes</option>
// <option value="false">No</option>
// </select>
// <label>Is Active?</label>
// <select name="isActive" id="isActive" defaultValue={String(user.isActive)}>
// <option value="true">Yes</option>
// <option value="false">No</option>
// </select>