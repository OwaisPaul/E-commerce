
import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";
import Product from "./models/product.js";

 dotenv.config() // looks for a file named .env in root directory

const app = express();
const PORT = process.env.PORT || 5000;
 // middleware
 app.use(cors());
 app.use(express.json()); // allows express to parse JSON request body

 // Creating the connection with MongoDB Atlas
 mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("Connected to MongoDB..."))
   .catch((err) => console.error("Could not connect to MongoDB...", err));

    app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Create the new product

app.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    discountPercentage: req.body.data.discountPercentage,
    rating: req.body.data.rating,
    stock: req.body.data.stock,
    brand: req.body.data.brand,
    category: req.body.data.category,
    thumbnail: req.body.data.thumbnail,
    images: req.body.data.images,
  });

  await Product.create(newProduct);
  res.send("Product saved to the database!");
});

//Get the all product list

app.get("/read", async (req, res) => {
    const productList = await Product.find();
    res.send(JSON.stringify(productList));
})

//update a product based on the id
app.put("/update/:id", async (req, res) => {
    const product_id = req.params.id;
    await Product.findByIdAndUpdate(product_id, {
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    discountPercentage: req.body.data.discountPercentage,
    rating: req.body.data.rating,
    stock: req.body.data.stock,
    brand: req.body.data.brand,
    category: req.body.data.category,
    thumbnail: req.body.data.thumbnail,
    images: req.body.data.images,
    });

    res.send("Product updated successfully!")
});

// Delete a product based on the id
app.delete("/delete/:id", async (req, res) => {
    const product_id = req.params.id;
    await Product.findByIdAndDelete(product_id);
    res.send("Product deleted!");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})