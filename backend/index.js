const express = require("express");
const mongoose = require('mongoose');
const app = express();
const connectDB = async () => {
  mongoose.connect('mongodb://localhost:27017/e-comm');
  const productSchema = new mongoose.Schema({});
  const product = mongoose.model('products', productSchema);
  const data = await product.find();
  console.warn(data);
}

connectDB();

app.get("/", (req, res) => {
  res.send("app is working");
});

let port = 8080;
app.listen(port, () => {
  console.log(`the port ${port} is listening`);
});
