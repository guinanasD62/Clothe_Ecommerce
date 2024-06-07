import { Request, Response } from "express";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "../src/routes/user.route";
import orderRoutes from '../src/routes/order.route';
import productRoutes from '../src/routes/product.route';
import cors from "cors"

const app = express();


const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", userRoutes);
app.use("/", orderRoutes);
app.use("/", productRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


mongoose.connect(
  "mongodb+srv://dianaroseguinanas:dianaroseguinanas@cluster0.hhqfg3z.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => {
    console.log("Connected to database!");

    app.get('/', (req: Request, res: Response) => {
      res.send("Hello from Node API Server Updated");
    })
  })
  .catch(() => {
    console.log("Connection failed!");
  });
